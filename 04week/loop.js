// Use a do...while loop to console.log the numbers from 1 to 1000.

let num = 0;

do {
  num += 1;
  console.log(num);

} while (num <= 1000);


// Create an object (an array with keys and values) called person with the following data:
// firstName: "Jane"
// lastName: "Doe"
// birthDate: "Jan 5, 1925"
// gender: "female"

let person = {
firstName: "Jane",
lastName: "Doe",
birthDate: "Jan 5, 1925",
gender: "female"
};


// // Use a for...in loop and if statement to console.log the value associated with the key birthDate if the birth year is an odd number.

    
for (property in person) {
  if (property === 'birthDate') {
    const date = person[property];
    const dateYear = parseInt(date.split(' ')[2]);
    if ((dateYear % 2) !== 0) {
      // we know the year is odd because it's not a multiple of 2
      console.log(person[property]);
    }
  }
}


// // Create an arrayOfPersons that contains mulitiple objects. You can simply copy/paste the person object you made above multiple times. Feel free to change the values to reflect multiple people you might have in your database.

let arrayOfPersons = [
{
firstName: "Robbie",
lastName: "Gehring",
birthDate: "Nov 6, 1992",
gender: "male"
},
{
firstName: "Sarina",
lastName: "Colosimo",
birthDate: "Oct 15, 1989",
gender: "female"
},
{
firstName: "Max",
lastName: "Gehring",
birthDate: "Apr 11, 2013",
gender: "male"
}
];


// // Use .map() to map over the arrayOfPersons and console.log() their information.


arrayOfPersons.map(function(person, index, arr) {
  console.log(person);
  return person;
});



// // Use .filter() to filter the persons array and console.log only males in the array.


const males = arrayOfPersons.filter(function(object) {
  return object.gender === "male";
})  

console.log(males);


// // Use .filter() to filter the persons array and console.log only people that were born before Jan 1, 1990.

const before1990 = arrayOfPersons.filter(function (object) {
  const birthYear = parseInt(object.birthDate.split(' ')[2]);
  if (birthYear < 1990) {
      return true
    }
    return false
  })

  console.log(before1990);





