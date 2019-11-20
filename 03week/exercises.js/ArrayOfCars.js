// length
// Create an array called cars which consists of 4 different types of cars. The first car type should be Ford.
// Console.log the length of the array.

const cars = ['Ford','Audi','Prius','Lexus'];
console.log(cars.length);


// concat
// Create another array called more cars with 4 more different types of cars. The last car type should be Honda.
// Use the concat method to combine the cars and moreCars arrays into an array called totalCars.


const moreCars = ['Acura','Chevrolet','BMW','Honda'];
console.log(cars.concat(moreCars));


// indexOf and lastIndexOf
// Use the indexOf method to console.log the index of Honda.
// Use the lastIndexOf method to console.log the index of Ford.


let a = moreCars.indexOf("Honda");
console.log(a);

let b = cars.lastIndexOf("Ford");
console.log(b);

// join
// Use the join method to covert the array totalCars into a string called stringOfCars.


let totalCars = cars.concat(moreCars);
let stringOfCars = totalCars.join();
console.log(stringOfCars);


// split
// Use the split method to convert stringOfCars back intro an array called totalCars.

let c = stringOfCars.split(',');
console.log(c);



// reverse
// Use the reverse method to create an array carsInReverse which is the array totalCars in reverse.

let carsInReverse = totalCars.reverse(); 
console.log(carsInReverse);




// sort
// Use the sort method to put the array carsInReverse into alphabetical order.
// Based on the types of cars you used, predict which item in the array should be at index 0.
// Use the following code to confirm or reject your prediction:
// alert(carsInReverse.indexOf('yourPrediction'));

carsInReverse.sort();
console.log(carsInReverse.indexOf('Acura'));
console.log(carsInReverse);




// slice
// Use the slice method to remove Ford and Honda from the carsInReverse array and move them into a new array called removedCars.

let removedCars = carsInReverse.slice(4,6);
console.log(removedCars);


// splice
// Use the splice method to remove the 2nd and 3rd items in the array carsInReverse and add Ford and Honda in their place.

carsInReverse.splice(1,2,'Ford', 'Honda');
console.log(carsInReverse);


// push
// Use the push method to add the types of cars that you removed using the splice method to the carsInReverse array.

carsInReverse.push('Audi','BMW');
console.log(carsInReverse);

// pop
// Use the pop method to remove and console.log the last item in the array carsInReverse.


console.log(carsInReverse.pop());



// shift
// Use the shift method to remove and console.log the first item in the array carsInReverse.

console.log(carsInReverse.shift());

// unshift
// Use the unshift method to add a new type of car to the array carsInReverse.


carsInReverse.unshift('Hummer');
console.log(carsInReverse);



// forEach
// Create an array called numbers with the following items: 23, 45, 0, 2 Write code that will add 2 to each item in the array numbers.
// .forEach() requires a function to be passed into it as its first argument. Build a function that will add 2 and then use .forEach() to pass each number into your freshly built function. 

const numbers = [23, 45, 0, 2];

const addTwo = (number, idx) => {
  // replace the value in numbers at position idx with the value number + 2
  numbers.splice(idx, 1, number + 2);
}
numbers.forEach(addTwo);
console.log(numbers);
