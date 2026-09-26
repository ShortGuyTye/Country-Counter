// HAMBURGER MENU 
const hamburger = document.getElementById("hamburger");
const continentNav = document.getElementById("continent-nav");
hamburger.addEventListener("click", function () {
    continentNav.classList.toggle("show");
    if (continentNav.classList.contains("show")) {
        hamburger.textContent = "✕";
        hamburger.setAttribute("aria-label", "Close navigation menu");
    } else {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Open navigation menu");
    }
});

const params = new URLSearchParams(window.location.search);

const code = params.get("country");

fetch(`/countries/${code}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("country-name").textContent = data.name;
        document.getElementById("capital").textContent = data.capital;
        document.getElementById("city").textContent = data.largest_city;
        document.getElementById("population").textContent = Number(data.population).toLocaleString();
        document.getElementById("title").textContent = "CountryInfo | " + data.name;
        document.getElementById("density").innerHTML = Number(data.density).toLocaleString() + " people per square kilometer";
        document.getElementById("area").innerHTML = Number(data.land_area).toLocaleString() + " km<sup>2</sup>";
        document.getElementById("birth").textContent = + Number(data.birth_rate).toLocaleString() + " births per 1,000 people";
        document.getElementById("gdp").textContent = "$" + Number(data.gdp).toLocaleString();
    });