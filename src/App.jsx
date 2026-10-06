import {useState, useEffect} from "react";
import {AppBar, Toolbar, Typography, Container, Box, Alert, CircularProgress} from "@mui/material";
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
        minHeight:"100vh",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        py:4,
      }}
    >
      <Box
        sx={{
          width:"100%", 
          maxWidth:"md",
          border: "2px solid #fff",
          borderRadius:3,
          px:3,
          py:3,
          backgroundColor: "rgb(255, 255, 255, 0.05)",
          backgroundFilter: "blur(2px)",
        }}
      >
      <AppBar position = "static" sx={{backgroundColor: "transparent", boxShadow: "none", mt:2}}>
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <SearchBox onSearch={updateInfo}/>
            </Box>
          </Toolbar>
      </AppBar>
      <Box sx={{textAlign: "center"}}>
        {loading && <CircularProgress sx={{mt:4, color:"#fff"}}/>}
        {error && (<Alert severity="error" sx={{mt:4}}>{error}</Alert>)}
        <WeatherInfoBox weather={weather} unit={unit} toggleUnit={toggleUnit}/>

        {forecast.length > 0 && (
          <Box sx={{display:"flex", gap:1, justifyContent:"center", mt:3, flexWrap: "wrap"}}>
            {forecast.map((day)=>(
              <Box
                key={day.day}
                sx={{
                  backgroundColor: "#2196f3",
                  display:"flex",
                  gap:1.5,
                  justifyContent:"center",
                  mt:3,
                  flexWrap:"nowrap",
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
        <Typography variant="caption"
        sx={{display:"block", mt:4, color:"#fff", opacity:0.85, fontSize:14}}
        >
          © Renuka Bonam
        </Typography>
      </Box>
      </Box>
    </Box>
  );
}
export default App;