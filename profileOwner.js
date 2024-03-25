class UserOwner {
    constructor(name, address, email, contact) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

let property = [];
let ownerUsers = [];

ownerUsers.push(new UserOwner("Unknown", "Unknown", "Unknown", "Unknown"));

// Function to display input fields for updating user information
// Function to display input fields for updating user information
function displayUpdateFields() {
    const updateForm = document.getElementById('updateForm');
    updateForm.innerHTML = ''; // Clear existing content
    
    // Create input fields for each property of UserOwner
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

        updateOwner();
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

function updateOwner() {
    const updatedName = document.getElementById('updateName').value;
    const updatedAddress = document.getElementById('updateAddress').value;
    const updatedEmail = document.getElementById('updateEmail').value;
    const updatedContact = document.getElementById('updateContact').value;

    // Get the selected profile picture
    const updatedProfilePicture = document.getElementById('updateProfilePicture').files[0];

    // Assuming you have a specific user you want to update, you can modify this part accordingly
    if (ownerUsers.length > 0) {
        const userToUpdate = ownerUsers[0]; // For simplicity, assuming you want to update the first user in the array
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
        ownerUsers[0] = userToUpdate;

        // Store the updated user information in localStorage
        localStorage.setItem('user', JSON.stringify(userToUpdate));

        // Hide the input fields after updating
        const updateForm = document.getElementById('updateForm');
        updateForm.innerHTML = ''; // Clear existing content

        console.log('User updated:', userToUpdate);
        console.log('ownerUsers:', ownerUsers); // Check if the array is updated
    } else {
        console.log('No user to update.');
    }
}



// Function to display the profile picture
function displayProfilePicture(profilePicture) {
    const defaultPictureUrl = 'default-profile-pic.jpg';

    // Check if profilePicture is valid and is an instance of Blob
    if (profilePicture instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const profilePictureContainer = document.getElementById('profilePictureContainer');
            profilePictureContainer.innerHTML = `<img id="profilePicture" src="${event.target.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(profilePicture);
    } else {
        // If profilePicture is not a Blob or is invalid, display the default picture
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
window.onload = function() {
    // Add event listener to logo button
    document.querySelector('.logo-button').addEventListener('click', function() {
        window.location.href = 'homepage.html'; // Redirects to the homepage when the logo is clicked
    });
}

// Add event listener to dropdown button
document.querySelector('.dropdown-button').addEventListener('click', function() {
    this.nextElementSibling.classList.toggle('show'); // Toggles the visibility of the dropdown menu
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

// Define Properties class
class Properties {
    constructor(placename, placeaddress, description) {
        this.placename = placename;
        this.placeaddress = placeaddress;
        this.description = description;
        this.propertyPicture = null; // Initialize property picture to null
    }

    // Method to update property information
    updateProperty(updatedPlaceName, updatedPlaceAddress, updatedDescription) {
        this.placename = updatedPlaceName;
        this.placeaddress = updatedPlaceAddress;
        this.description = updatedDescription;
    }

    // Method to update property picture
    updatePropertyPicture(newPicture) {
        this.propertyPicture = newPicture;
    }

    // Method to display property information in DOM
displayPropertyInfoInDOM(containerId) {
    const container = document.getElementById(containerId);
    const propertyInfo = document.createElement('div');
    propertyInfo.innerHTML = `
        <p><strong>Name:</strong> ${this.placename}</p>
        <p><strong>Address:</strong> ${this.placeaddress}</p>
        <p><strong>Description:</strong> ${this.description}</p>
    `;
    if (this.propertyPicture) {
        propertyInfo.innerHTML += `<img src="${URL.createObjectURL(this.propertyPicture)}" alt="Property Picture">`;
    }
    
    // Add remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove Property';
    removeButton.addEventListener('click', () => {
        container.removeChild(propertyInfo); // Remove property info from DOM
    });
    propertyInfo.appendChild(removeButton);
    
    container.appendChild(propertyInfo);
}

}

// Function to show input fields for adding new property
function showNewPropertySection() {
    document.getElementById('newPropertySection').style.display = 'block';
}

// Function to add new property
function addProperty() {
    // Get input values
    const placeName = document.getElementById('placeName').value;
    const placeAddress = document.getElementById('placeAddress').value;
    const description = document.getElementById('description').value;
    const picture = document.getElementById('picture').files[0];

    // Create new property instance
    const newProperty = new Properties(placeName, placeAddress, description);
    newProperty.updatePropertyPicture(picture); // Update property picture
    
    // Save property to local storage
    savePropertyToLocal(newProperty);

    // Display property information in DOM
    newProperty.displayPropertyInfoInDOM('propertyContainer');

    // Hide the input section
    document.getElementById('newPropertySection').style.display = 'none';
}

// Function to save property to local storage
function savePropertyToLocal(property) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
}


// Function to remove property from local storage
function removePropertyFromLocal(propertyIndex) {
    // Retrieve properties from local storage
    let properties = JSON.parse(localStorage.getItem('properties')) || [];

    // Remove the property at the specified index
    properties.splice(propertyIndex, 1);

    // Update local storage with the modified properties array
    localStorage.setItem('properties', JSON.stringify(properties));
}

// Function to remove property
function removeProperty(propertyIndex) {
    const propertyContainer = document.getElementById('propertyContainer');
    propertyContainer.removeChild(propertyContainer.childNodes[propertyIndex]);
    
    // Remove property from local storage
    removePropertyFromLocal(propertyIndex);
}

// Function to load properties from local storage
function loadPropertiesFromLocal() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.forEach(property => {
        const newProperty = new Properties(property.placename, property.placeaddress, property.description);
        newProperty.updatePropertyPicture(property.propertyPicture);
        newProperty.displayPropertyInfoInDOM('propertyContainer');
    });
}

// Call the function to load properties from local storage when the page loads
window.addEventListener('load', loadPropertiesFromLocal);

// Function to remove property from local storage
function removePropertyFromLocal(propertyIndex) {
    // Retrieve properties from local storage
    let properties = JSON.parse(localStorage.getItem('properties')) || [];

    // Remove the property at the specified index
    properties.splice(propertyIndex, 1);

    // Update local storage with the modified properties array
    localStorage.setItem('properties', JSON.stringify(properties));
}


// Call the function to load properties from local storage when the page loads
window.addEventListener('load', loadPropertiesFromLocal);


// Assuming you have a button with an ID "showUpdateButton" to display the update form
document.getElementById('showUpdateButton').addEventListener('click', displayUpdateFields);

// Add event listener to logo button
document.querySelector('.logo-button').addEventListener('click', function() {
    window.location.href = 'homepage.html'; // Redirects to the homepage when the logo is clicked
});

// Add event listener to dropdown button
document.querySelector('.dropdown-button').addEventListener('click', function() {
    this.nextElementSibling.classList.toggle('show'); // Toggles the visibility of the dropdown menu
});

// Close the dropdown menu if the user clicks outside of it
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-button')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

// Add event listener to the "New Property" button
document.getElementById('newPropertyButton').addEventListener('click', showNewPropertySection);

// Add event listener to the "Add Property" button
document.getElementById('addPropertyButton').addEventListener('click', addProperty);
