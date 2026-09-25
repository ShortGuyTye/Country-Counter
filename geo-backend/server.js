const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const countriesRouter = require("./routes/countries");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/countries", countriesRouter);

app.listen(3000, () => {
  console.log("Server running");
});