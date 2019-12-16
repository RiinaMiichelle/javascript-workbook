let arrayOfUsers;

window.onload = function() {
  fetchUsers()
}

const fetchUsers = () => {
  fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(users => arrayOfUsers = users)
  }

  const consoleUsers = () => {
    console.log(arrayOfUsers)
  }

  const displayUser = () => {
    const allUsers = document.getElementById('all-users')
    arrayOfUsers.map((user, index) => {
      const li = document.createElement('li')
      const text = document.createTextNode(`#${index}, Name: ${user.name}:  ${user.body}, by Picture: ${user.userId}`)
      li.appendChild(text)
      allUsers.append(li)
    })
  }


