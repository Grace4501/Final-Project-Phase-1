class UserWorker {
    constructor(name, address, email, contact) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.contact = contact;
    }
}

let workerUsers = [new UserWorker("Unknown", "Unknown", "Unknown", "Unknown")];

function displayUpdateFields() {
    const updateForm = document.getElementById('updateForm');
    updateForm.innerHTML = '';
    
    const labels = ['Name', 'Address', 'Email', 'Contact'];
    const ids = ['updateName', 'updateAddress', 'updateEmail', 'updateContact'];

    labels.forEach((label, index) => {
        const labelElement = document.createElement('label');
        labelElement.textContent = label + ': ';
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.id = ids[index];
        updateForm.appendChild(labelElement);
        updateForm.appendChild(inputElement);
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
    updateButton.addEventListener('click', function(event) {
        event.preventDefault();
        updateWorker();
    });
    updateForm.appendChild(updateButton);
}

function updateWorker() {
    const userToUpdate = workerUsers[0];
    const updatedData = ['Name', 'Address', 'Email', 'Contact'].map(label => 
        document.getElementById('update' + label).value
    );

    userToUpdate.name = updatedData[0];
    userToUpdate.address = updatedData[1];
    userToUpdate.email = updatedData[2];
    userToUpdate.contact = updatedData[3];

    const updatedProfilePicture = document.getElementById('updateProfilePicture').files[0];
    if (updatedProfilePicture instanceof Blob) {
        userToUpdate.profilePicture = updatedProfilePicture;
        displayProfilePicture(updatedProfilePicture);
    }

    displayCurrentUserInfo(userToUpdate);
    localStorage.setItem('user', JSON.stringify(userToUpdate));

    const updateForm = document.getElementById('updateForm');
    updateForm.innerHTML = '';

    console.log('User updated:', userToUpdate);
    console.log('workerUsers:', workerUsers);
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
    document.getElementById('currentName').textContent = 'Name: ' + user.name;
    document.getElementById('currentAddress').textContent = 'Address: ' + user.address;
    document.getElementById('currentEmail').textContent = 'Email: ' + user.email;
    document.getElementById('currentContact').textContent = 'Contact: ' + user.contact;
}

document.getElementById('showUpdateButton').addEventListener('click', displayUpdateFields);

window.onload = function() {
    document.querySelector('.logo-button').addEventListener('click', function() {
        window.location.href = 'homepage.html';
    });
}

document.querySelector('.dropdown-button').addEventListener('click', function() {
    this.nextElementSibling.classList.toggle('show');
});

window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        for (let dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    displayProfilePicture(null);
});


//dropdown Behaviour

let dropdownTimeout;

document.querySelector('.dropdown').addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
    document.querySelector('.dropdown-content').classList.add('show');
});

document.querySelector('.dropdown').addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        document.querySelector('.dropdown-content').classList.remove('show');
    }, 1000); // Adjust the timeout duration as needed (in milliseconds)
});

document.querySelector('.dropdown-content').addEventListener('mouseenter', () => {
    clearTimeout(dropdownTimeout);
});

document.querySelector('.dropdown-content').addEventListener('mouseleave', () => {
    dropdownTimeout = setTimeout(() => {
        document.querySelector('.dropdown-content').classList.remove('show');
    }, 1000);
});
