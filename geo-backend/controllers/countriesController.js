const pool = require("../db/connection");

const IS_ERROR = "Internal Sever Error";

//GETTING ALL COUNTRIES
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
        })
    }
}

//GETTING COUNTRY WITH ID
const getCountryById = async (req, res) => {
    try{
        const id = req.params.id

        const result = await pool.query(
            "SELECT * FROM countries WHERE id = $1", [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        } else {
            res.json(result.rows[0]);
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

//GETTING COUNTRY BY NAME
const getCountryByName = async (req, res) => {
    try{
        const name = req.params.name

        const result = await pool.query (
            "SELECT * FROM countries WHERE name = $1",
            [name]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Country not found"
            });
        } else {
            res.json(result.rows[0]);
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        })
    }
};

//CREATE A COUNTRY
const createCountry = async (req, res) => {
    try{
        const { name, capital } = req.body

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO countries (name, capital)
            VALUES ($1, $2)
            RETURNING *
            `,
            [name, capital]
        );

        res.status(201).json(result.rows[0]);
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: IS_ERROR
        })
    }
};

//UPDATE A COUNTRY
const updateCountry = async (req, res) => {
    try{
        const id = req.params.id
        const { name, capital } = req.body

        const result = await pool.query(
            `
            UPDATE countries
            SET name = $1,
            CAPITAL = $2
            WHERE id = $3
            RETURNING *
            `,
            [name, capital, id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

//DELETING A COUNTRY
const deleteCountry = async (req, res) => {
    try{
        const id = req.params.id

        const result = await pool.query(
            `
            DELETE FROM countries
            WHERE id = $1
            RETURNING *
            `, [id]
        );

        res.json({
            message: "Country deleted",
            country: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName,
    createCountry,
    updateCountry,
    deleteCountry
};