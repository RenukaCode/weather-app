import {useState} from 'react';
import {TextField, InputAdornment, IconButton, Typography, Box} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox({onSearch}){
    const [city, setCity] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(city.trim().length<2) return;
        onSearch(city.trim());
        setCity("");
    };

    return(
        <form onSubmit={handleSubmit} style={{width:"100%"}}>
            <Box
                sx={{
                    display: "flex",
                    alignItems:"center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    px:2,
                    backgroundColor: "#fff",
                }}
            >
                <TextField
                    fullWidth
                    variant = "standard"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    error={city.length> 0 && city.trim().length<2}
                    helperText={city.length > 0 && city.trim().length < 2 ? "At least 2 characters are required": ""}
                    slotProps={{
                        input: {
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{color: "#000"}}/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Typography
                                    onClick = {handleSubmit}
                                    sx={{color: "#000", cursor:"pointer", fontWeight: 500, pr:1}}
                                    >
                                        Search
                                    </Typography>
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        input: {color:"#000"},
                        "& .MuiFormHelperText-root": {color:"#ffb3b3"},
                    }}
                />
            </Box>
        </form>
    );
}
export default SearchBox;