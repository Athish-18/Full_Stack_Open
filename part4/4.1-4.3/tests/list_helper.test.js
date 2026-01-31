// const { test } = require("node:test");
// const assert = require("node:assert");
// const list_helper = require("../utils/list_helper");

// test("dummy returns one", () => {
//   const blogs = []
//   const result=list_helper.dummy(blogs)
//   assert.strictEqual(result,1);
// });

const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe('totalLikes',()=>
{
  test('blog with 0 likes',()=>
  {
    const blogs=[];
    const result=listHelper.totalLikes(blogs);
    assert.strictEqual(result,0);
  })


  test("when list has only one blog equals the likes of that"),()=>
  {
    const blog = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 5,
        __v: 0,
      },
    ];
    const result=listHelper.totalLikes(blog);
    assert.strictEqual(result,blog.likes);
  }



    test("of a bigger list is calculated right", () => {
      const blogs = [{ likes: 5 }, { likes: 10 }, { likes: 7 }];

      const result = listHelper.totalLikes(blogs);
      assert.strictEqual(result, 22);
    });
  
})