// get DOM elements needed for game

const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// Current and new colors object

const colorsObj = {
  color1: { current: "#006400", new: "#00ff00" },
  color2: { current: "#800000", new: "#ff0000" },
  color3: { current: "#0000b8", new: "#0000ff" },
  color4: { current: "#808000", new: "#ffff00" },
};

// Game variables

let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// Function to get a random color from colors object

const getRandomColor = (colorsObj) => {
  const colorKeys = Object.keys(colorsObj);
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// Function to pausi execution of game for given amount of time

const delay = async (time) => {
  return await new Promise((resolve) => setTimeout(resolve, time));
};

// Function to generate a random path of colors

const generateRandomPath = async () => {
  randomColors.push(getRandomColor(colorsObj));
  score = randomColors.length;
  isPathGenerating = true;
  await showPath(randomColors);
};

// Function to show tthe path of colors

const showPath = async (colors) => {
  scoreEl.innerText = score;

  // Loop through any coloor in array

  for (let color of colors) {
    const currentColor = document.querySelector(`.${color}`);

    // Pause execution for 500 ms
    await delay(500);

    // Set background to new color
    currentColor.style.backgroundColor = colorsObj[color].new;
    await delay(600);

    // Set background to old color
    currentColor.style.backgroundColor = colorsObj[color].current;
    await delay(600);
  }

  // Set flag to indicate game is no longer generating paths

  isPathGenerating = false;
};

// Function to end the game and show final score
const endGame = () => {
  resultEl.innerHTML = `<span> Your Score : </span> ${score}`;
  resultEl.classList.remove("hide");
  containerEl.classList.remove("hide");
  wrapperEl.classList.add("hide");
  startBtn.innerText = "Play Again";
  startBtn.classList.remove("hide");
};

// Function to reset game after ending

const resetGame = () => {
  score = 0;
  clickCount = 0;
  randomColors = [];
  isPathGenerating = false;
  wrapperEl.classList.remove("hide");
  containerEl.classList.add("hide");
  generateRandomPath();
};

// Function to handle a color being clicked

const handleColorClick = async (e) => {
  // If the path is currently being generated, ignore click

  if (isPathGenerating) {
    return false;
  }

  // If clicked correct color, update score and continue generating the path

  if (e.target.classList.contains(randomColors[clickCount])) {
    e.target.style.backgroundColor = colorsObj[randomColors[clickCount]].new;

    await delay(500);

    e.target.style.backgroundColor =
      colorsObj[randomColors[clickCount]].current;
    clickCount++;

    if (clickCount === score) {
      clickCount = 0;
      generateRandomPath();
    }
    // If the clicked color is incorect, end game
  } else {
    endGame();
  }
};

// Event listeners

startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => {
  color.addEventListener("click", handleColorClick);
});
