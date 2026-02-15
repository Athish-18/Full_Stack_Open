const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("blogs are returned as json and correct amount", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("blog posts have id property instead of _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined();
  });
});

test("a valid blog can be added", async () => {
  const blogsAtStart = await helper.BlogsInDb();

  const newBlog = {
    title: "Async/Await is awesome",
    author: "Athish",
    url: "http://example.com/async",
    likes: 7,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const blogsAtEnd = await helper.BlogsInDb();

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain("Async/Await is awesome");
});

test("if likes is missing, it defaults to 0", async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "Athish",
    url: "http://example.com/nolikes",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body.likes).toBe(0);
});

test("blog without title is not added and returns 400", async () => {
  const blogsAtStart = await helper.BlogsInDb();

  const newBlog = {
    author: "Athish",
    url: "http://example.com/notitle",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.BlogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
});

test("blog without url is not added and returns 400", async () => {
  const blogsAtStart = await helper.BlogsInDb();

  const newBlog = {
    title: "No URL blog",
    author: "Athish",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.BlogsInDb();
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
});

describe("updating a blog", () => {
  test("succeeds in updating the number of likes", async () => {
    const blogsAtStart = await helper.BlogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 5,
    };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(blogToUpdate.likes + 5);

    const blogsAtEnd = await helper.BlogsInDb();
    const updated = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    expect(updated.likes).toBe(blogToUpdate.likes + 5);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.BlogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.BlogsInDb();

    const ids = blogsAtEnd.map((b) => b.id);
    expect(ids).not.toContain(blogToDelete.id);
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
