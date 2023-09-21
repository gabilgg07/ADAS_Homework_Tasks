const posts_wrapper = document.querySelector(".posts-wrapper");
const post__title__txt = document.querySelector(".post__title--txt");
const post__body__txt = document.querySelector(".post__body--txt");
const url = "https://jsonplaceholder.typicode.com/posts";
let posts;
let post;

getPosts();

function createPostItem(post) {
  const article = document.createElement("article");
  article.className = "post_item";
  article.dataset.id = post.id;
  const title = document.createElement("h2");
  title.textContent = subTxt(post.title, 20);
  article.append(title);
  const body = document.createElement("p");
  body.textContent = subTxt(post.body, 30);
  article.append(body);
  article.addEventListener("click", function (e) {
    getPostById(e.currentTarget.getAttribute("data-id"));
  });
  posts_wrapper.append(article);
}

// functions:

function subTxt(txt, len) {
  return txt.substring(0, len + 1) + (txt.length > len ? "..." : "");
}

async function getPosts() {
  const data = fetch(url);
  posts = await (await data).json();
  posts = posts.slice(0, 8);
  posts.forEach((post) => {
    createPostItem(post);
  });
}

async function getPostById(id) {
  const data = fetch(url + `/${id}`);
  post = await (await data).json();
  const { title, body } = post;
  post__title__txt.textContent = title;
  post__body__txt.textContent = body;
}
