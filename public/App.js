const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://bergen-express-weather-backend.onrender.com";

function fetchWeather() {
  fetch(`${API_URL}/weather`)
    .then((response) => response.json())
    .then((data) => {
      const weatherTemp =
        data.properties.timeseries[0].data.instant.details.air_temperature;
      const weatherHumidity =
        data.properties.timeseries[0].data.instant.details.relative_humidity;
      const weatherInfoElement = document.querySelector(".weather-info");
      weatherInfoElement.innerHTML = `Det er nå <span>${weatherTemp}</span> grader i <span>Bergen</span>, med en luftfuktighet på <span>${weatherHumidity}%</span>`;
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
    });
}

function fetchImage() {
  fetch(`${API_URL}/image`)
    .then((response) => response.json())
    .then((data) => {
      const images = data.hits;
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];

        const backgroundContainer = document.querySelector(
          `.background-container`
        );
        backgroundContainer.style.backgroundImage = `url(${randomImage.largeImageURL})`;
      }
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather();
  fetchImage();
});
