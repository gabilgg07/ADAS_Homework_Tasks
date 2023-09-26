const idFromHref = new URLSearchParams(window.location.search);
const id = idFromHref.get("id");
const url = "https://posts-api-e5vx.onrender.com/posts";

const pId = document.querySelector(".id");
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
const date = document.querySelector(".date");
const edit = document.querySelector(".edit");
const cancel = document.querySelector(".cancel");

async function getPost(id) {
  const res = await fetch(url + `/${id}`);
  return res.json();
}

getPost(id).then((post) => {
  pId.textContent = post.id;
  title.value = post.title;
  desc.value = post.body;
  date.textContent = new Date(post.createdDate).toLocaleDateString();
});

edit.addEventListener("click", function () {
  if (
    title.value &&
    desc.value &&
    title.value.trim().length > 0 &&
    desc.value.trim().length > 0
  ) {
    const post = {
      title: title.value,
      body: desc.value,
    };

    editPost(id, post).then((item) => {
      console.log(item);
    });

    window.location.href = "index.html";
  } else {
    alert("Xanalar bos ola bilmez");
  }
});

cancel.addEventListener("click", () => (window.location.href = "index.html"));

async function editPost(id, post) {
  const res = await fetch(url + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
}
