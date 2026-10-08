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
      localStorage.setItem("lastCity", city);
    } catch(err){
      setError(err.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    const savedCity = localStorage.getItem("lastCity") || "London";
    updateInfo(savedCity);
  }, []);

  const toggleUnit = ()=>{
    setUnit(unit==="C"?"F":"C");
  };

  return(
    <Box
      sx={{
        Height:"100vh",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        py:3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width:"100%", 
          maxWidth:800,
          height: "calc(100vh - 48px)",
          border: "2px solid #fff",
          borderRadius:3,
          px:3,
          py:3,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(2px)",
          overflowY: "auto",
        }}
      >
      <AppBar position = "static" sx={{backgroundColor: "transparent", boxShadow: "none", mt:2}}>
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <SearchBox onSearch={updateInfo} initialCity={localStorage.getItem("lastCity") || ""}/>
            </Box>
          </Toolbar>
      </AppBar>
      <Box sx={{textAlign: "center"}}>
        {loading && <CircularProgress sx={{mt:4, color:"#fff"}}/>}
        {error && (<Alert severity="error" sx={{mt:4}}>{error}</Alert>)}
        <WeatherInfoBox weather={weather} unit={unit} toggleUnit={toggleUnit}/>

        {forecast.length > 0 && (
          <Box sx={{display:"flex", gap:1, mt:3, flexWrap:"wrap", justifyContent: "center" }}>
            {forecast.map((day)=>(
              <Box
                key={day.day}
                sx={{
                  backgroundColor: "#2196f3",
                  borderRadius: 2,
                  flex: "1 1 100%",
                  minWidth:120,
                  py:1.5,
                  px:1,
                  display:"flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color:"#fff",
                  textAlign:"center",
                  flex: {
                    xs: "1 1 100%",
                    md: "1 1 120px",
                  },
                  minWidth: {
                    xs: "100%",
                    md: 120,
                  },
                }}
                >
                  <Typography variant="body2" sx={{fontWeight: "bold", width:50, textAlign: "left"}}>{day.day}</Typography>
                  <Box 
                    component="img" src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                    alt={day.description}
                    sx={{width: 45, height: 45}}
                  />
                  <b><Typography variant="body2" sx={{textTransform: "capitalize", fontSize:12, flex:1, textAlign:"left", fontWeight:"bold", ml:1}}>{day.description}</Typography> </b>
                  <Typography variant="body2" sx={{mt:0.5}}>
                    {convert(day.tempMax)}° / {convert(day.tempMin)}°
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