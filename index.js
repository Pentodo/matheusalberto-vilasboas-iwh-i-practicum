require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const url = "https://api.hubspot.com/crm/v3/objects/movies";
const headers = {
  Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

// * Code for Route 1 goes here
app.get("/", async (_, res) => {
  try {
    const { data } = await axios.get(url + "?properties=name,director,year", { headers });
    res.render("homepage", {
      title: "Custom Object Table | Integrating With HubSpot I Practicum",
      movies: data.results.map((m) => ({
        id: m.id,
        name: m.properties.name,
        director: m.properties.director,
        year: m.properties.year,
      })),
    });
  } catch (error) {
    console.error(error);
  }
});

// * Code for Route 2 goes here
app.get("/update-cobj", (_, res) => {
  res.render("updates", { title: "Update Custom Object Form | Integrating With HubSpot I Practicum" });
});

// * Code for Route 3 goes here
app.post("/update-cobj", async (req, res) => {
  try {
    await axios.post(url, { properties: req.body }, { headers });
    res.redirect("/");
  } catch (error) {
    console.error(error);
  }
});

// * Localhost
app.listen(3000, () => console.log("Listening on http://localhost:3000"));
