const express = require("express");

const router = express.Router();

const {
    getAllCountries,
    getCountryById,
    getCountryByName,
    createCountry,
    updateCountry,
    deleteCountry,
    getContinents
} = require("../controllers/countriesController");

router.get("/", getAllCountries);
router.get("/:id", getCountryById);
router.get("/name/:name", getCountryByName);
router.get("/continent/:continent", getContinents);

router.post("/", createCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);

module.exports = router;