let postsData = [
  {
    id: 1,
    author: "John",
    content: "Hello, Instagram!",
    likes: 10,
    comments: ["Great post!", "Nice photo!"],
    image: "https://files.codingninjas.in/image2-28694.jpg",
  },
  {
    id: 2,
    author: "Jane",
    content: "This is a great post!",
    likes: 15,
    comments: [],
    image: "https://files.codingninjas.in/oip-28704.jpg",
  },
  {
    id: 3,
    author: "Alice",
    content: "Another post",
    likes: 8,
    comments: [],
    image: "https://files.codingninjas.in/th-2-28706.jpg",
  },
  {
    id: 4,
    author: "Bob",
    content: "Check out this photo!",
    likes: 20,
    comments: [],
    image: "https://files.codingninjas.in/image1-28708.jpg",
  },
];

const likedPosts = new Set();

function renderPosts() {
  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  postsData.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const authorElement = document.createElement("h3");
    authorElement.textContent = post.author;

    const contentElement = document.createElement("p");
    contentElement.textContent = post.content;

    const imageElement = document.createElement("img");
    imageElement.src = post.image;
    imageElement.alt = "Post Image";

    const likeButton = document.createElement("button");
    likeButton.textContent = `Like`;
    likeButton.classList.add("like-button");
    likeButton.addEventListener("click", () => {
      if (!likedPosts.has(post.id)) {
        likePost(post.id);
        likedPosts.add(post.id);
        likeButton.style.background="red";
        console.log("clciked")
        likeButton.disabled = true;
      }
    });

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Write a comment...";

    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment";
    commentButton.classList.add("comment-button");
    commentButton.addEventListener("click", () => {
      addComment(post.id, commentInput.value);
      commentInput.value = "";
    });

    const postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");
    postFooter.textContent = `Likes: ${post.likes}   Comments: ${post.comments.length}`;

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    commentsContainer.style.display = "none";

    post.comments.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);
    });

    postElement.appendChild(authorElement);
    postElement.appendChild(imageElement);
    postElement.appendChild(contentElement);
    postElement.appendChild(likeButton);
    postElement.appendChild(commentInput);
    postElement.appendChild(commentButton);
    postElement.appendChild(postFooter);
    postElement.appendChild(commentsContainer);

    postFooter.addEventListener("click", () => {
      if (commentsContainer.style.display === "none") {
        commentsContainer.style.display = "block";
      } else {
        commentsContainer.style.display = "none";
      }
    });

    postsContainer.appendChild(postElement);
  });
}

function likePost(postId) {
  const post = postsData.find((post) => post.id === postId);
  if (post) {
    post.likes++;
    renderPosts();
  }
}

function addComment(postId, comment) {
  const post = postsData.find((post) => post.id === postId);
  if (post) {
    post.comments.push(comment);
    renderPosts();
  }
}

const postForm = document.getElementById("postForm");
postForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const authorInput = document.getElementById("authorInput");
  const contentInput = document.getElementById("contentInput");
  const imageInput = document.getElementById("imageInput");

  const author = authorInput.value;
  const content = contentInput.value;
  const image = imageInput.files[0]; // Use files[0] to get the selected file

  if (author && content && image) {
    createPost(author, content, image);
    authorInput.value = "";
    contentInput.value = "";
    imageInput.value = "";
  }
});

function createPost(author, content, image) {
  const newPost = {
    id: postsData.length + 1,
    author: author,
    content: content,
    likes: 0,
    comments: [],
    image: URL.createObjectURL(image), // Use createObjectURL to display the selected image
  };
  postsData.unshift(newPost);
  renderPosts();
}

// Initial rendering
renderPosts();
