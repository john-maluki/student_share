const MAIN_URL = "http://localhost:3000";

let users = {};
let videos = {};
let topics = {};

// Defining global nodes
const topicShareButtonNode = document.querySelector("#topic-share-button");
const videoShareButtonNode = document.querySelector("#video-share-button");
const topicFormModalPaneNode = document.querySelector(
  "#share-topic-form-modal"
);
const videoFormModalPaneNode = document.querySelector(
  "#share-video-form-modal"
);
const modalTopicCloseNode = document.querySelector("#modal__topic-close");
const modalVideoCloseNode = document.querySelector("#modal__video-close");

const homeNavNode = document.querySelector("#main__item--home");
const topicsNavNode = document.querySelector("#main__item--topics");
const videosNavNode = document.querySelector("#main__item--videos");

const containerCardNode = document.querySelectorAll(".container-card");

// Get methods
const getDomainUrl = () => {
  return MAIN_URL;
};

// Set methods
const setUsers = async () => {
  users = await fetchAllUsersFromServer();
};

const setVideos = async () => {
  videos = await fetchAllVideosFromServer();
};

// Handlers
const handleTopicModalPaneToggle = (e) => {
  e.preventDefault();
  const isOpen = topicFormModalPaneNode.classList.contains("modal--visible");

  if (isOpen) {
    topicFormModalPaneNode.classList.remove("modal--visible");
  } else {
    topicFormModalPaneNode.classList.add("modal--visible");
  }
};

const handleVideoModalPaneToggle = (e) => {
  e.preventDefault();
  const isOpen = videoFormModalPaneNode.classList.contains("modal--visible");

  if (isOpen) {
    videoFormModalPaneNode.classList.remove("modal--visible");
  } else {
    videoFormModalPaneNode.classList.add("modal--visible");
  }
};

const handleDisplayingHomeContent = (e) => {
  e.preventDefault();
  const videos = document.querySelector("#videos_modal");
  videos.classList.remove("modal--visible");
  const topics = document.querySelector("#topics_modal");
  topics.classList.remove("modal--visible");
  const home = document.querySelector("#home_modal");
  home.classList.add("modal--visible");
};

const handleDisplayingTopicsContent = (e) => {
  e.preventDefault();
  const home = document.querySelector("#home_modal");
  home.classList.remove("modal--visible");
  const videos = document.querySelector("#videos_modal");
  videos.classList.remove("modal--visible");
  const topics = document.querySelector("#topics_modal");
  topics.classList.add("modal--visible");
};

const handleDisplayingVideosContent = (e) => {
  e.preventDefault();
  const home = document.querySelector("#home_modal");
  home.classList.remove("modal--visible");
  const topics = document.querySelector("#topics_modal");
  topics.classList.remove("modal--visible");
  const videos = document.querySelector("#videos_modal");
  videos.classList.add("modal--visible");
};

// Adding event listers to nodes
videoShareButtonNode.addEventListener("click", handleVideoModalPaneToggle);
modalVideoCloseNode.addEventListener("click", handleVideoModalPaneToggle);

topicShareButtonNode.addEventListener("click", handleTopicModalPaneToggle);
modalTopicCloseNode.addEventListener("click", handleTopicModalPaneToggle);

homeNavNode.addEventListener("click", handleDisplayingHomeContent);
topicsNavNode.addEventListener("click", handleDisplayingTopicsContent);
videosNavNode.addEventListener("click", handleDisplayingVideosContent);

// Working with videos
const fetchAllVideosFromServer = async () => {
  return fetch(`${getDomainUrl()}/videos`)
    .then((resp) => resp.json())
    .then((videos) => videos);
};

const sortVideosByNumberOfLikes = (videos) => {
  // sort videos based on likes
  const sortedVideos = videos.sort((v1, v2) =>
    v1.likes < v2.likes ? 1 : v1.likes > v2.likes ? -1 : 0
  );
  return sortedVideos;
};

