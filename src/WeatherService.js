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
      tempMax: jsonResponse.main.temp_max,
      tempMin: jsonResponse.main.temp_min,
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

  const dailyData = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" });
    const hour = new Date(item.dt * 1000).getHours();

    if (!dailyData[date]) {
      dailyData[date] = {
        day: date,
        temps: [],
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        bestDiff: Math.abs(hour - 12),
      };
    }

    dailyData[date].temps.push(item.main.temp);
    const diff = Math.abs(hour - 12);
    if (diff < dailyData[date].bestDiff) {
      dailyData[date].bestDiff = diff;
      dailyData[date].icon = item.weather[0].icon;
      dailyData[date].description = item.weather[0].description;
    }
  });

  const dailyForecast = Object.values(dailyData).map((d) => ({
    day: d.day,
    tempMin: Math.min(...d.temps),
    tempMax: Math.max(...d.temps),
    icon: d.icon,
    description: d.description,
  }));

  return dailyForecast.slice(0, 5);
}