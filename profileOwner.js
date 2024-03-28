class UserOwner {
    constructor(name, address, email, contact) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
        this.profilePicture = null; // Initialize profile picture to null
    }
}

let ownerUsers = [new UserOwner("Unknown", "Unknown", "Unknown", "Unknown")];

function displayUpdateFields() {
    const updateForm = document.getElementById('updateForm');
    updateForm.innerHTML = '';

    const fields = ['Name', 'Address', 'Email', 'Contact'];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.textContent = `${field}: `;
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `update${field}`;
        updateForm.appendChild(label);
        updateForm.appendChild(input);
        updateForm.appendChild(document.createElement('br'));
    });

    const pictureLabel = document.createElement('label');
    pictureLabel.textContent = 'Profile Picture: ';
    const pictureInput = document.createElement('input');
    pictureInput.type = 'file';
    pictureInput.id = 'updateProfilePicture';
    pictureInput.accept = 'image/*';
    updateForm.appendChild(pictureLabel);
    updateForm.appendChild(pictureInput);
    updateForm.appendChild(document.createElement('br'));

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', updateOwner);
    updateForm.appendChild(updateButton);
}

function updateOwner() {
    const updatedName = document.getElementById('updateName').value;
    const updatedAddress = document.getElementById('updateAddress').value;
    const updatedEmail = document.getElementById('updateEmail').value;
    const updatedContact = document.getElementById('updateContact').value;

    // Get the selected profile picture
    const updatedProfilePicture = document.getElementById('updateProfilePicture').files[0];

    if (ownerUsers.length > 0) {
        const userToUpdate = ownerUsers[0];
        userToUpdate.name = updatedName;
        userToUpdate.address = updatedAddress;
        userToUpdate.email = updatedEmail;
        userToUpdate.contact = updatedContact;

        if (updatedProfilePicture instanceof Blob) {
            userToUpdate.profilePicture = updatedProfilePicture;
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
        updateForm.innerHTML = '';

        console.log('User updated:', userToUpdate);
        console.log('ownerUsers:', ownerUsers);
    } else {
        console.log('No user to update.');
    }
}

function displayCurrentUserInfo(user) {
    document.getElementById('currentName').textContent = 'Name: ' + user.name;
    document.getElementById('currentAddress').textContent = 'Address: ' + user.address;
    document.getElementById('currentEmail').textContent = 'Email: ' + user.email;
    document.getElementById('currentContact').textContent = 'Contact: ' + user.contact;
}


function retrieveUserFromStorage() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const user = JSON.parse(userString);
        displayCurrentUserInfo(user);
        if (user.profilePicture) {
            displayProfilePicture(user.profilePicture);
        }
    }
}

window.addEventListener('load', retrieveUserFromStorage);

function displayCurrentUserInfo(user) {
    const fields = ['Name', 'Address', 'Email', 'Contact'];
    fields.forEach(field => {
        document.getElementById(`current${field}`).textContent = `${field}: ${user[field.toLowerCase()]}`;
    });
}

