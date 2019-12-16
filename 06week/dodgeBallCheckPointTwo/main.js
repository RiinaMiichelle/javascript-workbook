const assert = require('assert');

// Array of objects holding Dodgeball Player Info 
const arrOfPeople = [
  {
    id: 2,
    name: "Charles Young",
    age: 55,
    skillSet: "welding",
    placeBorn: "Omaha, Nebraska",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 20
  },
  {
    id: 3,
    name: "Judy Twilight",
    age: 35,
    skillSet: "fishing",
    placeBorn: "Louisville, Kentucky",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 20
  },
  {
    id: 4,
    name: "Cynthia Doolittle",
    age: 20,
    skillSet: "tic tac toe",
    placeBorn: "Pawnee, Texas",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 5
  },
  {
    id: 5,
    name: "John Willouby",
    age: 28,
    skillSet: "pipe fitting",
    placeBorn: "New York, New York",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 15
  },
  {
    id: 6,
    name: "Stan Honest",
    age: 20,
    skillSet: "boom-a-rang throwing",
    placeBorn: "Perth, Australia",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 3
  },
  {
    id: 7,
    name: "Mia Watu",
    age: 17,
    skillSet: "acrobatics",
    placeBorn: "Los Angeles, California",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 1
  },
  {
    id: 8,
    name: "Walter Cole",
    age: 32,
    skillSet: "jump rope",
    placeBorn: "New Orleans, Louisiana",
    canThrowBall: true,
    canDodgeBall: false,
    hasPaid: true,
    isHealthy: false,
    yearsExperience: 12
  },
]

//Array that will hold people we remove from "list of people"
//and give an instance of "player" to
const listOfPlayers = []

//Teams we will push players to once we remove them from "list of players"
//We need to extend the "player class" & give each team the keys "color" & "mascot".
const blueTeam = []
const redTeam = []

class player {
  constructor({id, name, canThrowBall, canDodgeBall, hasPaid, isHealthy, yearsExperience}){
    this.id = id;
    this.name = name;
    this.canThrowBall = canThrowBall;
    this.canDodgeBall = canDodgeBall;
    this.hasPaid = hasPaid;
    this.isHealthy = isHealthy;
    this.yearsExperience = yearsExperience;
  }
}
class blueTeammate extends player {
  constructor(props) {
    super(props);
    this.rendered = false;
    this.color = 'blue';
    this.mascot = 'blue bird';
  }
}
class redTeammate extends player {
  constructor(props) {
    super(props);
    this.rendered = false;
    this.color = 'red';
    this.mascot = 'devils';
  }
}

//"List of people" - when we click this button it shows us people. 
//We need to create a function to remove a person from this list
//And then add them to the "listOfPlayers" Array.
const listPeopleChoices = () => {
  const listElement = document.getElementById('people')
  arrOfPeople.forEach(person => {
    const li = document.createElement("li")
    li.id = `list-of-people-person-${person.id}`
    const button = document.createElement("button")
    button.innerHTML = "Make Player"
    button.addEventListener('click', function() {makePlayer(person.id)} )
    li.appendChild(button)
    li.appendChild(document.createTextNode(person.name + " - " + person.skillSet))
    listElement.append(li)
  });

  // Disable the list people button because we've already listed all the people
  const listPeopleButton = document.getElementById('list-people-button');
  listPeopleButton.disabled = true;
}

// We don't need these two functions because updateTeamList does things for both teams
// const listOfRedTeam = () => {
//   const redListElement = document.getElementById('red')
//   redTeam
//     .filter(person => person.rendered === false)
//     .forEach(person => {
//       const playerListElement = playerToListElement(person);
//       playerListElement.id = `list-of-redteam-person-${person.id}`
//       redListElement.append(playerListElement)
//       person.rendered = true
//     });
// }

// const listOfBlueTeam = () => {
//   const blueListElement = document.getElementById('blue')
//   blueTeam
//     .filter(person => person.rendered === false)
//     .forEach(person => {
//       const playerListElement = playerToListElement(person);
//       playerListElement.id = `list-of-blueteam-person-${person.id}`
//       blueListElement.append(playerListElement)
//       person.rendered = true
//     });
// }

