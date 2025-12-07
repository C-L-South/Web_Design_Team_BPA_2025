// Default settings
const defaultAccessibilityPrefs = {
  lineReader: false,
  grayscale: false,
  textSize: "normal",     // normal | large | xlarge
  fontFamily: "normal"    // normal | opendyslexic
};

let currentAccessibilityPrefs = { ...defaultAccessibilityPrefs };

let lineReaderOn = false;
let topShade = null;
let bottomShade = null;
let moveHandler = null;

// ---------- Apply prefs to the page (syncs with your CSS) ----------
function applyAccessibility(prefsInput) {
  currentAccessibilityPrefs = {
    ...currentAccessibilityPrefs,
    ...(prefsInput || {})
  };

  const prefs = currentAccessibilityPrefs;
  const body = document.body;
  if (!body) return;

  // ----- FONT FAMILY -----
  // Matches: body.access-font-dyslexic in your CSS
  body.classList.toggle(
    "access-font-dyslexic",
    prefs.fontFamily === "opendyslexic"
  );

  // ----- GRAYSCALE -----
  // Matches: body.access-mode-grayscale
  body.classList.toggle(
    "access-mode-grayscale",
    !!prefs.grayscale
  );

  // ----- TEXT SIZE -----
  // Matches: body.access-text-large *, body.access-text-xlarge *
  const root = document.documentElement;

  if (prefs.textSize === "large") {
    root.style.fontSize = "18px";
  } 
  else if (prefs.textSize === "xlarge") {
    root.style.fontSize = "20px";
  } 
  else {
    root.style.fontSize = "16px"; // normal default
  }
  // "normal" => no extra class

  // ----- LINE READER -----
  if (prefs.lineReader) {
    enableLineReader();
  } else {
    disableLineReader();
  }
}

// Expose helpers for other scripts (like settings_info.js)
window.getAccessibilityPrefs = function () {
  return { ...currentAccessibilityPrefs };
};

window.updateAccessibilityPrefs = function (partialPrefs) {
  applyAccessibility(partialPrefs || {});
};

window.setTextSize = function (size) {
  if (["normal", "large", "xlarge"].includes(size)) {
    applyAccessibility({ textSize: size });
  }
};

window.getTextSize = function () {
  return currentAccessibilityPrefs.textSize;
};

// ---------- Line reader ----------

function enableLineReader() {
  if (lineReaderOn) return;
  lineReaderOn = true;

  const body = document.body;
  if (!body) return;

  body.classList.add("access-line-reader-active");

  topShade = document.createElement("div");
  bottomShade = document.createElement("div");

  topShade.className = "line-reader-shade";
  bottomShade.className = "line-reader-shade";

  body.appendChild(topShade);
  body.appendChild(bottomShade);

  const H = 40; // height of the reading window

  moveHandler = (e) => {
    if (!lineReaderOn) return;
    const top = e.clientY - H / 2;
    const bottom = window.innerHeight - (top + H);

    topShade.style.top = "0px";
    topShade.style.height = top + "px";

    bottomShade.style.top = (top + H) + "px";
    bottomShade.style.height = bottom + "px";
  };

  document.addEventListener("mousemove", moveHandler);
}

function disableLineReader() {
  if (!lineReaderOn) return;
  lineReaderOn = false;

  const body = document.body;
  if (body) {
    body.classList.remove("access-line-reader-active");
  }

  if (topShade) topShade.remove();
  if (bottomShade) bottomShade.remove();
  topShade = null;
  bottomShade = null;

  if (moveHandler) {
    document.removeEventListener("mousemove", moveHandler);
    moveHandler = null;
  }
}

// ---------- Init: defaults + Firestore prefs ----------
function initAccessibility() {
  // Always start from defaults
  applyAccessibility(defaultAccessibilityPrefs);

  // If Firebase isn't loaded, we can't sync from Firestore
  if (typeof firebase === "undefined") {
    console.warn("[accessibility] Firebase not found; using defaults only.");
    return;
  }

  const auth = firebase.auth();
  const db   = firebase.firestore();

  if (!auth || !db) {
    console.warn("[accessibility] auth/db not ready; using defaults.");
    return;
  }

  auth.onAuthStateChanged(async (user) => {
    if (!user) return; // not logged in, keep defaults

    try {
      const snap = await db.collection("users").doc(user.uid).get();
      if (!snap.exists) return;

      const data = snap.data();

      const firestorePrefs = {
        lineReader: typeof data.lineReader === "boolean" ? data.lineReader : defaultAccessibilityPrefs.lineReader,
        grayscale: typeof data.grayscale === "boolean" ? data.grayscale : defaultAccessibilityPrefs.grayscale,
        textSize: data.textSize || defaultAccessibilityPrefs.textSize,
        fontFamily: data.fontFamily || defaultAccessibilityPrefs.fontFamily
      };

      applyAccessibility(firestorePrefs);
    } catch (err) {
      console.error("Error loading accessibility prefs from Firestore:", err);
    }
  });
}

document.addEventListener("DOMContentLoaded", initAccessibility);

