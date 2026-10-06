import {useState, useEffect} from "react";
import {AppBar, Toolbar, Typography, Container, Box, Alert, Switch, FormControlLabel, CircularProgress} from "@mui/material";
// import ButtonTest from "./ButtonTest";
import SearchBox from "./SearchBox";
import {getWeather, getForecast} from "./WeatherService";
import WeatherInfoBox from "./WeatherInfoBox";

function App(){
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [unit, setUnit]=useState("C");
  const [forecast, setForecast]=useState([]);

  const convert = (c) => unit === "F" ? Math.round((c * 9) / 5 + 32) : Math.round(c);

  const updateInfo = async (city)=>{
    setLoading(true);
    setError("");
    setWeather(null);
    setForecast([]);
    try{
      const data = await getWeather(city);
      const forecastData = await getForecast(city);
      setWeather(data);
      setForecast(forecastData);
      setLastUpdated(new Date().toLocaleTimeString ());
    } catch(err){
      setError(err.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    updateInfo("London");
  }, []);

  const toggleUnit = ()=>{
    setUnit(unit==="C"?"F":"C");
  };

  return(
    <Box
      sx={{
        height: "100vh",
        overflow:"hidden",
        width: "100%",
        // backgroundImage: "url('/bg.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundAttachment: "fixed",
      }}
    >
      <AppBar position = "static" sx={{backgroundColor: "transparent", boxShadow: "none", mt:4}}>
        <Container maxWidth="sm">
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <SearchBox onSearch={updateInfo}/>
            </Box>
            <FormControlLabel control={<Switch checked={unit==="F"} onChange={toggleUnit}/>}
            label={unit==="C"?"°C":"°F"}
            sx={{ml:2,color:"#fff"}}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth = "sm" sx={{mt:4, textAlign: "center"}}>
        {loading && <CircularProgress sx={{mt:4, color:"#fff"}}/>}
        {error && (<Alert severity="error" sx={{mt:4}}>{error}</Alert>)}
        <WeatherInfoBox weather={weather} unit={unit}/>

        {forecast.length > 0 && (
          <Box sx={{display:"flex", gap:1, justifyContent:"center", mt:3, flexWrap: "wrap"}}>
            {forecast.map((day)=>(
              <Box
                key={day.day}
                sx={{
                  backgroundColor: "#2196f3",
                  color:"#fff",
                  borderRadius:2,
                  minWidth:80,
                  p:2,
                  textAlign:"center",
                }}
                >
                  <Typography variant="body2" sx={{fontWeight: "bold"}}>{day.day}</Typography>
                  <Box 
                    component="img" src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    sx={{width: 50, height: 50}}
                  />
                  <Typography variant="body2">
                    {convert(day.temp)}°{unit}
                  </Typography>
              </Box>
            ))}
          </Box>
        )}

        {lastUpdated && !loading &&(
          <Typography variant="caption" sx={{display: "block", mt:2, color:"#fff"}}>
            Last Updated: {lastUpdated}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
export default App;