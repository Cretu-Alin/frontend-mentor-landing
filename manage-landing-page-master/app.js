const burgerBtn = document.querySelector(".burger");
const backdrop = document.querySelector(".backdrop");
const list = document.querySelector(".list-items");

const burgerHandler = () => {
  if (burgerBtn.getAttribute("src") === "./images/icon-hamburger.svg") {
    list.classList.add("visible");
    backdropHandler();
    burgerBtn.src = "./images/icon-close.svg";
  } else {
    closeModal();
    burgerBtn.src = "./images/icon-hamburger.svg";
  }
};

const backdropHandler = () => {
  backdrop.classList.add("visible");
};

const closeModal = () => {
  list.classList.remove("visible");
  backdrop.classList.remove("visible");
};

burgerBtn.addEventListener("click", burgerHandler);
