const MAIN_URL = "http://localhost:3000/characters";

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

//rest functions
// const

// Adding event listers to nodes
videoShareButtonNode.addEventListener("click", handleVideoModalPaneToggle);
modalVideoCloseNode.addEventListener("click", handleVideoModalPaneToggle);

topicShareButtonNode.addEventListener("click", handleTopicModalPaneToggle);
modalTopicCloseNode.addEventListener("click", handleTopicModalPaneToggle);

homeNavNode.addEventListener("click", handleDisplayingHomeContent);
topicsNavNode.addEventListener("click", handleDisplayingTopicsContent);
videosNavNode.addEventListener("click", handleDisplayingVideosContent);

const init = () => {
  const home = document.querySelector("#videos_modal");
  home.classList.add("modal--visible");
};

// Working with videos
const fetchAllVideosFromServer = async () => {
  return fetch(getDomainUrl())
    .then((resp) => resp.json())
    .then((videos) => videos);
};

window.onload = init;
