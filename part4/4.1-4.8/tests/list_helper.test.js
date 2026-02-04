const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("totalLikes", () => {
  test("blog with 0 likes", () => {
    const blogs = [];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const blogs = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
    ];

    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, blogs[0].likes);
  });

  test("of a bigger list is calculated right", () => {
    const blogs = [{ likes: 5 }, { likes: 10 }, { likes: 7 }];
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 22);
  });
});

describe("favoriteBlog", () => {
  test("fav blog with most likes", () => {
    const blogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);

    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("mostBlogs", () => {
  test("author with most blogs is returned", () => {
    const blogs = [
      { author: "Robert C. Martin" },
      { author: "Robert C. Martin" },
      { author: "Robert C. Martin" },
      { author: "Edsger W. Dijkstra" },
      { author: "Edsger W. Dijkstra" },
    ];

    const result = listHelper.mostBlogs(blogs);

    assert.deepStrictEqual(result, {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("mostLikes", () => {
  test("author with most likes is returned", () => {
    const blogs = [
      { author: "Edsger W. Dijkstra", likes: 12 },
      { author: "Robert C. Martin", likes: 10 },
      { author: "Edsger W. Dijkstra", likes: 5 },
    ];

    const result = listHelper.mostLikes(blogs);

    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});