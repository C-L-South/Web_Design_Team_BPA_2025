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

function loadPrefsFromLocal() {
  try {
    const raw = localStorage.getItem("accessibilityPrefs");
    if (!raw) return { ...defaultAccessibilityPrefs };
    const parsed = JSON.parse(raw);
    return { ...defaultAccessibilityPrefs, ...parsed };
  } catch {
    return { ...defaultAccessibilityPrefs };
  }
}

function applyAccessibility(prefsInput) {
  currentAccessibilityPrefs = {
    ...currentAccessibilityPrefs,
    ...(prefsInput || {})
  };

  const prefs = currentAccessibilityPrefs;

  // Text size
  const root = document.documentElement;
  root.classList.remove("text-size-normal", "text-size-large", "text-size-xlarge");
  root.classList.add(`text-size-${prefs.textSize}`);

  // Font family
  document.body.classList.toggle(
    "access-font-dyslexic",
    prefs.fontFamily === "opendyslexic"
  );

  // Grayscale
  document.body.classList.toggle(
    "access-mode-grayscale",
    !!prefs.grayscale
  );

  // Line reader
  if (prefs.lineReader) enableLineReader();
  else disableLineReader();

  try {
    localStorage.setItem("accessibilityPrefs", JSON.stringify(prefs));
  } catch {
  }
}

window.getAccessibilityPrefs = function () {
  return { ...currentAccessibilityPrefs };
};

window.updateAccessibilityPrefs = function (partialPrefs) {
  applyAccessibility(partialPrefs || {});
};

// Line reader

function enableLineReader() {
  if (lineReaderOn) return;
  lineReaderOn = true;

  topShade = document.createElement("div");
  bottomShade = document.createElement("div");

  topShade.style.position = bottomShade.style.position = "fixed";
  topShade.style.left = bottomShade.style.left = "0";
  topShade.style.width = bottomShade.style.width = "100%";
  topShade.style.background = bottomShade.style.background = "rgba(0,0,0,0.65)";
  topShade.style.pointerEvents = bottomShade.style.pointerEvents = "none";
  topShade.style.zIndex = bottomShade.style.zIndex = "9999";

  document.body.appendChild(topShade);
  document.body.appendChild(bottomShade);

  const H = 40;

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

  if (topShade) topShade.remove();
  if (bottomShade) bottomShade.remove();
  topShade = null;
  bottomShade = null;

  if (moveHandler) {
    document.removeEventListener("mousemove", moveHandler);
    moveHandler = null;
  }
}

function initAccessibility() {
  const localPrefs = loadPrefsFromLocal();
  applyAccessibility(localPrefs);

  if (window.auth && window.db && typeof auth.onAuthStateChanged === "function") {
    auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      try {
        const snap = await db.collection("users").doc(user.uid).get();
        if (snap.exists && snap.data().accessibilityPrefs) {
          const firestorePrefs = snap.data().accessibilityPrefs;
          const merged = { ...localPrefs, ...firestorePrefs };
          applyAccessibility(merged);
        }
      } catch (err) {
        console.error("Error loading accessibility prefs from Firestore:", err);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initAccessibility);
