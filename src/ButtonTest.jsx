import {Button, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function ButtonTest(){
    return(
        <Stack direction = "row" spacing={2} sx={{mt:4, justifyContent:"center"}}>
            <Button variant="contained" color="error" endIcon={<DeleteIcon/>}>
            Delete
            </Button>
            <Button variant = "contained" color="success" endIcon={<SendIcon/>}> 
                Submit
            </Button>
            <Button variant="outlined" disabled sx={{borderColor:"#000", color: "#000"}}>
                Disabled
            </Button>
        </Stack>
    );
}
export default ButtonTest;