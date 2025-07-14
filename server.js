const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

// Blog data (could be moved to a separate file)
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Node.js",
    content: "Node.js is a powerful JavaScript runtime...",
    author: "John Doe",
    date: "2023-06-10",
    image: "/blog/images/post1.jpg"
  },
  {
    id: 2,
    title: "CSS Grid Layout",
    content: "CSS Grid is a two-dimensional layout system...",
    author: "Jane Smith",
    date: "2023-07-15",
    image: "/blog/images/post2.jpg"
  }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../blog.html'));
});

app.get('/api/posts', (req, res) => {
  res.json(blogPosts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = blogPosts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Blog server running at http://localhost:${port}`);
});