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


// SVG COUNTRY CLICKS

const countries = document.querySelectorAll("svg path");

countries.forEach(function (country) {

    country.addEventListener("mouseenter", function () {
        country.classList.add("country-hover");
    });

    country.addEventListener("mouseleave", function () {
        country.classList.remove("country-hover");
    });

    country.addEventListener("click", function () {
        const countryCode = country.id;

        window.location.href = `country.html?country=${countryCode}`;
    });

});


// COUNTRY DIRECTORY CLICKS

const countryNames = document.querySelectorAll(".column li");

countryNames.forEach(function (name) {

    name.addEventListener("click", async function () {

        if (name.classList.contains("letter")) {
            return;
        }

        const countryName = name.textContent.trim();
        console.log("1. Clicked country:", countryName);

        try {
            const response = await fetch(
                `/countries/name/${encodeURIComponent(countryName)}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const data = await response.json();
            console.log("2. API Response:", data);

            const code = data.abbreviation;

            if (code) {
                window.location.href = `country.html?country=${code}`;
            } else {
                console.error(
                    "3. Could not find 'abbreviation' in response:",
                    data
                );
            }

        } catch (error) {
            console.error("4. Fetch Error:", error);
        }
    });

});