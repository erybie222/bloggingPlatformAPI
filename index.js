import express from "express";

const app = express();
const port = 3000;
app.use(express.json()); // Middleware to parse JSON requests

// Array to store blog posts (temporary storage, not a database)
var posts = [];

// Create a new blog post (POST /posts)
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1, // Auto-increment ID
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags,
    createdAt: new Date(), // Timestamp when post is created
    updatedAt: new Date(), // Timestamp when post is updated
  };

  posts.push(newPost); // Add new post to the array
  res.status(201).json(newPost); // Return the new post with status 201 (Created)
});

// Update an existing blog post (PUT /posts/:id)
app.put("/posts/:id", (req, res) => {
  const updatedPostId = parseInt(req.params.id); // Convert ID from URL to an integer
  const index = posts.findIndex((p) => p.id === updatedPostId); // Find index of the post

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" }); // Return 404 if post does not exist
  }

  const { title, content, category, tags } = req.body;
  
  // Validate if all fields are provided
  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "All fields are required for PUT" }); // Return 400 if any field is missing
  }

  const oldPost = posts[index]; // Get the existing post

  // Create an updated post object
  const updatedPost = {
    id: updatedPostId, // Keep the same ID
    title: title,
    content: content,
    category: category,
    tags: tags,
    createdAt: oldPost.createdAt, // Preserve original creation date
    updatedAt: new Date(), // Update modification timestamp
  };

  posts[index] = updatedPost; // Replace the old post with the updated one
  res.status(200).json(updatedPost); // Return the updated post
});

// Delete a blog post (DELETE /posts/:id)
app.delete("/posts/:id", (req, res) => {
  const deletedPostsId = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === deletedPostsId);

  if (index === -1) {
    return res.status(404).json({ error: "Not Found" }); // Return 404 if post does not exist
  } 

  posts.splice(index, 1); // Remove the post from the array
  res.status(204).send(); // Return 204 No Content (successful deletion)
});

// Retrieve a single blog post by ID (GET /posts/:id)
app.get("/posts/:id", (req, res) => {
  const getId = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === getId);

  if (index !== -1) {
    res.status(200).json(posts[index]); // Return the found post
  } else {
    res.status(404).json({ error: "Not Found" }); // Return 404 if post does not exist
  }
});

// Retrieve all blog posts (GET /posts)
app.get("/posts", (req, res) => {
  res.status(200).json(posts); // Return all posts
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
