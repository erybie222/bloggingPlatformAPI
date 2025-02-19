import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

var posts = [];
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    tags: req.body.tags,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put("/posts/:id", (req, res) => {
  const updatedPostId = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === updatedPostId);
  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  const { title, content, category, tags } = req.body;
  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "All fields are required for PUT" });
  }

  const oldPost = posts[index];

  const updatedPost = {
    id: updatedPostId,
    title: title,
    content: content,
    category: category,
    tags: tags,
    createdAt: oldPost.createdAt,
    updatedAt: new Date(),
  };

  posts[index] = updatedPost;
  res.status(200).json(updatedPost);
});

app.delete("/posts/:id", (req, res) => {
  const deletedPostsId = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === deletedPostsId);
  if (index !== 1) {
    posts.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
