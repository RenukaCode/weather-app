import { Card, CardContent, Typography, Box, Divider, Switch, FormControlLabel } from "@mui/material";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import SpeedIcon from "@mui/icons-material/Speed";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";


function WeatherInfoBox({ weather, unit, toggleUnit }) {
  if (!weather) return null;

  const convert = (c) => (unit === "F" ? Math.round((c * 9) / 5 + 32) : Math.round(c));

  const getTempColor = () => {
    if (weather.temp <= 0) return "#0288d1";
    if (weather.temp > 30) return "red";
    if (weather.temp < 10) return "blue";
    return "inherit";
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 1 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Current Weather
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: unit === "C" ? "#2196f3" : "transparent",
                color: unit === "C" ? "#fff" : "#000",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              C
            </Typography>
            <Switch checked={unit === "F"} onChange={toggleUnit} size="small" />
            <Typography
              variant="body2"
              sx={{
                backgroundColor: unit === "F" ? "#2196f3" : "transparent",
                color: unit === "F" ? "#fff" : "#000",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              F
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#2196f3", mb: 1 }}>
              {weather.city}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box
                component="img"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                sx={{ width: 80, height: 80 }}
              />
              <Typography variant="h3" sx={{ color: getTempColor() }}>
                {convert(weather.temp)}°{unit}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ textTransform: "capitalize", mt: 1 }}>
              {weather.description}
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
          
          <Box sx={{ textAlign: "left", minWidth: 180 }}>
            <Typography variant="body2" sx={{ mb: 1.5, color: "#2196f3" }}>
              <strong>Feels like {convert(weather.feelsLike)}°{unit}</strong>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <WaterDropIcon sx={{fontSize:18,color:"#000", mr:1}}/>
              <Typography variant="body2" sx={{ color: "#666", width: 100 }}>
                Humidity
              </Typography>
              <Typography variant="body2">{weather.humidity}%</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AirIcon sx={{fontSize:18,color:"#000", mr:1}}/>
              <Typography variant="body2" sx={{ color: "#666", width: 100 }}>
                Wind
              </Typography>
              <Typography variant="body2">{weather.windSpeed} m/s</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <SpeedIcon sx={{fontSize:18,color:"#000", mr:1}}/>
              <Typography variant="body2" sx={{ color: "#666", width: 100 }}>
                Pressure
              </Typography>
              <Typography variant="body2">{weather.pressure} hPa</Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default WeatherInfoBox;