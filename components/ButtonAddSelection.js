import Styles from "../styles/ButtonAddSelection.module.css";
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    neutral: {
      main: '#FE3D2B',
      contrastText: '#fff',
    },
  },
});

const buttonAddSelection =  (props) => {
    return (
        <div className={Styles.content}> 
            <ThemeProvider theme={theme}> 
                <Button onClick={props.handleOpenModal} color="neutral" variant="contained" 
                sx={{
                  textTransform: 'none',
                  borderRadius: '10px',
                }}><span className={Styles.nameButton}>{props.text}</span></Button>
            </ThemeProvider>
        </div>
    );
};

export default buttonAddSelection;
