let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll('.square');
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
const modeButtons = document.querySelectorAll('.mode');

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  // mode buttons event listeners
  for (let i = 0; i < modeButtons.length; i += 1) {
    modeButtons[i].addEventListener('click', function() {
      modeButtons[0].classList.remove('selected');
      modeButtons[1].classList.remove('selected');
      this.classList.add('selected');
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i += 1) {
    // Add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    // Add click listeneres to squares
    squares[i].addEventListener('click', function() {
      // Grab color of clicked square
      let clickedColor = this.style.backgroundColor;
      // Compare color to pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = 'Correct!';
        resetButton.textContent = 'Play Again?';
        changeColor(clickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = '#232323';
        messageDisplay.textContent = 'Try Again';
      }
    });
  }
}

function reset() {
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // pick a new random color from the array
  pickedColor = pickColor();
  // change color display to match picked color
  colorDisplay.textContent = pickedColor;
  // change color of squares
  messageDisplay.textContent = '';
  for (let i = 0; i < squares.length; i += 1) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  h1.style.backgroundColor = 'steelblue';
  resetButton.textContent = 'New Colors';
}

// Resets game either after completion or during game
resetButton.addEventListener('click', function() {
  reset();
});

function changeColor(color) {
  // loop through all the squares
  for (let i = 0; i < squares.length; i += 1) {
    // change color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  // make an array
  const arr = [];
  // add num random colors to array
  for (let i = 0; i < num; i += 1) {
    // get random colors and push into arr
    arr.push(randomColor());
  }
  // return array
  return arr;
}

function randomColor() {
  // pick a red from 0-255
  let r = Math.floor(Math.random() * 256);
  // pick a green from 0-255
  let g = Math.floor(Math.random() * 256);
  // pick a blue from 0-255
  let b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
