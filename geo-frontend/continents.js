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

const countries = document.querySelectorAll("svg path");
countries.forEach(function (country) {
    country.addEventListener("mouseenter", function () {
        country.classList.add("country-hover");
    });
    country.addEventListener("mouseleave", function () {
        country.classList.remove("country-hover");
    });
    country.addEventListener("click", function () {
        const code = country.id.toUpperCase();
        window.location.href = `country.html?country=${code}`;
    })
});

const country_name = document.querySelectorAll(".column li");
country_name.forEach(function (name) {
    name.addEventListener("click", async function () {
        const response = await fetch(
            `/countries/name/${name.textContent}`
        );

        const data = await response.json();

        const code = data.abbreviation;

        window.location.href = `country.html?country=${code}`;

    })
})
