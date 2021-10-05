const title = document.querySelector("h1");
const CHAR_TIME = 30;

let text, index;

function requestCharAnimation(char, value) {
  setTimeout(function () {
    char.textContent = value;
    char.classList.add("fade-in");
  }, CHAR_TIME);
}

function addChar() {
  const char = document.createElement("span");
  char.classList.add("char");
  char.textContent = "▌";
  title.appendChild(char);
  requestCharAnimation(char, text.substr(index++, 1));
  if (index < text.length) {
    requestChar();
  }
}

function requestChar(delay = 0) {
  setTimeout(addChar, CHAR_TIME + delay);
}

function start() {
  index = 0;
  text = title.textContent.trim();
  title.textContent = "";
  requestChar(1000);
}

start();