import {AppBar, Toolbar, Typography, Container, Box} from "@mui/material";
// import ButtonTest from "./ButtonTest";
import SearchBox from "./SearchBox";

function App(){
  const handleSearch = (city)=>{
    console.log("searching for:", city);
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
      <Container sx={{mt:4, textAlign: "center"}}>
        <Typography variant = "h4">
          Let's See!
          {/* <ButtonTest/> */}
        </Typography>
      </Container>
    </>
  )
}
export default App;