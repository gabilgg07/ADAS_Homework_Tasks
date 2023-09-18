"use strict";

const MONTHS_AZ = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "İyun",
  "İyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];
let counter = 1;

let posts = JSON.parse(localStorage.getItem("posts"));
if (posts)
  posts.forEach((post) => {
    post.createdDate = new Date(post.createdDate);
  });

if (!posts) {
  console.log("yoxdu");
  posts = [
    {
      id: counter++,
      title: "Title 1",
      description: "Description 1",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 2",
      description: "Description 2",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 3",
      description: "Description 3",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 4",
      description: "Description 4",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 5",
      description: "Description 5",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 6",
      description: "Description 6",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 7",
      description: "Description 7",
      createdDate: new Date(),
    },
    {
      id: counter++,
      title: "Title 8",
      description: "Description 8",
      createdDate: new Date(),
    },
  ];
}

let searchedPosts;

// result posts count
const serach__counts = document.querySelector(".header__serach--counts strong");

// show post

const postCards__wrapper = document.querySelector(".postCards__wrapper");
const postList__wrapper = document.querySelector(".postList__wrapper");

refreshPosts(posts);

// get all

const header__search__allBtn = document.querySelector(
  ".header__search--allBtn"
);
header__search__allBtn.addEventListener("click", function () {
  refreshPosts(posts);
});

// search input

const search__input = document.querySelector(".header__search--input");
const search__btn = document.querySelector(".header__search--btn");

search__btn.addEventListener("click", searchPosts);
search__input.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    searchPosts();
  }
});

function searchPosts() {
  let inpVal = search__input.value;
  if (inpVal && inpVal.trim().length > 1) {
    searchedPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(inpVal.toLowerCase())
    );
    if (searchedPosts.length > 0) {
      refreshPosts(searchedPosts);
    } else {
      alert("Dont found any posts");
    }
  } else {
    alert("For search post, you must input minimum 2 character");
    search__input.focus();
  }
}

// Add Post

const addPost__title = document.querySelector(".addPost__title");
const addPost__desc = document.querySelector(".addPost__desc");
const addPost__btn = document.querySelector(".addPost__btn");

addPost__btn.addEventListener("click", function () {
  let titleVal = addPost__title.value;
  if (!titleVal || (titleVal && titleVal.trim().length <= 0)) {
    alert("Title can not be empty!");
    addPost__title.focus();
    return;
  }
  let descVal = addPost__desc.value;
  if (!descVal || (descVal && descVal.trim().length <= 0)) {
    alert("Description can not be empty!");
    addPost__desc.focus();
    return;
  }

  const newPost = {
    id: counter++,
    title: titleVal,
    description: descVal,
    createdDate: new Date(),
  };

  posts.unshift(newPost);

  refreshPosts(posts);
});

// functions

function showPostCards(arr) {
  postCards__wrapper.innerHTML = "";
  arr.forEach((post) => {
    // article
    const postCards__item = document.createElement("article");
    postCards__item.className = "postCards__item";
    postCards__item.dataset.id = post.id;

    // title
    const postCards__item__title = document.createElement("p");
    postCards__item__title.className = "postCards__item--title";

    const strongTitle = document.createElement("strong");
    strongTitle.textContent = "Title: ";
    postCards__item__title.append(strongTitle);

    const postCards__item__title__txt = document.createElement("span");
    postCards__item__title__txt.className = "postCards__item--title--txt";
    postCards__item__title__txt.textContent = subTxt(post.title, 35);
    postCards__item__title.append(postCards__item__title__txt);

    postCards__item.append(postCards__item__title);

    // description
    const postCards__item__desc = document.createElement("p");
    postCards__item__desc.className = "postCards__item--desc";

    const strongDesc = document.createElement("strong");
    strongDesc.textContent = "Description: ";
    postCards__item__desc.append(strongDesc);

    const postCards__item__desc__txt = document.createElement("span");
    postCards__item__desc__txt.className = "postCards__item--desc--txt";
    postCards__item__desc__txt.textContent = subTxt(post.description, 20);
    postCards__item__desc.append(postCards__item__desc__txt);

    postCards__item.append(postCards__item__desc);

    // createdDate
    const postCards__item__date = document.createElement("p");
    postCards__item__date.className = "postCards__item--date";

    const strongDate = document.createElement("strong");
    strongDate.textContent = "Created Date: ";
    postCards__item__date.append(strongDate);

    const postCards__item__date__txt = document.createElement("span");
    postCards__item__date__txt.className = "postCards__item--date--txt";
    postCards__item__date__txt.textContent = toStringFullDateAZ(
      post.createdDate
    );
    postCards__item__date.append(postCards__item__date__txt);

    postCards__item.append(postCards__item__date);

    // to Wrapper append

    postCards__wrapper.append(postCards__item);
  });
}

