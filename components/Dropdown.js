import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const DropdownBox = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.15)`,
    borderRadius: `7px`,
    display: `flex`,
    width: `280px`,
    flexDirection: `row`,
    height: `50px`,
    justifyContent: `center`,
    alignItems: `center`,
    overflow: `hidden`,
}));

const Dropdown = (props) => {
    return (
        <DropdownBox>
            <TextField
                variant="standard"
                select
                sx={{width: "265px"}}
                InputProps={{ disableUnderline: true }}
                value={props.state}
                onChange={(e) => props.setState(e.target.value)}
            >
                {props.children}
            </TextField>
        </DropdownBox>
    );
};

export default Dropdown;
