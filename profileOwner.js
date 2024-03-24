document.getElementById("owner").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("usernameWorker").value;
    const passwordInput = document.getElementById("passwordWorker").value;

    const foundUser = MyApp.workerUsers.find(user => user.username === usernameInput && user.password === passwordInput);

    if(foundUser) {
        document.getElementById("name").textContent = "Name: "+ foundUser.name;
    } else {
        console.log("error");
    }
})