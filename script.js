function app() {
    const apiKey = "944f336c8ecc48e59b174147211503";

    let search_input = document.querySelector('.search');
    let city_name = document.querySelector('.city');
    let temp = document.querySelector('.temp');
    let condition = document.querySelector('.condition');
    let btn = document.querySelector('.btn');
    let icon = document.querySelector('.weather-icon');
    let weatherInfoContainer = document.querySelector('.weather-info-container');
    let errorMessage = document.querySelector('.error');

    async function getWeather() {
        try {
            const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search_input.value}&aqi=no`);
            const data = await res.json();

            if (res.ok) {
                errorMessage.textContent = '';

                city_name.textContent = `${data.location.name}, ${data.location.country}`;
                temp.textContent = `Temperature: ${data.current.temp_c}°C`;
                condition.textContent = `Condition: ${data.current.condition.text}`;
                icon.src = `https:${data.current.condition.icon}`;
                weatherInfoContainer.style.display = 'block';
            } else {
                throw new Error(data.error.message);
            }
        } catch (error) {
            errorMessage.textContent = `Error: ${error.message}`;
            weatherInfoContainer.style.display = 'none';
        }
    }

    btn.addEventListener('click', getWeather);
}

window.addEventListener('DOMContentLoaded', app);