function showPostList(arr) {
  postList__wrapper.innerHTML = "";
  arr.forEach((post) => {
    // article
    const postList__item = document.createElement("li");
    postList__item.className = "postList__item";
    postList__item.dataset.id = post.id;

    // title
    const postList__item__title = document.createElement("p");
    postList__item__title.className = "postList__item--title";

    const strongTitle = document.createElement("strong");
    strongTitle.textContent = "Title: ";
    postList__item__title.append(strongTitle);

    const postList__item__title__txt = document.createElement("span");
    postList__item__title__txt.className = "postList__item--title--txt";
    postList__item__title__txt.textContent = subTxt(post.title, 20);
    postList__item__title.append(postList__item__title__txt);

    postList__item.append(postList__item__title);

    // description
    const postList__item__desc = document.createElement("p");
    postList__item__desc.className = "postList__item--desc";

    const strongDesc = document.createElement("strong");
    strongDesc.textContent = "Description: ";
    postList__item__desc.append(strongDesc);

    const postList__item__desc__txt = document.createElement("span");
    postList__item__desc__txt.className = "postList__item--desc--txt";
    postList__item__desc__txt.textContent = subTxt(post.description, 75);
    postList__item__desc.append(postList__item__desc__txt);

    postList__item.append(postList__item__desc);

    // createdDate
    const postList__item__date = document.createElement("p");
    postList__item__date.className = "postList__item--date";

    const strongDate = document.createElement("strong");
    strongDate.textContent = "Created Date: ";
    postList__item__date.append(strongDate);

    const postList__item__date__txt = document.createElement("span");
    postList__item__date__txt.className = "postList__item--date--txt";
    postList__item__date__txt.textContent = toStringFullDateAZ(
      post.createdDate,
      true
    );
    postList__item__date.append(postList__item__date__txt);

    postList__item.append(postList__item__date);

    // deleteBtn

    const postList__item__btn = document.createElement("button");
    postList__item__btn.className = "postList__item--btn";
    postList__item__btn.textContent = "DELETE";

    postList__item__btn.addEventListener("click", function () {
      posts = posts.filter((p) => p.id !== post.id);

      serach__counts.textContent = posts.length;
      showPostCards(posts);
      showPostList(posts);
    });

    postList__item.append(postList__item__btn);

    // to Wrapper append

    postList__wrapper.append(postList__item);
  });
}

function toStringFullDateAZ(date, isFull = false) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate().toString();
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString();
  const second = date.getSeconds().toString();

  const full = isFull
    ? `${day} ${MONTHS_AZ[month]} ${year}, ${hour.padStart(
        2,
        "0"
      )}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`
    : `${day.padStart(2, "0")}.${(month + 1)
        .toString()
        .padStart(2, "0")}.${year}, ${hour.padStart(2, "0")}:${minute.padStart(
        2,
        "0"
      )}:${second.padStart(2, "0")}`;

  return full;
}

function refreshPosts(array) {
  serach__counts.textContent = array.length;
  showPostCards(array);
  showPostList(array);
}

function subTxt(txt, len) {
  return txt.substring(0, len + 1) + (txt.length > len ? "..." : "");
}

// add all localStorage

window.onbeforeunload = function () {
  if (posts && posts.length > 0) {
    localStorage.setItem("posts", JSON.stringify(posts));
  } else {
    localStorage.removeItem("posts");
  }
};
