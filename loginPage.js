class User
{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

//test user data
const users = [
    new User('user1', 'password1'),
    new User('user2', 'password2'),
    new User('user3', 'password3'),
]


//Login function for co-worker
    document.getElementById('coworker').addEventListener('submit', function(event)
    {
        event.preventDefault();

        const usernameInput = document.getElementById('usernameWorker').value;
        const passwordInput = document.getElementById('passwordWorker').value;

        const foundUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

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

        const foundUser = users.find(user => user.username === usernameInput && user.password === passwordInput);

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