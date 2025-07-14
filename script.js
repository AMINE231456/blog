document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display blog posts
  fetch('/api/posts')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('posts-container');
      
      data.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
          <img src="${post.image}" alt="${post.title}">
          <div class="post-content">
            <h2>${post.title}</h2>
            <p class="meta">By ${post.author} on ${post.date}</p>
            <p>${post.content.substring(0, 150)}...</p>
            <a href="#" class="read-more" data-id="${post.id}">Read more</a>
          </div>
        `;
        container.appendChild(postElement);
      });

      // Add event listeners to "Read more" links
      document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const postId = e.target.getAttribute('data-id');
          showPostDetails(postId);
        });
      });
    })
    .catch(error => console.error('Error loading posts:', error));

  // Search functionality
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const posts = document.querySelectorAll('.blog-post');
      
      posts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('p:not(.meta)').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          post.style.display = 'flex';
        } else {
          post.style.display = 'none';
        }
      });
    });
  }
});

function showPostDetails(postId) {
  fetch(`/api/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('posts-container').innerHTML = `
        <article class="full-post">
          <button id="back-button">← Back to all posts</button>
          <img src="${post.image}" alt="${post.title}">
          <h1>${post.title}</h1>
          <p class="meta">By ${post.author} on ${post.date}</p>
          <div class="post-content">${post.content}</div>
        </article>
      `;
      
      document.getElementById('back-button').addEventListener('click', () => {
        location.reload();
      });
    })
    .catch(error => console.error('Error loading post:', error));
}