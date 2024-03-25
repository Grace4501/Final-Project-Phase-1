class UserOwner {
    constructor(username, password, name, address, email, contact) {
        //Login info
        this.username = username;
        this.password = password;
        //Profile info
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

class UserWorker {
    constructor(username, password, name, address, email, contact) {
        //Login info
        this.username = username;
        this.password = password;
        //Profile info
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

// Define global variables for owner and worker users
let ownerUsers = [];
let workerUsers = [];

// Function to initialize arrays from localStorage
function initializeArray() {
    const ownerUsersJSON = localStorage.getItem('ownerUsers');
    const workerUsersJSON = localStorage.getItem('workerUsers');
    ownerUsers = ownerUsersJSON ? JSON.parse(ownerUsersJSON) : [];
    workerUsers = workerUsersJSON ? JSON.parse(workerUsersJSON) : [];
}

// Call initializeArray() to populate the arrays
initializeArray();

// Function to save arrays to localStorage
function saveArray() {
    localStorage.setItem('ownerUsers', JSON.stringify(ownerUsers));
    localStorage.setItem('workerUsers', JSON.stringify(workerUsers));
}

//Login function for co-worker
document.getElementById('coworker').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('usernameWorker').value;
    const passwordInput = document.getElementById('passwordWorker').value;

    const foundUser = workerUsers.find(UserWorker => UserWorker.username === usernameInput && UserWorker.password === passwordInput);

    if (foundUser) {
        checkWorker.innerHTML = "Login Successful!";
        checkWorker.style.color = "green";
        setTimeout(function() {
            window.location.href = 'homepage.html'; //placeholder until homepage is made
        }, 3000);
    } else {
        checkWorker.innerHTML = "Login Failed";
        checkWorker.style.color = "red";
    }
});

//Login function for owner
document.getElementById('owner').addEventListener('submit', function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('usernameOwner').value;
    const passwordInput = document.getElementById('passwordOwner').value;

    const foundUser = ownerUsers.find(UserOwner => UserOwner.username === usernameInput && UserOwner.password === passwordInput);

    if (foundUser) {
        checkOwner.innerHTML = "Login Successful!";
        checkOwner.style.color = "green";
        setTimeout(function() {
            window.location.href = 'homepage.html'; //placeholder until homepage is made
        }, 3000);
    } else {
        checkOwner.innerHTML = "Login Failed";
        checkOwner.style.color = "red";
    }
});


// Create account
function checkUser() {
    var workerType = document.getElementById("worker");
    var ownerType = document.getElementById("owner");
    var verfi = document.getElementById("verification");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const existingOwner = ownerUsers.find(user => user.username === username);
    const existingWorker = workerUsers.find(user => user.username === username);

    if (existingOwner || existingWorker) {
        verfi.innerHTML = "Username already in use";
        verfi.style.color = "red";
        return;
    }

    //checking if password is in use
    const isPasswordUsed = ownerUsers.some(user => user.password === password) || workerUsers.some(user => user.password === password);
    
    //checking if it matches the requirements
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

    // Proceed with creating the new user account
    if (workerType.checked === true) {
        const newUser = createUserWorker();
        workerUsers.push(newUser);
        saveArray();
        verfi.innerHTML = "New account created successfully";
        verfi.style.color = "green";
    } else if (ownerType.checked === true) {
        const newUser = createUserOwner();
        ownerUsers.push(newUser);
        saveArray();
        verfi.innerHTML = "New account created successfully";
        verfi.style.color = "green";
    } else {
        console.log("Not all information is inputted");
    }
}

function createUserOwner() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    const newUserOwner = new UserOwner(username, password, name, address, email, contact);
    
    console.log("User created successfully");

    console.log(ownerUsers);
    console.log(workerUsers);
    
    return newUserOwner;
}

function createUserWorker() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;

    const newUserWorker = new UserWorker(username, password, name, address, email, contact);
    
    console.log("User created successfully");

    console.log(ownerUsers);
    console.log(workerUsers);
    
    return newUserWorker;
}

//Profile page JS

document.getElementById("owner").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("usernameOwner").value; // Corrected to usernameOwner
    const passwordInput = document.getElementById("passwordOwner").value; // Corrected to passwordOwner

    const foundUser = ownerUsers.find(user => user.username === usernameInput && user.password === passwordInput); // Changed to ownerUsers

    if(foundUser) {
        document.getElementById("name").textContent = "Name: " + foundUser.name;
    } else {
        console.log("error");
    }
});