// Will render any players that need to be rendered for a team
// teamColor is the color of the team to go render players for
// ex) 'red' or 'blue'
const updateTeamList = (teamColor) => {
  const teamListElememnt = document.getElementById(teamColor);

  let team;
  if (teamColor === 'red') {
    team = redTeam;
  } else if (teamColor === 'blue') {
    team = blueTeam;
  }

  team
    .filter(person => person.rendered === false)
    .forEach(person => {
      const playerListElement = playerToListElement(person);
      playerListElement.id = `list-of-${teamColor}-team-person-${person.id}`
      teamListElememnt.append(playerListElement)
      person.rendered = true
    });
}

// Takes a player instance and creates a li HTML element from them and returns it
const playerToListElement = (player) => {
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(player.name))
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(`Can throw ball: ${player.canThrowBall}`))
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(`Can dodge ball: ${player.canDodgeBall}`))
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(`Has paid: ${player.hasPaid}`))
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(`Is healthy: ${player.isHealthy}`))
  li.appendChild(document.createElement("br"))
  li.appendChild(document.createTextNode(`Years of experience: ${player.yearsExperience}`))
  return li;
}

//Button that when clicked this function should remove a player from "list of people" & add
//add it to dodgeball players
const makePlayer = (id) => {
  // console.log(`li ${id} was clicked!`)
  const personListElement = document.getElementById(`list-of-people-person-${id}`);
  personListElement.remove();

  // Get the person from the list by id
  const newPlayerObject = arrOfPeople.find(player => player.id === id);
  // Create a player instance for the person
  const newPersonInstance = new player(newPlayerObject);
  // Add the player instance to the listOfPlayers array
  listOfPlayers.push(newPersonInstance);

  // Add the player to the DOM
  //// goes to the DOM and gets the players list. 
  //The HTML has a ul element with an id of 'players' already
  const playersListInDOM = document.getElementById("players"); 

  // Make a new list element that we'll add the player HTML to
  const newPlayerListElement = document.createElement("li");
  newPlayerListElement.id = `dodge-ball-player-${id}`; // set a unique id based om the player id
  
  // Add a text node under the new list element with the person's name
  newPlayerListElement.appendChild(document.createTextNode(newPersonInstance.name))
  
  // Create a button to add to red team and add it under the list element
  const addToRedTeamButton = document.createElement("button");
  addToRedTeamButton.addEventListener('click', function() {assignTeam('red', newPersonInstance)} )
  addToRedTeamButton.innerHTML = "+ Red Team";

  // Create a button to add to blue team and add it under the list element
  const addToBlueTeamButton = document.createElement("button");
  addToBlueTeamButton.addEventListener('click', function() {assignTeam('blue', newPersonInstance)} )
  addToBlueTeamButton.innerHTML = "+ Blue Team";

  // Put our red and blue team buttons under the list element
  newPlayerListElement.appendChild(addToRedTeamButton);
  newPlayerListElement.appendChild(addToBlueTeamButton);

  // Put out list element under the players list
  playersListInDOM.appendChild(newPlayerListElement);
}

const assignTeam = (teamColor, playerInstance) => {
  console.log(`Adding a new player to ${teamColor} team`);
  // Remove the player from the dodgeball player list
  const playerToRemove = document.getElementById(`dodge-ball-player-${playerInstance.id}`);
  playerToRemove.remove();

  // Based on the teamColor variable's value create the right instance of bluePlayer or redPlayer
  let playerAssignedToTeam;

  if (teamColor === 'red') {
    playerAssignedToTeam = new redTeammate(playerInstance);
  } else if (teamColor === 'blue') {
    playerAssignedToTeam = new blueTeammate(playerInstance);
  } else {
    throw new Error('Unexpected team color: ' + teamColor);
  }

  // Push the new instance of either bluePlayer or redPlayer to right array
  if (teamColor === 'red') {
    redTeam.push(playerAssignedToTeam);
  } else if (teamColor === 'blue') {
    blueTeam.push(playerAssignedToTeam);
  }

  updateTeamList(teamColor);
}



// // Tests
// if (typeof describe === 'function') {
//   describe('#makePlayer()', () => {
//     it('should allow a person to become a player', () => {
//       makePlayer(2);
//     });
//   });
// }
