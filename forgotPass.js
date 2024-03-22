
    //Find Password

    document.getElementById('forgotPass').addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username").value;
        const UserOwner = ownerUsers.find(user => user.username === usernameInput);
        const UserWorker = workerUsers.find(user => user.username === usernameInput);

        if(UserOwner || UserWorker) {
            const user = UserOwner || UserWorker;
            document.getElementById("passwordResult").innerHTML = `Password for ${usernameInput}: ${user.password}`;
        } else {
            document.getElementById("passwordResult").innerHTML = "User not found. Please try again";
        }
    })