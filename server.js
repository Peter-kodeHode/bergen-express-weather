require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const cors = require(`cors`);

app.use(
  cors({
    origin: [
      `http://localhost:3000`,
      `http://127.0.0.1:3000`,
      `https://peter-kodehode.github.io`,
    ],
    credentials: true,
  })
);

app.get("/weather", async (req, res) => {
  try {
    const weatherUrl = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=60.39&lon=5.32`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather:", error);
    res.status(500).send("Could not get weather data");
  }
});

app.get("/image", async (req, res) => {
  try {
    const imageUrl = `https://pixabay.com/api/?key=${apiKey}&q=bergen+norway&image_type=photo&orientation=horizontal`;
    const response = await fetch(imageUrl);
    const imageData = await response.json();
    res.json(imageData);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Could not get image data");
  }
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
