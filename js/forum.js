const firebaseConfig = {
  apiKey: "AIzaSyDncN-lZWQLBa3fkMI3QkAE7CqcA6IK3ss",
  authDomain: "bpa-webdesign-team.firebaseapp.com",
  databaseURL: "https://bpa-webdesign-team-default-rtdb.firebaseio.com",
  projectId: "bpa-webdesign-team",
  storageBucket: "bpa-webdesign-team.firebasestorage.app",
  messagingSenderId: "12413897311",
  appId: "1:12413897311:web:b6a1b9363d3e6f2a0b69ea",
  measurementId: "G-2D29B9KZCR"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
  const postsTableBody = document.getElementById('postsTableBody');
  const searchInput = document.getElementById('searchInput');
  const newPostButton = document.getElementById('newPostButton');
  const sidebarTopicsList = document.getElementById("sidebarTopicsList");

  let allPosts = [];
  let myPosts = [];

  function renderPosts(docs) {
    postsTableBody.innerHTML = '';

    if (!docs.length) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = 3;
      td.classList.add('no-posts-message');
      td.textContent = 'No posts yet.';
      tr.appendChild(td);
      postsTableBody.appendChild(tr);
      return;
    }

    docs.forEach(doc => {
      const data = doc.data();

      const tr = document.createElement('tr');

      const titleTd = document.createElement('td');
      const link = document.createElement('a');
      link.href = `post.html?id=${doc.id}`;
      link.textContent = data.title || '(Untitled post)';
      titleTd.appendChild(link);

      const repliesTd = document.createElement('td');
      repliesTd.textContent = `${data.repliesCount || 0} Replies`;

      const createdByTd = document.createElement('td');
      createdByTd.textContent = data.createdBy
        ? `By ${data.createdBy}`
        : 'By Anonymous';

      tr.appendChild(titleTd);
      tr.appendChild(repliesTd);
      tr.appendChild(createdByTd);

      postsTableBody.appendChild(tr);
    });
  }

  function renderMyPosts(docs) {
    sidebarTopicsList.innerHTML = "";

    if (!docs.length) {
      const li = document.createElement("li");
      li.classList.add("no-posts-message");
      li.textContent = "No posts yet.";
      sidebarTopicsList.appendChild(li);
      return;
    }

    docs.forEach(doc => {
      const data = doc.data();

      const li = document.createElement("li");
      li.classList.add("sidebar-item");

      const link = document.createElement("a");
      link.href = `post.html?id=${doc.id}`;
      link.textContent = data.title || "(Untitled post)";
      link.classList.add("sidebar-link");

      li.appendChild(link);
      sidebarTopicsList.appendChild(li);
    });
  }

  async function loadPosts() {
    try {
      const snapshot = await db
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();

      allPosts = snapshot.docs;
      renderPosts(allPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      postsTableBody.innerHTML =
        '<tr><td colspan="3">Error loading posts</td></tr>';
    }
  }

  async function loadMyPosts(user) {
    try {
      const snapshot = await db
        .collection("posts")
        .where("createdById", "==", user.uid)
        .orderBy("createdAt", "desc")
        .get();

      myPosts = snapshot.docs;
      renderMyPosts(myPosts);
    } catch (err) {
      console.error("Error loading my posts:", err);
      sidebarTopicsList.innerHTML =
        "<li>Error loading your posts.</li>";
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();

      const filtered = allPosts.filter(doc => {
        const d = doc.data();
        const title = (d.title || '').toLowerCase();
        const author = (d.createdBy || '').toLowerCase();
        return title.includes(q) || author.includes(q);
      });

      renderPosts(filtered);
    });
  }

  // auth after DOM ready
  auth.onAuthStateChanged(async user => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    console.log("Forum page: logged in as ", user.uid);

    if (newPostButton) {
      newPostButton.addEventListener('click', async () => {
        const title = prompt('Post title:');
        if (!title) return;

        const body = prompt('Post content:');
        if (!body) return;

        const userName = user.displayName || user.email || 'Anonymous';

        try {
          await db.collection('posts').add({
            title,
            body,
            createdBy: userName,
            createdById: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            repliesCount: 0,
            upvotes: 0
          });

          await loadPosts();
          await loadMyPosts(user);
          alert('Post created!');
        } catch (err) {
          console.error('Error creating post:', err);
          alert('Error creating post. Please try again.');
        }
      });
    }

    await loadPosts();
    await loadMyPosts(user);
  });
});
