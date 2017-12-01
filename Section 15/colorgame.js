const colors = [
  "rgb(255, 0, 0)",
  "rgb(255, 255, 0)",
  "rgb(0, 255, 0)",
  "rgb(0, 255, 255)",
  "rgb(0, 0, 255)",
  "rgb(255, 0, 255)",
]

const squares = document.querySelectorAll('.square');
const pickedColor = colors[3];
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');

colorDisplay.textContent = pickedColor;

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
    } else {
      this.style.backgroundColor = '#232323';
      messageDisplay.textContent = 'Try Again';
    }
  });
}

function changeColor(color) {

}
