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

topicShareButtonNode.addEventListener("click", handleTopicModalPaneToggle);
modalTopicCloseNode.addEventListener("click", handleTopicModalPaneToggle);

const handleVideoModalPaneToggle = (e) => {
  e.preventDefault();
  const isOpen = videoFormModalPaneNode.classList.contains("modal--visible");

  if (isOpen) {
    videoFormModalPaneNode.classList.remove("modal--visible");
  } else {
    videoFormModalPaneNode.classList.add("modal--visible");
  }
};

videoShareButtonNode.addEventListener("click", handleVideoModalPaneToggle);
modalVideoCloseNode.addEventListener("click", handleVideoModalPaneToggle);
