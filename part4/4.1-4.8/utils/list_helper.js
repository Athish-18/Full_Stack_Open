// const dummy=(blogs)=>
// {
//   return 1;
// }

// module.exports={dummy};

const totalLikes=(blogs)=>
{
  return blogs.reduce((sum,blog)=>(sum+blog.likes),0)
}

const favoriteBlog=(blogs)=>
{
  if(blogs.length===0)
   { return null;
   }

   return blogs.reduce((fav,blog)=>
  {
    return blog.likes>fav.likes?blog:fav;
  })
}


const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  // Phase 1: count blogs per author
  const counts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  // Phase 2: find author with max blogs
  let maxAuthor = null;
  let maxBlogs = 0;

  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      maxBlogs = counts[author];
      maxAuthor = author;
    }
  }
  return {
    author: maxAuthor,
    blogs: maxBlogs,
  };

}

const mostLikes=(blogs)=>
{if(blogs.length===0) return null;

const likes=blogs.reduce((acc,blog)=>
{
  acc[blog.author]=(acc[blog.author]||0)+blog.likes;
  return acc;
},{});

let maxAuthor=null;
let maxLikes=0;
for(const author in likes)
{
  if(likes[author]>maxLikes)
  {
    maxLikes=likes[author];
    maxAuthor=author;
  }
}
return {
  author:maxAuthor,
  likes:maxLikes
};
};

module.exports={totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

