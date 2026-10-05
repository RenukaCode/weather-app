import {Card, CardContent, Typography, Box} from "@mui/material";

function WeatherInfoBox({weather, unit}){
    if(!weather) return null;

    const convert=(celsius)=>{
        return unit==="F" ? Math.round((celsius*9)/5+32) : Math.round(celsius);
    };

    const getTempColor = () => {
        if (weather.temp<=0) return "#0288d1";
        if(weather.temp>30) return "red";
        if(weather.temp<10) return "blue";
        return "inherit";
    };

    const getCardBackground=()=>{
        if(weather.temp<=0) return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
        return "#fff";
    }

    return(
        <Card sx={{borderRadius: 3, boxShadow: 3, background: getCardBackground()}}>
            <CardContent>
                <Typography variant="h5">
                    {weather.city}, {weather.country}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexWrap: "wrap",
                    }}
                    >

                    <Box sx={{textAlign: "center"}}>
                        <Box component="img"
                        src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                        alt={weather.description}
                        sx={{width:120, height:120}}
                        />
                        <Typography variant="h3" sx={{color: getTempColor()}}>
                            {convert(weather.temp)}°{unit}
                        </Typography>
                        {weather.temp<=0 &&(
                            <Typography variant="caption" sx={{display:"block", color:"#0288d1"}}>
                                ❄ Freezing
                            </Typography>
                        )}
                        <Typography variant="body1" sx={{textTransform: "capitalize", mt: 1}}>
                            {weather.description}
                        </Typography>
                    </Box>
                    
                    <Box sx={{textAlign:"left", minWidth:100}}>
                    <Typography variant="body2" sx={{mb:1}}>
                        <strong>Feels like:</strong>{convert(weather.temp)}°{unit}
                    </Typography>
                    <Typography variant="body2" sx={{mb:1}}>
                        <strong>Humidity:</strong>{weather.humidity}%
                    </Typography>
                    <Typography variant="body2" sx={{mb:1}}>
                        <strong>Wind:</strong> {weather.windSpeed} m/s
                    </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default WeatherInfoBox;