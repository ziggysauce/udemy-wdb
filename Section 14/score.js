const p1Button = document.querySelector('#p1');
const p2Button = document.querySelector('#p2');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const numInput = document.querySelector('input');
const winningScoreDisplay = document.querySelector('p span');

let winningScore = 5;
let p1score = 0;
let p2score = 0;
let gameOver = false;


p1Button.addEventListener('click', () => {
  if(!gameOver) {
    p1score++;
    if (p1score === winningScore) {
      p1Display.classList.add('winner');
      gameOver = true;
    }
    p1Display.textContent = p1score;
  }
});

p2Button.addEventListener('click', () => {
  if(!gameOver) {
    p2score++;
    if (p2score === winningScore) {
      p2Display.classList.add('winner');
      gameOver = true;
    }
    p2Display.textContent = p2score;
  }
});

resetButton.addEventListener('click', () => {
  reset();
});

function reset() {
  p1score = 0;
  p2score = 0;
  p1Display.textContent = 0;
  p2Display.textContent = 0;
  p1Display.classList.remove('winner');
  p2Display.classList.remove('winner');
  gameOver = false;
}

numInput.addEventListener('change', () => {
  winningScoreDisplay.textContent = numInput.value;
  winningScore = Number(numInput.value);
  reset();
})
