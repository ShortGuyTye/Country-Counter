const express = require("express");

const app = express();
app.use(express.json());

const countriesRouter = require("./routes/countries");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/countries", countriesRouter);

app.listen(3000, () => {
  console.log("Server running");
});