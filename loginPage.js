class User {
    constructor(username, password, name, address, email, contact) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

let ownerUsers = [];
let workerUsers = [];

function initializeArray() {
    const ownerUsersJSON = localStorage.getItem('ownerUsers');
    const workerUsersJSON = localStorage.getItem('workerUsers');
    ownerUsers = ownerUsersJSON ? JSON.parse(ownerUsersJSON) : [];
    workerUsers = workerUsersJSON ? JSON.parse(workerUsersJSON) : [];
}

initializeArray();

function saveArray() {
    localStorage.setItem('ownerUsers', JSON.stringify(ownerUsers));
    localStorage.setItem('workerUsers', JSON.stringify(workerUsers));
}

function login(userType) {
    return function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById(`username${userType}`).value;
        const passwordInput = document.getElementById(`password${userType}`).value;

        const users = userType === 'Owner' ? ownerUsers : workerUsers;
        const foundUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

        const checkElement = document.getElementById(`check${userType}`);
        if (foundUser) {
            checkElement.innerHTML = "Login Successful!";
            checkElement.style.color = "green";
            setTimeout(function() {
                window.location.href = 'homepage.html';
            }, 3000);
        } else {
            checkElement.innerHTML = "Login Failed";
            checkElement.style.color = "red";
        }
    };
}

// Event listeners for login forms
document.getElementById('owner').addEventListener('submit', login('Owner'));
document.getElementById('coworker').addEventListener('submit', login('Worker'));

function checkUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const verfi = document.getElementById("verification");

    const existingOwner = ownerUsers.find(user => user.username === username);
    const existingWorker = workerUsers.find(user => user.username === username);

    if (existingOwner || existingWorker) {
        verfi.innerHTML = "Username already in use";
        verfi.style.color = "red";
        return;
    }

    const isPasswordUsed = ownerUsers.some(user => user.password === password) || workerUsers.some(user => user.password === password);
    const isValidPassword = password.length > 5 && /\d/.test(password);

    if (isPasswordUsed) {
        verfi.innerHTML = "Password already in use";
        verfi.style.color = "red";
        return;
    } else if (!isValidPassword) {
        verfi.innerHTML = "Password must match requirements";
        verfi.style.color = "red";
        return;
    }

    let newUser;
    const name = ""; // Define or remove these variables as per your requirement
    const address = ""; // Define or remove these variables as per your requirement
    const email = ""; // Define or remove these variables as per your requirement
    const contact = ""; // Define or remove these variables as per your requirement

    if (document.getElementById('worker').checked) {
        newUser = new User(username, password, name, address, email, contact);
        workerUsers.push(newUser);
    } else if (document.getElementById('owner').checked) {
        newUser = new User(username, password, name, address, email, contact);
        ownerUsers.push(newUser);
    } else {
        console.log("Not all information is inputted");
        return;
    }

    saveArray();
    verfi.innerHTML = "New account created successfully";
    verfi.style.color = "green";
}

document.getElementById('owner').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('usernameOwner').value;
    const passwordInput = document.getElementById('passwordOwner').value;

    const foundUser = ownerUsers.find(user => user.username === usernameInput && user.password === passwordInput);

    if (foundUser) {
        document.getElementById('name').textContent = "Name: " + foundUser.name;
    } else {
        console.log("error");
    }
});