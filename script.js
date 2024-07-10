document.getElementById('breweryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('searchTerm').value;
    searchBreweries(searchTerm);
});

function searchBreweries(query) {
    const url = `https://api.openbrewerydb.org/v1/breweries?per_page=3&by_name=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(breweries) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (breweries.length === 0) {
        resultsDiv.innerHTML = '<p>No breweries found.</p>';
        return;
    }

    breweries.forEach(brewery => {
        const breweryDiv = document.createElement('div');
        breweryDiv.classList.add('brewery');

        const name = document.createElement('h3');
        name.textContent = brewery.name;

        const type = document.createElement('p');
        type.textContent = `Type: ${brewery.brewery_type}`;

        const address = document.createElement('p');
        address.textContent = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${brewery.phone}`;

        const website = document.createElement('a');
        website.href = brewery.website_url;
        website.textContent = brewery.website_url;
        website.target = '_blank';

        breweryDiv.appendChild(name);
        breweryDiv.appendChild(type);
        breweryDiv.appendChild(address);
        breweryDiv.appendChild(phone);
        breweryDiv.appendChild(website);

        resultsDiv.appendChild(breweryDiv);
    });
}
