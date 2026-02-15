const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, url } = request.body;

  if (!title || !url) {
    return response.status(400).json({
      error: "title and url are required",
    });
  }
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return response.status(404).end();
  }

  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});


blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const updatedBlog = {
    title,
    author,
    url,
    likes,
  };

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!blog) {
    return response.status(404).end();
  }

  response.json(blog);
});

module.exports = blogsRouter;
