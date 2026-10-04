import {Card, CardContent, Typography, Box} from "@mui/material";

function WeatherInfoBox({weather}){
    if(!weather) return null;

    const getTempColor = () => {
        if(weather.temp>30) return "red";
        if(weather.temp<10) return "blue";
        return "inherit";
    };

    return(
        <Card sx={{borderRadius: 3, boxShadow: 3}}>
            <CardContent>
                <Typography variant="h5">
                    {weather.city}, {weather.country}
                </Typography>
                <Box component="img"
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                sx={{width:100, height:100}}
                />

                <Typography variant="h3" sx={{color: getTempColor()}}>
                    {Math.round(weather.temp)}°C
                </Typography>
                <Typography variant="body1" sx={{textTransform:"capitalize, mt:1"}}>
                    {weather.description}
                </Typography>
                <Typography variant="body2" sx={{mt:1}}>
                    Wind: {weather.windSpeed} m/s
                </Typography>
            </CardContent>
        </Card>
    );
}

export default WeatherInfoBox;