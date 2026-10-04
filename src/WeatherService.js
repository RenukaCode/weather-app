const API_KEY=import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL="https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city){
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try{
        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const jsonResponse = await response.json();

        return{
            city: jsonResponse.name,
            country: jsonResponse.sys.country,
            temp: jsonResponse.main.temp,
            description: jsonResponse.weather[0].description,
            icon: jsonResponse.weather[0].icon,
            windSpeed: jsonResponse.wind.speed,
            humidity: jsonResponse.main.humidity,
        };
    } catch(err){
        console.log("Network/API fallback log:", err.message);
        throw err;
    }
}