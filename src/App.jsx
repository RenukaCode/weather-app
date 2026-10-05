import {useState, useEffect} from "react";
import {AppBar, Toolbar, Typography, Container, Box, Alert, Switch, FormControlLabel, CircularProgress} from "@mui/material";
// import ButtonTest from "./ButtonTest";
import SearchBox from "./SearchBox";
import {getWeather} from "./WeatherService";
import WeatherInfoBox from "./WeatherInfoBox";

function App(){
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [unit, setUnit]=useState("C");


  const updateInfo = async (city)=>{
    setLoading(true);
    setError("");
    setWeather(null);
    try{
      const data = await getWeather(city);
      setWeather(data);
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
    <>
      <AppBar position = "static" sx={{backgroundColor: "transparent", boxShadow: "none", mt:4}}>
        <Container maxWidth="sm">
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <SearchBox onSearch={updateInfo}/>
            </Box>
            <FormControlLabel control={<Switch checked={unit==="F"} onChange={toggleUnit}/>}
            label={unit==="C"?"°C":"°F"}
            sx={{ml:2,color:"#000"}}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth = "sm" sx={{mt:4, textAlign: "center"}}>
        {loading && <CircularProgress sx={{mt:4}}/>}
        {error && (<Alert severity="error" sx={{mt:4}}>{error}</Alert>)}
        <WeatherInfoBox weather={weather} unit={unit}/>

        {lastUpdated && !loading &&(
          <Typography variant="caption" sx={{display: "black", mt:2, color:"#666"}}>
            Last Updated: {lastUpdated}
          </Typography>
        )}
      </Container>
    </>
  );
}
export default App;