function displayProfilePicture(profilePicture) {
    const defaultPictureUrl = 'default-profile-pic.jpg';
    const profilePictureContainer = document.getElementById('profilePictureContainer');
    if (profilePicture instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profilePictureContainer.innerHTML = `<img id="profilePicture" src="${event.target.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(profilePicture);
    } else {
        profilePictureContainer.innerHTML = `<img id="profilePicture" src="${defaultPictureUrl}" alt="Default Profile Picture">`;
    }
}

class Properties {
    constructor(placename, placeaddress, description) {
        this.placename = placename;
        this.placeaddress = placeaddress;
        this.description = description;
        this.propertyPicture = null; // Initialize property picture to null
    }

    updateProperty(updatedPlaceName, updatedPlaceAddress, updatedDescription) {
        this.placename = updatedPlaceName;
        this.placeaddress = updatedPlaceAddress;
        this.description = updatedDescription;
    }

    updatePropertyPicture(newPicture) {
        this.propertyPicture = newPicture;
    }

    displayPropertyInfoInDOM(containerId) {
        const container = document.getElementById(containerId);
        const propertyInfo = document.createElement('div');
        propertyInfo.innerHTML = `
            <p><strong>Name:</strong> ${this.placename}</p>
            <p><strong>Address:</strong> ${this.placeaddress}</p>
            <p><strong>Description:</strong> ${this.description}</p>
        `;
    
        if (this.propertyPicture instanceof Blob) {
            const imageUrl = URL.createObjectURL(this.propertyPicture);
            propertyInfo.innerHTML += `<img src="${imageUrl}" alt="Property Picture">`;
        } else {
            console.error('Invalid property picture:', this.propertyPicture);
        }
    
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Property';
        removeButton.addEventListener('click', () => {
            container.removeChild(propertyInfo);
            removePropertyFromLocal(this.index);
        });
        propertyInfo.appendChild(removeButton);
    
        container.appendChild(propertyInfo);
    }
}    

document.addEventListener('DOMContentLoaded', function() {
    const newPropertyButton = document.getElementById('newPropertyButton');
    if (newPropertyButton) {
        newPropertyButton.addEventListener('click', showNewPropertySection);
    } else {
        console.error('Element with ID "newPropertyButton" not found.');
    }
});

function showNewPropertySection() {
    document.getElementById('newPropertySection').style.display = 'block';
}

function addProperty() {
    console.log("Add Property button clicked"); // Debugging statement
    const placeName = document.getElementById('placeName').value;
    const placeAddress = document.getElementById('placeAddress').value;
    const description = document.getElementById('description').value;
    const picture = document.getElementById('picture').files[0];

    console.log("Values:", placeName, placeAddress, description, picture); // Debugging statement

    const newProperty = new Properties(placeName, placeAddress, description);
    newProperty.updatePropertyPicture(picture);
    
    savePropertyToLocal(newProperty);
    newProperty.displayPropertyInfoInDOM('propertyContainer');
    document.getElementById('newPropertySection').style.display = 'none';
}

document.getElementById('addPropertyButton').addEventListener('click', addProperty);

function showNewPropertySection() {
    document.getElementById('newPropertySection').style.display = 'block';
}

function addProperty() {
    const placeName = document.getElementById('placeName').value;
    const placeAddress = document.getElementById('placeAddress').value;
    const description = document.getElementById('description').value;
    const picture = document.getElementById('picture').files[0];

    const newProperty = new Properties(placeName, placeAddress, description);
    newProperty.updatePropertyPicture(picture);
    
    savePropertyToLocal(newProperty);
    newProperty.displayPropertyInfoInDOM('propertyContainer');
    document.getElementById('newPropertySection').style.display = 'none';
}

function savePropertyToLocal(property) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
}

function removePropertyFromLocal(propertyIndex) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.splice(propertyIndex, 1);
    localStorage.setItem('properties', JSON.stringify(properties));
}

function removeProperty(propertyIndex) {
    const propertyContainer = document.getElementById('propertyContainer');
    propertyContainer.removeChild(propertyContainer.childNodes[propertyIndex]);
    removePropertyFromLocal(propertyIndex);
}

function loadPropertiesFromLocal() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.forEach((property, index) => {
        const newProperty = new Properties(property.placename, property.placeaddress, property.description);
        newProperty.updatePropertyPicture(property.propertyPicture);
        newProperty.index = index;
        newProperty.displayPropertyInfoInDOM('propertyContainer');
    });
}

window.addEventListener('load', loadPropertiesFromLocal);

document.getElementById('showUpdateButton').addEventListener('click', displayUpdateFields);
document.querySelector('.logo-button').addEventListener('click', () => window.location.href = 'homepage.html');
document.querySelector('.dropdown-button').addEventListener('click', () => {
    document.querySelector('.dropdown-content').classList.toggle('show');
});

window.addEventListener('click', event => {
    const dropdownContent = document.querySelector('.dropdown-content.show');
    if (dropdownContent && !event.target.matches('.dropdown-button')) {
        dropdownContent.classList.remove('show');
    }
});


document.getElementById('newPropertyButton').addEventListener('click', showNewPropertySection);
document.getElementById('addPropertyButton').addEventListener('click', addProperty);