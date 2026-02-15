const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "First blog",
    author: "Athish",
    url: "http://example.com/1",
    likes: 5,
  },
  {
    title: "Second blog",
    author: "Someone",
    url: "http://example.com/2",
    likes: 10,
  },
];

const BlogsInDb= async()=>
{
  const blogs=await Blog.find({});
  return blogs.map(b=>b.toJSON());

}
module.exports={BlogsInDb,
  initialBlogs,
}