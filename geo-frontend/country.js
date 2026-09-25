const params = new URLSearchParams(window.location.search);

const code = params.get("country");

fetch(`/countries/${code}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("country-name").textContent = data.name;
        document.getElementById("capital").textContent = "Capital City: " + data.capital;
        document.getElementById("city").textContent = "Largest City: " + data.largest_city;
        document.getElementById("population").textContent = "Population: " + Number(data.population).toLocaleString();
        document.getElementById("title").textContent = "CountryInfo | " + data.name;
        document.getElementById("density").innerHTML = "Density: " + Number(data.density).toLocaleString() + " people per square kilometer";
        document.getElementById("area").innerHTML = "Land Area: " + Number(data.land_area).toLocaleString() + " km<sup>2</sup>";
        document.getElementById("birth").textContent = "Birth Rate: " + Number(data.birth_rate).toLocaleString() + " births per 1,000 people";
        document.getElementById("gdp").textContent = "GDP: $" + Number(data.gdp).toLocaleString();
    });
