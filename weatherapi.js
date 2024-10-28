

document.querySelector('#checkWeather').addEventListener('click', getWeather);

function getWeather() {
    const apiKey = 'c9fdaa8e20ac40d2967364dca4b67f4d';
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;
    const url = `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=${apiKey}`;

    console.log(`Fetching weather data for ${city}, ${country}...`);

    fetch(url)
        .then(response => {
            console.log(`Response status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Full API Response:', data);

            if (data && data.data && data.data.length > 0) {
                const weatherData = data.data[0];
                const description = weatherData.weather.description;
                const temperatureCelsius = weatherData.temp;
                const windSpeed = weatherData.wind_spd;

                // Convert Celsius to Fahrenheit
                const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
                
                console.log(`Weather description: ${description}`);
                console.log(`Temperature (Celsius): ${temperatureCelsius}°C`);
                console.log(`Temperature (Fahrenheit): ${temperatureFahrenheit}°F`);
                console.log(`Wind Speed: ${windSpeed} m/s`);

                // Display weather information in the DOM
                document.querySelector('#weatherInfo').innerText = 
                    `Weather in ${city}, ${country}: ${description}. Temperature: ${temperatureFahrenheit}°F, Wind Speed: ${windSpeed} m/s`;
            } else {
                console.log('No weather data found.');
                document.querySelector('#weatherInfo').innerText = 'Error. Please enter a valid city/country.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.querySelector('#weatherInfo').innerText = 'Error';
        });
}


// 50 input daily limit