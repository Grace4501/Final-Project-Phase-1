class UserWorker {
    constructor(name, address, email, contact) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

let workerUsers = []; // Assuming you'll populate this array with user objects

workerUsers.push(new UserWorker("Unknown", "Unknown", "Unknown", "Unknown"));

// Function to display input fields for updating user information
// Function to display input fields for updating user information
function displayUpdateFields() {
    const updateForm = document.getElementById('updateForm');
    updateForm.innerHTML = ''; // Clear existing content
    
    // Create input fields for each property of UserWorker
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'updateName';

    const addressLabel = document.createElement('label');
    addressLabel.textContent = 'Address: ';
    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.id = 'updateAddress';

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email: ';
    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.id = 'updateEmail';

    const contactLabel = document.createElement('label');
    contactLabel.textContent = 'Contact: ';
    const contactInput = document.createElement('input');
    contactInput.type = 'text';
    contactInput.id = 'updateContact';

    // Profile picture input box
    const pictureLabel = document.createElement('label');
    pictureLabel.textContent = 'Profile Picture: ';
    const pictureInput = document.createElement('input');
    pictureInput.type = 'file';
    pictureInput.id = 'updateProfilePicture';
    pictureInput.accept = 'image/*';

    // Button to trigger the update
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission

        updateWorker();
    });

    // Append input fields and button to the form
    updateForm.appendChild(nameLabel);
    updateForm.appendChild(nameInput);
    updateForm.appendChild(document.createElement('br'));
    updateForm.appendChild(addressLabel);
    updateForm.appendChild(addressInput);
    updateForm.appendChild(document.createElement('br'));
    updateForm.appendChild(emailLabel);
    updateForm.appendChild(emailInput);
    updateForm.appendChild(document.createElement('br'));
    updateForm.appendChild(contactLabel);
    updateForm.appendChild(contactInput);
    updateForm.appendChild(document.createElement('br'));
    updateForm.appendChild(pictureLabel);
    updateForm.appendChild(pictureInput);
    updateForm.appendChild(document.createElement('br'));
    updateForm.appendChild(updateButton);
}

function updateWorker() {
    const updatedName = document.getElementById('updateName').value;
    const updatedAddress = document.getElementById('updateAddress').value;
    const updatedEmail = document.getElementById('updateEmail').value;
    const updatedContact = document.getElementById('updateContact').value;

    // Get the selected profile picture
    const updatedProfilePicture = document.getElementById('updateProfilePicture').files[0];

    // Assuming you have a specific user you want to update, you can modify this part accordingly
    if (workerUsers.length > 0) {
        const userToUpdate = workerUsers[0]; // For simplicity, assuming you want to update the first user in the array
        userToUpdate.name = updatedName;
        userToUpdate.address = updatedAddress;
        userToUpdate.email = updatedEmail;
        userToUpdate.contact = updatedContact;

        // Update the profile picture only if a valid file is selected
        if (updatedProfilePicture instanceof Blob) {
            userToUpdate.profilePicture = updatedProfilePicture;
            // Display the profile picture
            displayProfilePicture(updatedProfilePicture);
        }

        // Update the displayed user information
        displayCurrentUserInfo(userToUpdate);

        // Update the user object in the array
        workerUsers[0] = userToUpdate;

        // Store the updated user information in localStorage
        localStorage.setItem('user', JSON.stringify(userToUpdate));

        // Hide the input fields after updating
        const updateForm = document.getElementById('updateForm');
        updateForm.innerHTML = ''; // Clear existing content

        console.log('User updated:', userToUpdate);
        console.log('workerUsers:', workerUsers); // Check if the array is updated
    } else {
        console.log('No user to update.');
    }
}



// Function to display the profile picture
function displayProfilePicture(profilePicture) {
    const defaultPictureUrl = 'default-profile-pic.png';
    
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const profilePictureContainer = document.getElementById('profilePictureContainer');
            profilePictureContainer.innerHTML = `<img id="profilePicture" src="${event.target.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(profilePicture);
    } else {
        // If no profile picture is provided, display the default picture
        const profilePictureContainer = document.getElementById('profilePictureContainer');
        profilePictureContainer.innerHTML = `<img id="profilePicture" src="${defaultPictureUrl}" alt="Default Profile Picture">`;
    }
}

// Function to retrieve the user information from localStorage
function retrieveUserFromStorage() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        displayCurrentUserInfo(user);
        if (user.profilePicture) {
            displayProfilePicture(user.profilePicture); // Display the profile picture if it exists
        }
    }
}

// Call the function to retrieve user information when the page loads
window.addEventListener('load', retrieveUserFromStorage);


// Call the function to retrieve user information when the page loads
window.addEventListener('load', retrieveUserFromStorage);



// Function to display the current user information
function displayCurrentUserInfo(user) {
    document.getElementById('currentName').textContent = 'Name: ' + user.name;
    document.getElementById('currentAddress').textContent = 'Address: ' + user.address;
    document.getElementById('currentEmail').textContent = 'Email: ' + user.email;
    document.getElementById('currentContact').textContent = 'Contact: ' + user.contact;
}

// Assuming you have a button with an ID "showUpdateButton" to display the update form
document.getElementById('showUpdateButton').addEventListener('click', displayUpdateFields);
