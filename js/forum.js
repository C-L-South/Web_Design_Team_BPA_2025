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

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const postsTableBody = document.getElementById('postsTableBody');
    const searchInput = document.getElementById('searchInput');
    const newPostButton = document.getElementById('newPostButton');

    let allPosts = [];

    function renderPosts(docs) {
        postsTableBody.innerHTML = '';

        if (!docs.length) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 3;
        td.textContent = 'No posts yet.';
        tr.appendChild(td);
        postsTableBody.appendChild(tr);
        return;
        }

        docs.forEach(doc => {
        const data = doc.data();

        const tr = document.createElement('tr');

        // title and link to post.html?id=
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

    // Simple client-side search
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

    // Post button
    if (newPostButton) {
        newPostButton.addEventListener('click', async () => {
        const title = prompt('Post title:');
        if (!title) return;

        const body = prompt('Post content:');
        if (!body) return;

        const createdBy = prompt('Your name (optional):') || 'Anonymous';

        try {
            await db.collection('posts').add({
            title,
            body,
            createdBy,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            repliesCount: 0,
            upvotes: 0
            });

            await loadPosts();
            alert('Post created!');
        } catch (err) {
            console.error('Error creating post:', err);
            alert('Error creating post. Please try again.');
        }
        });
    }

    loadPosts();
    });
