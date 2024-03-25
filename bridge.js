window.onload = function() {
    // Retrieve userType from local storage
    const userType = localStorage.getItem('userType');

    // Redirect the user based on userType
    if (userType === 'Owner') {
        window.location.href = 'profileOwner.html'; // Redirect to owner profile page
    } else if (userType === 'Worker') {
        window.location.href = 'profileWorker.html'; // Redirect to worker profile page
    } else {
        console.log("error");
    }
};
