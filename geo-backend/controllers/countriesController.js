const pool = require("../db/connection");

const IS_ERROR = "Internal Server Error";

// GETTING ALL COUNTRIES
const getAllCountries = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM countries"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// GETTING COUNTRY WITH ID
const getCountryById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM countries WHERE abbreviation = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// GETTING COUNTRY BY NAME
const getCountryByName = async (req, res) => {
    try {
        const name = req.params.name;

        const result = await pool.query(
            "SELECT * FROM countries WHERE country_name = $1",
            [name]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// CREATE A COUNTRY
const createCountry = async (req, res) => {
    try {
        const { name, capital } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO countries (country_name, capital)
            VALUES ($1, $2)
            RETURNING *
            `,
            [name, capital]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// UPDATE A COUNTRY
const updateCountry = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, capital } = req.body;

        const result = await pool.query(
            `
            UPDATE countries
            SET country_name = $1,
                capital = $2
            WHERE id = $3
            RETURNING *
            `,
            [name, capital, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// DELETING A COUNTRY
const deleteCountry = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            `
            DELETE FROM countries
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        }

        res.json({
            message: "Country deleted",
            country: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// GETTING COUNTRIES BY CONTINENT
const getContinents = async (req, res) => {
    try {
        const continent = req.params.continent;

        const result = await pool.query(
            `
            SELECT *
            FROM countries
            JOIN continents
            ON countries.id = continents.id
            WHERE continents.continent = $1
            `,
            [continent]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Continent not found"
            });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

// SEARCHING COUNTRIES
const searchCountries = async (req, res) => {
    try {
        const search = req.params.search;

        const result = await pool.query(
            `
            SELECT *
            FROM countries
            WHERE country_name ILIKE $1

            ORDER BY
                CASE
                    WHEN LOWER(country_name) = LOWER($2) THEN 1
                    WHEN LOWER(country_name) LIKE LOWER($3) THEN 2
                    ELSE 3
                END,
                country_name ASC
            `,
            [
                `%${search}%`,
                search,
                `${search}%`
            ]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        });
    }
};

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName,
    createCountry,
    updateCountry,
    deleteCountry,
    getContinents,
    searchCountries
};