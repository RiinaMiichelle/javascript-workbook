let arrayOfUsers;

window.onload = function() {
  fetchUsers()
}

const fetchUsers = () => {
  fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(jsonRes => arrayOfUsers = jsonRes.results)
  }

const consoleUsers = () => {
  console.log(arrayOfUsers)
}

const getFullName = (user) => {
  return `${user.name.title} ${user.name.first} ${user.name.last}`;
}

const displayUser = () => {
  const allUsers = document.getElementById('all-users')
  console.log(arrayOfUsers);
  arrayOfUsers.map((user, index) => {
    console.log(user);
    const li = document.createElement('li')
    const text = document.createTextNode(`Name: ${getFullName(user)}`)
    const imgElement = document.createElement('img');
    imgElement.src = user.picture.large;
    li.appendChild(text)
    li.appendChild(imgElement)
    allUsers.append(li)
  })
}


