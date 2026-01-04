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

const db = firebase.firestore();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  const postAuthorEl = document.getElementById('postAuthor');
  const postTitleLink = document.getElementById('postTitle');
  const postBodyEl = document.getElementById('postBody');
  const upvotesSpan = document.getElementById('postUpvotes');
  const commentsCountSpan = document.getElementById('postCommentsCount');

  const commentForm = document.getElementById('commentForm');
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');
  const upvoteButton = document.getElementById('upvoteButton');
  const sidebarTopicsList = document.getElementById('sidebarTopicsList');
  if (!postId) {
    postAuthorEl.textContent = '';
    postTitleLink.textContent = 'Unavailable';
    postBodyEl.innerHTML = '<p class="no-posts-message">No post yet.</p>';
    return;
  }

  console.log("Loaded post.html with postId:", postId);

  // Show initial loading state
  postBodyEl.textContent = 'Loading post...';
  if (commentsList) {
    commentsList.innerHTML = '<p class="no-posts-message">Loading comments...</p>';
  }
  function renderMyPosts(docs) {
    if (!sidebarTopicsList) return;

    sidebarTopicsList.innerHTML = "";

    if (!docs.length) {
      const li = document.createElement("li");
      li.textContent = "No posts yet.";
      li.classList.add("no-posts-message");
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

  async function loadMyPosts(user) {
    if (!sidebarTopicsList) return;

    try {
      const snapshot = await db
        .collection("posts")
        .where("createdById", "==", user.uid)
        .orderBy("createdAt", "desc")
        .get();

      const myPosts = snapshot.docs;
      renderMyPosts(myPosts);
    } catch (err) {
      console.error("Error loading my posts:", err);
      sidebarTopicsList.innerHTML = "<li>Error loading your posts.</li>";
    }
  }

  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    console.log("Post page: logged in as", user.uid);

    async function loadPost() {
      try {
        const doc = await db.collection('posts').doc(postId).get();
        if (!doc.exists) {
          postAuthorEl.textContent = '';
          postTitleLink.textContent = 'Unavailable';
          postBodyEl.innerHTML =
            '<p class="no-posts-message">No post yet.</p>';
          upvotesSpan.textContent = '0';
          commentsCountSpan.textContent = '0';
          return;
        }

        const data = doc.data();
        postAuthorEl.textContent = data.createdBy || 'Anonymous';
        postTitleLink.textContent = data.title || 'Untitled post';
        postBodyEl.textContent = data.body || '';
        upvotesSpan.textContent = data.upvotes || 0;
        commentsCountSpan.textContent = data.repliesCount || 0;
      } catch (err) {
        console.error('Error loading post:', err);
        postBodyEl.textContent = 'Error loading post.';
      }
    }

    async function loadComments() {
      try {
        commentsList.innerHTML = '<p class="no-posts-message">Loading comments...</p>';

        const snapshot = await db
          .collection('comments')
          .where('postId', '==', postId)
          .get();

        const docs = snapshot.docs.sort((a, b) => {
          const da = a.data().createdAt?.toMillis?.() || 0;
          const dbv = b.data().createdAt?.toMillis?.() || 0;
          return da - dbv;
        });

        commentsList.innerHTML = '';

        if (!docs.length) {

          commentsList.innerHTML =
            '<p class="no-posts-message">No comments yet. Be the first to share your thoughts!</p>';
          commentsCountSpan.textContent = 0;

          await db.collection('posts').doc(postId).update({
            repliesCount: 0
          });
          return;
        }

        docs.forEach(doc => {
          const data = doc.data();

          const article = document.createElement('article');

          const h3 = document.createElement('h3');
          h3.textContent = data.author || 'Anonymous';

          const p = document.createElement('p');
          p.textContent = data.text;

          const upvoteWrapper = document.createElement('div');

          const upvoteBtn = document.createElement('button');
          upvoteBtn.textContent = '↑';

          const upvoteCountSpan = document.createElement('span');
          upvoteCountSpan.textContent = ' ' + (data.upvotes || 0);

          // Comment upvote
          upvoteBtn.addEventListener('click', async () => {
            const userId = user.uid;
            const commentRef = db.collection('comments').doc(doc.id);
            const voteRef = commentRef.collection('commentVotes').doc(userId);

            try {
              const voteSnap = await voteRef.get();

              if (voteSnap.exists) {
                await voteRef.delete();
                await commentRef.update({
                  upvotes: firebase.firestore.FieldValue.increment(-1)
                });

                const current =
                  parseInt(upvoteCountSpan.textContent.trim(), 10) || 0;
                upvoteCountSpan.textContent = ' ' + (current - 1);
              } else {
                await voteRef.set({
                  userId,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                await commentRef.update({
                  upvotes: firebase.firestore.FieldValue.increment(1)
                });

                const current =
                  parseInt(upvoteCountSpan.textContent.trim(), 10) || 0;
                upvoteCountSpan.textContent = ' ' + (current + 1);
              }
            } catch (err) {
              console.error('Error toggling comment upvote:', err);
              alert('Error updating your vote on this comment.');
            }
          });

          upvoteWrapper.appendChild(upvoteBtn);
          upvoteWrapper.appendChild(upvoteCountSpan);

          article.appendChild(h3);
          article.appendChild(p);
          article.appendChild(upvoteWrapper);

          commentsList.appendChild(article);
        });

        commentsCountSpan.textContent = docs.length;
        await db.collection('posts').doc(postId).update({
          repliesCount: docs.length
        });
      } catch (err) {
        console.error('Error loading comments:', err);
        commentsList.innerHTML =
          '<p class="no-posts-message">Error loading comments.</p>';
      }
    }

    // Make a comment
    if (commentForm) {
      commentForm.addEventListener('submit', async e => {
        e.preventDefault();
        const text = commentInput.value.trim();
        if (!text) return;

        const authorName = user.displayName || user.email || 'Anonymous';

        try {
          await db.collection('comments').add({
            postId,
            author: authorName,
            authorId: user.uid,
            text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            upvotes: 0
          });

          commentInput.value = '';
          await loadComments();
        } catch (err) {
          console.error('Error adding comment:', err);
          alert('Error adding comment. Please try again.');
        }
      });
    }

    // Post Upvote
    if (upvoteButton) {
      upvoteButton.addEventListener('click', async () => {
        const userId = user.uid;
        const postRef = db.collection('posts').doc(postId);
        const voteRef = postRef.collection('postVotes').doc(userId);

        try {
          const voteSnap = await voteRef.get();

          if (voteSnap.exists) {
            await voteRef.delete();
            await postRef.update({
              upvotes: firebase.firestore.FieldValue.increment(-1)
            });

            const current = parseInt(upvotesSpan.textContent, 10) || 0;
            upvotesSpan.textContent = current - 1;
          } else {
            await voteRef.set({
              userId,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            await postRef.update({
              upvotes: firebase.firestore.FieldValue.increment(1)
            });

            const current = parseInt(upvotesSpan.textContent, 10) || 0;
            upvotesSpan.textContent = current + 1;
          }
        } catch (err) {
          console.error('Error toggling post upvote:', err);
          alert('Error updating your vote on this post.');
        }
      });
    }

    loadPost();
    loadComments();
    loadMyPosts(user);
  });
});
