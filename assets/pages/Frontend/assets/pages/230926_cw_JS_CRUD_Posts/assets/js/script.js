const url = "https://posts-api-e5vx.onrender.com/posts";
const tbody = document.querySelector(".post-table tbody");
const loader = document.querySelector(".loader");

async function getPosts() {
  const res = await fetch(url);
  return res.json();
}

getPosts().then((posts) => {
  fillTable(posts);
  loader.style.display = "none";
});

function fillTable(arr) {
  tbody.innerHTML = "";
  arr.forEach((item) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    tdId.textContent = item.id;
    tr.append(tdId);
    const tdTitle = document.createElement("td");
    tdTitle.textContent = item.title;
    tr.append(tdTitle);
    const tdBody = document.createElement("td");
    tdBody.className = "tdDesc";
    tdBody.textContent = item.body;
    tr.append(tdBody);
    const tdCD = document.createElement("td");
    tdCD.className = "tdDate";
    tdCD.textContent = new Date(item.createdDate).toLocaleDateString();
    tr.append(tdCD);
    const tdActions = document.createElement("td");

    const actions = document.createElement("div");
    actions.className = "actions";

    const edit = document.createElement("a");
    edit.className = "edit";
    edit.href = `update.html?id=${item.id}`;
    edit.textContent = "Edit";
    actions.append(edit);
    const deleteBtn = document.createElement("a");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function (e) {
      e.preventDefault();
      deletePost(item.id).then((item) => {
        console.log(item);
        getPosts().then((posts) => {
          fillTable(posts);
        });
      });
    });
    actions.append(deleteBtn);
    tdActions.append(actions);
    tr.append(tdActions);
    tbody.append(tr);
  });
}

async function createPost(post) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return res.json();
}

const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
const btnAdd = document.querySelector(".btn-add");

btnAdd.addEventListener("click", function () {
  if (
    title.value &&
    desc.value &&
    title.value.trim().length > 0 &&
    desc.value.trim().length > 0
  ) {
    const post = {
      title: title.value,
      body: desc.value,
      createdDate: new Date(),
    };

    createPost(post).then((item) => {
      console.log(item);
      getPosts().then((posts) => {
        fillTable(posts);
      });
    });

    title.value = "";
    desc.value = "";
  } else {
    alert("Xanalar bos ola bilmez");
  }
});

async function deletePost(id) {
  const res = await fetch(url + `/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
