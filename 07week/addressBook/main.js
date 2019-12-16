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


    const button = document.createElement("button")
    button.innerHTML = "More Information"
    button.addEventListener('click', function() {
      button.remove()
      const dobDiv = document.createElement('div');
      dobDiv.innerHTML = `DOB: ${user.dob.date}`
      const locationDiv = document.createElement('div');
      locationDiv.innerHTML = `Location: ${user.location.state}, ${user.location.country}`
      li.appendChild(locationDiv)
      li.appendChild(dobDiv)
    })
    li.appendChild(button)

    allUsers.append(li)
  })
}


