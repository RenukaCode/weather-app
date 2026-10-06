const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeather(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const jsonResponse = await response.json();

    return {
      city: jsonResponse.name,
      country: jsonResponse.sys.country,
      temp: jsonResponse.main.temp,
      feelsLike: jsonResponse.main.feels_like,
      description: jsonResponse.weather[0].description,
      icon: jsonResponse.weather[0].icon,
      windSpeed: jsonResponse.wind.speed,
      humidity: jsonResponse.main.humidity,
      pressure: jsonResponse.main.pressure,
      twmpMx:jsonResponse.main.temp.temp_max,
      tempMin:jsonResponse.main.temp_min,
    };
  } catch (err) {
    console.log("Network/API fallback log:", err.message);
    throw err;
  }
}

export async function getForecast(city) {
  const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  const data = await response.json();

  const dailyForecast = [];
  const seenDays = new Set();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
    if (!seenDays.has(date)) {
      seenDays.add(date);
      dailyForecast.push({
        day: date,
        temp: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      });
    }
  });

  return dailyForecast.slice(0, 5);
}