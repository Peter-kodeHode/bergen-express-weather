
function fetchWeather() {
  fetch('/weather') 
    .then(response => response.json())
    .then(data => {
      const weatherTemp = data.properties.timeseries[0].data.instant.details.air_temperature;
      const weatherHumidity = data.properties.timeseries[0].data.instant.details.relative_humidity;
      
      const weatherInfoElement = document.querySelector(".weather-info");
      weatherInfoElement.innerHTML = `Det er nå <span>${weatherTemp}</span> grader i <span>Bergen</span>,<br> med en luftfuktighet på <span>${weatherHumidity}%</span>`;
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
    });
}


function fetchImage() {
  fetch('/image') 
    .then(response => response.json())
    .then(data => {
      const images = data.hits;
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex];
        
        const imageElement = document.querySelector(".image-container img");
        imageElement.src = randomImage.largeImageURL;
        imageElement.alt = randomImage.tags;
      }
    })
    .catch(error => {
      console.error('Error fetching image:', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchImage();
});

