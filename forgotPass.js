
    //Find Password

    document.getElementById('forgotPass').addEventListener('submit', function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username").value;
        const user = users.find(user => user.username === usernameInput);

        if(user) {
            document.getElementById("passwordResult").innerHTML = `Password for ${usernameInput}: ${user.password}`;
        } else {
            document.getElementById("passwordResult").innerHTML = "User not found. Please try again";
        }
    })