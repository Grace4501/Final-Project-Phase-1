window.onload = function() {
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

    // Add event listener to search bar
    document.querySelector('.search-bar input').addEventListener('input', function() {
        // Perform a search operation (this is just a placeholder, replace it with your own search logic)
        console.log('Performing a search for:', this.value);
    });
};