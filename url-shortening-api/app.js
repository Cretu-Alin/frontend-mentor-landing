const input = document.querySelector("input");
const submitBtn = document.querySelector("submit");
const form = document.querySelector("form");
const loadingText = document.querySelector(".loading");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".navigation-container");
let menuOpen = false;

let isLoading = true;

const getInputData = (e) => {
  e.preventDefault();
  const value = input.value;
  console.log(value);
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if (!value || !regex.test(value)) {
    input.classList.add("warning");
    input.setAttribute("placeholder", "Please enter a valid link...");
    return;
  }
  input.classList.remove("warning");
  input.value = "";
  input.setAttribute("placeholder", "Shorten your link here...");
  getData(value);
};

// Axios getdata from Server

const getData = (param) => {
  isLoading = true;

  loadingText.style.display = "block";
  let url = `
  https://api.shrtco.de/v2/shorten?url=${param}`;

  axios
    .get(url)
    .then((resp) => {
      isLoading = false;
      loadingText.style.display = "none";
      console.log(resp.data);
      let param2 = resp.data.result.full_short_link;
      resultBox(param, param2);
    })
    .catch((err) => {
      console.log(err);
      isLoading = false;
    });
};
form.addEventListener("submit", getInputData);

// Function that create a div every time it runs;
const resultBox = (firstValue, secondValue) => {
  const mainDiv = document.querySelector(".results");

  const linkItem = document.createElement("div");
  linkItem.classList.add("link");

  linkItem.innerHTML = `
    <span class="original-link">${firstValue}</span>
    <span class="new-link">${secondValue}</span>
    <button class="submit copy">Copy</button>
    `;

  mainDiv.append(linkItem);
};

const handleCopy = (e) => {
  if (e.target.classList.contains("copy")) {
    const btn = e.target;
    const tempInput = document.createElement("input");
    const newLink = btn.previousElementSibling.innerText;
    tempInput.setAttribute("value", newLink);
    document.body.append(tempInput);
    tempInput.select();

    btn.innerText = "Copied";
    btn.classList.add("copied");
    document.execCommand("copy");
    tempInput.parentNode.removeChild(tempInput);
  }
};
document.addEventListener("click", handleCopy);

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menuBtn.classList.add("open");
    nav.style.display = "flex";
    menuOpen = true;
  } else {
    menuBtn.classList.remove("open");
    menuOpen = false;
  }

  ////////
});
