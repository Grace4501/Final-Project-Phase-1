
  function toggleFilters() {
    var filterOptions = document.getElementById("filterOptions");
    if (filterOptions.style.display === "none") {
      filterOptions.style.display = "block";
    } else {
      filterOptions.style.display = "none";
    }
  }

  function search() {
    var input = document.getElementById("searchInput").value;
    var filter = document.getElementById("filterSelect").value;

    

    var searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = ""; 
    var item = {
      name: "Search Results",
      image: "item_image.jpg", 
      dis: "Thorough Description",
      description: "This is a sample description of the item.",
      rating: 4
    };

    var resultDiv = document.createElement("div");
    resultDiv.classList.add("search-result");

    var starsHtml = '';
    for (var i = 0; i < item.rating; i++) {
      starsHtml += '<span>&#9733;</span>'; 
    }
    for (var i = item.rating; i < 4; i++) {
      starsHtml += '<span>&#9734;</span>'; 
    }

    var resultContent = `
      <h2>${item.name}</h2>
      <p>Search Query: ${input}</p>
      <p>Filter Applied: ${filter}</p>
      <div class="stars">${starsHtml}</div>
      <img src="${item.image}" alt="${item.name}">
      <h2>${item.dis}</h2>
      <p>${item.description}</p>
    `;

    resultDiv.innerHTML = resultContent;
    searchResults.appendChild(resultDiv);
  }
