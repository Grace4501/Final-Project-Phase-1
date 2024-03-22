class UserOwner
{
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

class UserWorker
{
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

function intializeArray() {
    const ownerUsersJSON = localStorage.getItem('ownerUsers');
    const workerUsersJSON = localStorage.getItem('workerUsers');
    return {
        ownerUsers: ownerUsersJSON ? JSON.parse(ownerUsersJSON) : [],
        workerUsers: workerUsersJSON ? JSON.parse(workerUsersJSON) : [],
    };
}

const {ownerUsers, workerUsers} = intializeArray();

function saveArray() {
    localStorage.setItem('ownerUsers', JSON.stringify(ownerUsers));
    localStorage.setItem('workerUsers', JSON.stringify(workerUsers));
}

//Login function for co-worker
    document.getElementById('coworker').addEventListener('submit', function(event)
    {
        event.preventDefault();

        const usernameInput = document.getElementById('usernameWorker').value;
        const passwordInput = document.getElementById('passwordWorker').value;

        const foundUser = workerUsers.find(UserWorker => UserWorker.username === usernameInput && UserWorker.password === passwordInput);

        if(foundUser) {
            checkWorker.innerHTML = "Login Successful!";
            checkWorker.style.color = "green";
            setTimeout(function() {
                window.location.href = 'https://www.google.com/'; //placeholder until homepage is maade
            }, 3000);
        }
        else {
            checkWorker.innerHTML= "Login Failed"; 
            checkWorker.style.color = "red";
        }
    });

    //Login function for owner

    document.getElementById('owner').addEventListener('submit', function(event)
    {
        event.preventDefault();

        const usernameInput = document.getElementById('usernameOwner').value;
        const passwordInput = document.getElementById('passwordOwner').value;

        const foundUser = ownerUsers.find(UserOwner => UserOwner.username === usernameInput && UserOwner.password === passwordInput);

        if(foundUser) {
            checkOwner.innerHTML = "Login Successful!";
            checkOwner.style.color = "green";
            setTimeout(function() {
                window.location.href = 'https://www.google.com/'; //placeholder until homepage is maade
            }, 3000);
        }
        else {
            checkOwner.innerHTML= "Login Failed"; 
            checkOwner.style.color = "red";
        }
    });

    //Create account

    function checkUser() {
        var workerType = document.getElementById("worker");
        var ownerType = document.getElementById("owner");
        var verfi = document.getElementById("verfication")
    
        if(workerType.checked === true)
        {
            const newUser = createUserWorker();
            workerUsers.push(newUser);
            saveArray();
            verfi.innerHTML="New account created successfully";
            verfi.style.color="green";
        }
        else if(ownerType.checked === true)
        {
            const newUser = createUserOwner();
            ownerUsers.push(newUser);
            saveArray();
            verfi.innerHTML="New account created successfully";
            verfi.style.color="green";
        }
        else{
            console.log("Not all information is inputted");
        }
    }
    
    function createUserOwner() 
    {
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
    
    function createUserWorker() 
    {
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