const testvar = [1, 2, 3];
const testvar2 = [1, 1, 1];

// Takes an array as an argument
// Prints out elements from array in reverse order
// Don't actually reverse the array
// Hint: use a loop
function printReverse(array) {
  for (let i=array.length-1; i>=0; i--) {
    console.log(array[i]);
  }
}

// Takes an array as an argument
// Returns true if all elements in array are identical
// Hint: use a loop, use a variable to keep track of the first element to test
function isUniform(array) {
  const first = array[0];
  for (let i=1; i<array.length; i++) {
    if (array[i] !== first) {
      return false;
    }
  }
  return true;
}

// Accepts an array of numbers
// Returns sum of all numbers from the array
// Hint: use a loop, have a variable to store total
function sumArray(array) {
  let sum = 0;
  array.forEach(function(i) {
    sum += i;
  })
  return sum;
}

// Accepts an array of numbers
// Returns maximum number in array
// Hint: use a loop, use a variable to store current max number
function max(array) {
  let max = array[0];
  array.forEach(function(i) {
    if (i > max) {
      max = i;
    }
  })
  return max;
}
