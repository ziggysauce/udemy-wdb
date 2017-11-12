console.log("Print all numbers between -10 and 19");

var first = -10;
while (first < 20) {
  console.log(first);
  first++;
}


console.log("Print all even numbers between 10 and 40");
var second = 10;
while (second < 41) {
  if (second % 2 == 0) {
    console.log(second);
  }
  second++;
}

console.log("Print all odd numbers between 300 and 333");
var third = 300;
while (third < 334) {
  if (third % 2 == 1) {
    console.log(third);
  }
  third++;
}

console.log("Print all numbers divisible by 5 AND 3 between 5 and 50");
var fourth = 5;
while (fourth < 51) {
  if (fourth % 15 == 0) {
    console.log(fourth);
  }
  fourth++;
}
