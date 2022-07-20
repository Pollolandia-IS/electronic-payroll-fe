import {
    TextField,
    Button,
    InputAdornment,
    Dialog,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useEffect } from "react";

const Container = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `8px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    width: `500px`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
}));

const Content = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});

const Form = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px 10px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});

const FormInfo = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
    width: `400px`,
    margin: `0px`,
});

const Title = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.87)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `700`,
    fontSize: `24px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    alignSelf: `stretch`,
    margin: `0px`,
}));

const Description = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    alignSelf: `stretch`,
    margin: `10px 0px 0px 0px`,
}));

const NewPassword = styled(TextField)({
    alignSelf: `stretch`,
    margin: `30px 0px 0px 0px`,
});

const RetypePassword = styled(TextField)({
    alignSelf: `stretch`,
    margin: `30px 0px 0px 0px`,
});

const Footer = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(0, 0, 0, 0.04)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    padding: `20px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    height: `62px`,
    margin: `0px`,
}));

const Buttons = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
    margin: `0px`,
});

const CancelButton = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
    cursor: `pointer`,
});

const CancelText = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(25, 118, 210, 1)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `150%`,
    textTransform: `none`,
    margin: `0px`,
}));

const ConfirmButton = styled(Button)({
    margin: `0px 0px 0px 30px`,
});

function ChangePasswordModal(props) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [userDataChanged, setUserDataChanged] = useState(false);
    const [validFields, setValidFields] = useState(false);

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
      if (
          event.target.value.length > 8 &&
          event.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
      ) {
          setIsValidPassword(true);
      } else {
          setIsValidPassword(false);            
      }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value === password) {
            setIsValidConfirmPassword(true);
        } else {
            setIsValidConfirmPassword(false);
        }
    };

    const validateFields = () => {
        setValidFields(() => {
            return (isValidPassword && isValidConfirmPassword && (password !== props.pw) && password !== "");
        });
    };

    const handleSubmit = async () => {
        const newData = {
            userEmail: props.email,
            newPassword: password,
            confirmPassword: confirmPassword
        }
        try {
            await fetch(`/api/editPassword/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
          } catch (error) {
          console.error(error);
        }
        props.setpasswordModalOpened(false);
    }

    useEffect(() => { validateFields(); });

    return (
        <Dialog
            open={props.isOpen} 
            onClose={() => props.setpasswordModalOpened(false)}
        >
            <Container>
                <Content>
                    <Form>
                        <FormInfo>
                            <Title>{`Cambiar Contraseña`}</Title>
                            <Description>
                                {`Debe contener al menos 10 caracteres, 1 mayúscula, 1 minúscula y un número.`}
                            </Description>
                        </FormInfo>
                        <NewPassword
                            type={showPassword ? "text" : "password"}
                            variant="standard"
                            size="medium"
                            label={`Nueva contraseña`}
                            onChange={handlePasswordChange}
                            required={true}
                            error={!isValidPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton color="default">
                                            <VisibilityIcon
                                                color={
                                                  showPassword
                                                        ? "primary"
                                                        : "action"
                                                }
                                                onClick={() =>
                                                  setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <RetypePassword
                            type={showConfirmPassword ? "text" : "password"}
                            variant="standard"
                            size="medium"
                            label={`Reingresa la contraseña`}
                            onChange={handleConfirmPasswordChange}
                            required={true}                      
                            error={!isValidConfirmPassword}
                            InputProps={{
                              endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton color="default">
                                          <VisibilityIcon
                                              color={
                                                  showConfirmPassword
                                                      ? "primary"
                                                      : "action"
                                              }
                                              onClick={() =>
                                                  setShowConfirmPassword(
                                                      !showConfirmPassword
                                                  )
                                              }
                                          />
                                      </IconButton>
                                  </InputAdornment>
                              ),
                          }}
                        />
                    </Form>
                </Content>
                <Footer>
                    <Buttons>
                        <CancelButton
                            onClick={() => props.setpasswordModalOpened(false)}
                        >
                            <CancelText>{`Cancelar`}</CancelText>
                        </CancelButton>
                        <ConfirmButton
                            variant="outlined"
                            size="large"
                            color="primary"
                            disabled={!validFields}
                            onClick={handleSubmit}
                        >
                            {" "}
                            Confirmar{" "}
                        </ConfirmButton>
                    </Buttons>
                </Footer>
            </Container>
        </Dialog>
    );
}

export default ChangePasswordModal;
