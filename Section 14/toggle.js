const button = document.querySelector('button');
// let isPurple = false;
//
// button.addEventListener('click', () => {
//   if (isPurple) {
//     document.body.style.background = 'white';
//   } else {
//     document.body.style.background = 'purple';
//   }
//   isPurple = !isPurple;
// });

button.addEventListener('click', () => {
  document.body.classList.toggle('purple');
});
