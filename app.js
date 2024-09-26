function SearchCity() {
    let city = document.getElementById("Search").value;

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=47cb0f8505d7496fbe061440242609&q=${city}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            // Set current weather
            const current = data.current;
            document.querySelector('.current-weather h1').innerText = `${current.temp_c}°C`; // Temperature
            document.querySelector('.current-weather .mt-3').innerText = current.condition.text; // Condition text
            document.querySelector('.current-weather img').src = `https:${current.condition.icon}`; // Weather icon
            document.querySelector('.current-weather input').value = data.location.name; // Location name

            // Set hourly forecast
            const hourlyForecast = data.forecast.forecastday[0].hour; // Get hourly forecast for the current day
            const hourlyElements = document.querySelectorAll('.hourly-forecast .col-md-2');
            hourlyElements.forEach((el, index) => {
                if (hourlyForecast[index]) {
                    el.querySelector('p:nth-child(2)').innerText = `${hourlyForecast[index].time.split(' ')[1]}`; // Time
                    el.querySelector('p:nth-child(3)').innerText = `${hourlyForecast[index].temp_c}°C`; // Temperature
                    el.querySelector('p:nth-child(4)').innerText = `${hourlyForecast[index].chance_of_rain}%`; // Chance of rain
                    el.querySelector('img').src = `https:${hourlyForecast[index].condition.icon}`; // Weather icon
                }
            });

            // Set weekly forecast (using daily data)
            const weeklyForecast = data.forecast.forecastday; // Get the next 3 days' forecast
            const weeklyTable = document.querySelector('.weekly-forecast tbody');
            weeklyTable.innerHTML = ''; // Clear previous data
            weeklyForecast.forEach(day => {
                const row = `<tr>
                    <td>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</td>
                    <td>${day.day.condition.text}</td>
                    <td>${day.day.maxtemp_c}°C/${day.day.mintemp_c}°C</td>
                </tr>`;
                weeklyTable.innerHTML += row;
            });
        })
        .catch(error => console.error('Error:', error));
}
