const input = document.querySelector(".input");
const weather = document.querySelector(".weather");

input.addEventListener("input", async (event) => {
    const city = event.target.value.trim();
    console.log("Введён город:", city); 

    if (!city) {
        weather.innerHTML = ""; 
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=395bb0775ffd785075b58f9d4a9433ee`);
        console.log("Ответ от сервера:", response);

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        const res = await response.json();
        console.log("JSON-ответ:", res);

        if (res.cod !== 200) {
            weather.innerHTML = `<p class="error">Ошибка: ${res.message}</p>`;
            return;
        }

        weather.innerHTML = `
            <div class="weather-card">
                <h1>${res.name}</h1>
                <p class="temp">🌡 Температура: ${res.main.temp}°C</p>
                <p class="temp-min">❄️ Мин: ${res.main.temp_min}°C</p>
                <p class="temp-max">🔥 Макс: ${res.main.temp_max}°C</p>
            </div>
        `;
    } catch (error) {
        console.error("Ошибка запроса:", error);
        weather.innerHTML = `<p class="error">Ошибка при загрузке данных: ${error.message}</p>`;
    }
});