const renderVideosOnDom = async () => {
  const videos = await fetchAllVideosFromServer();
  const sortedVideos = sortVideosByNumberOfLikes(videos);
  const containerCardContentNode = document.querySelector(
    "#container-card__content"
  );
  sortedVideos.forEach((video) => {
    const user = users.find((user) => user.id === video.userId);

    const userCardNode = document.createElement("div");
    userCardNode.classList.add("user-card");
    const userCardProfileNode = document.createElement("div");
    userCardProfileNode.classList.add("user-card__profile");
    const imgProfileNode = document.createElement("img");
    imgProfileNode.classList.add("img-profile");
    imgProfileNode.src = user.profile_pic;
    imgProfileNode.alt = user.name;
    const userCardDetailsNode = document.createElement("div");
    userCardDetailsNode.classList.add("user-card__details");
    const userCardHeaderNode = document.createElement("div");
    userCardHeaderNode.classList.add("user-card__header");
    const userCardTitleNode = document.createElement("h1");
    userCardTitleNode.classList.add("user-card__title");
    userCardTitleNode.textContent = video.title;
    const userCardHandleNode = document.createElement("span");
    userCardHandleNode.classList.add("user-card__handle");
    userCardHandleNode.textContent = user.handle;
    const userCardDescriptionNode = document.createElement("p");
    userCardDescriptionNode.classList.add("user-card__description");
    userCardDescriptionNode.textContent = video.video_description;
    const userCardVideoNode = document.createElement("div");
    userCardVideoNode.classList.add("user-card__video");
    const iframeNode = document.createElement("iframe");
    iframeNode.width = "100%";
    iframeNode.height = "100%";
    iframeNode.src = video.video_url;
    iframeNode.title = "YouTube video player";
    iframeNode.frameborder = "0";
    iframeNode.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframeNode.allowFullscreen = true;
    const userCardFooterNode = document.createElement("div");
    userCardFooterNode.classList.add("user-card__footer");
    const userCardExpressionNode = document.createElement("div");
    userCardExpressionNode.classList.add("user-card__expression");
    const faThumbsUpNode = document.createElement("i");
    faThumbsUpNode.classList.add("fa");
    faThumbsUpNode.classList.add("fa-thumbs-up");
    faThumbsUpNode.classList.add("user-card__user-expression-icon");
    faThumbsUpNode.title = "Follow";
    // faThumbsUpNode.aria-hidden="true"
    const likesNode = document.createElement("h3");
    likesNode.classList.add("user-card__expression-number");
    likesNode.textContent = "Likes ";
    const likesNumberNode = document.createElement("span");
    likesNumberNode.textContent = video.likes;

    const userCardExpressionNode2 = document.createElement("div");
    userCardExpressionNode2.classList.add("user-card__expression");
    const faUserNode = document.createElement("i");
    faUserNode.classList.add("fa");
    faUserNode.classList.add("fa-user");
    faUserNode.classList.add("user-card__user-expression-icon");
    faUserNode.title = "Follow";
    // faUserNode.aria-hidden="true"
    const followersNode = document.createElement("h3");
    followersNode.classList.add("user-card__expression-number");
    followersNode.textContent = "Followers ";
    const followersNumberNode = document.createElement("span");
    followersNumberNode.textContent = video.followers;

    userCardNode.appendChild(userCardProfileNode);
    userCardNode.appendChild(userCardDetailsNode);
    userCardProfileNode.appendChild(imgProfileNode);

    userCardDetailsNode.appendChild(userCardHeaderNode);
    userCardDetailsNode.appendChild(userCardDescriptionNode);
    userCardDetailsNode.appendChild(userCardVideoNode);
    userCardDetailsNode.appendChild(userCardFooterNode);
    userCardHeaderNode.appendChild(userCardTitleNode);
    userCardHeaderNode.appendChild(userCardHandleNode);
    userCardVideoNode.appendChild(iframeNode);
    userCardFooterNode.appendChild(userCardExpressionNode);
    userCardFooterNode.appendChild(userCardExpressionNode2);
    userCardExpressionNode.appendChild(faThumbsUpNode);
    userCardExpressionNode.appendChild(likesNode);
    likesNode.appendChild(likesNumberNode);
    userCardExpressionNode2.appendChild(faUserNode);
    userCardExpressionNode2.appendChild(followersNode);
    followersNode.appendChild(followersNumberNode);

    containerCardContentNode.appendChild(userCardNode);
  });
};

// Working with users
const fetchAllUsersFromServer = async () => {
  return fetch(`${getDomainUrl()}/users`)
    .then((resp) => resp.json())
    .then((users) => users);
};

// Initialize app when it loads
const init = async () => {
  const home = document.querySelector("#videos_modal");
  home.classList.add("modal--visible");
  await setUsers();
  await setVideos();
  renderVideosOnDom();
};

window.onload = init;
