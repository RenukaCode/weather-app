import {useState} from "react";
import {AppBar, Toolbar, Typography, Container, Box, Card, CardContent} from "@mui/material";
// import ButtonTest from "./ButtonTest";
import SearchBox from "./SearchBox";
import {getWeather} from "./WeatherService";
import WeatherInfoBox from "./WeatherInfoBox";

function App(){
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSearch = async (city)=>{
    setLoading(true);
    setError("");
    try{
      const data = await getWeather(city);
      setWeather(data);
    } catch(err){
      setError(err.message);
      setWeather(null);
    } finally{
      setLoading(false);
    }
  };

  return(
    <>
      <AppBar position = "static" sx={{backgroundColor: "transparent", boxShadow: "none", mt:4}}>
        <Container maxWidth="sm">
          <Toolbar disableGutters>
            <Box sx={{flexGrow: 1}}>
              <SearchBox onSearch={handleSearch}/>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth = "sm" sx={{mt:4, textAlign: "center"}}>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <WeatherInfoBox weather={weather}/>
      </Container>
    </>
  );
}
export default App;