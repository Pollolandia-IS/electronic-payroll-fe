/**********************************************************************
 *
 *   Component generated by Quest
 *
 *   WARNING: By editing this component by hand, you will lose the ability to regenerate the code without conflicts.
 *   To preseve that abilty, always export from Quest to regenerate this file.
 *   To setup props, bindings and actions, use the Quest editor
 *   Code Logic goes in the hook associated with this component
 *
 *   For help and further details refer to: https://www.quest.ai/docs
 *
 *
 **********************************************************************/

import {
    TextField,
    Button,
    MenuItem,
    InputAdornment,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { sub } from "date-fns";
import { useState, useEffect } from "react";
import { Tooltip } from "@mui/material";
import { getSelectUnstyledUtilityClass } from "@mui/base";
import { useRouter } from "next/router";

const StateNormal = styled("div")({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    width: `100%`,
    height: `944px`,
    justifyContent: `center`,
    alignItems: `flex-start`,
    padding: `0px 662px 69px 662px`,
    boxSizing: `border-box`,
});

const SignUpForm = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
    zIndex: `1`,
});

const FormHeader = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const Logo = styled("img")({
    height: `62.23px`,
    width: `341.69px`,
    margin: `0px`,
});

const Regístrate = styled("div")({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 1)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `800`,
    fontSize: `34px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    margin: `30px 0px 0px 0px`,
});

const Name = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined = styled(TextField)({
    width: `342px`,
    margin: `0px`,
});

const Id = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `56px`,
    width: `342px`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined1 = styled(TextField)({
    width: `124px`,
    margin: `0px`,
});

const IdInput = styled(TextField)({
    width: `188px`,
    margin: `0px 0px 0px 30px`,
});

const Phone = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined3 = styled(TextField)({
    width: `342px`,
    margin: `0px`,
});

const Email = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined4 = styled(TextField)({
    width: `342px`,
    margin: `0px`,
});

const Password = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined5 = styled(TextField)({
    width: `342px`,
    margin: `0px`,
});

const ConfirmPassword = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const TextFieldOutlined6 = styled(TextField)({
    width: `342px`,
    margin: `0px`,
});

const FormFooter = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `20px 0px 0px 0px`,
});

const ButtonContained = styled(Button)({
    alignSelf: `stretch`,
    margin: `0px`,
});

const Link1 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `24px 0px 0px 0px`,
    cursor: `pointer`,
});

const LinkTitle = styled("div")(({ theme }) => ({
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

function SignUp() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [idType, setIdType] = useState("Cédula");
    const [existsIdType, setExistsIdType] = useState(false);
    const [idLength, setIdLength] = useState(9);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidId, setIsValidId] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validFields, setValidFields] = useState(false);
    const router = useRouter();

    const submitInfo = () => {
        const info = {
            id: id,
            email: email,
            phone: phone.toString(),
            name: name,
            password: password,
            confirmPassword: confirmPassword,
        };
        sendData(info);
    };

    const sendData = async (info) => {
        const dataForDB = {
            id: info.id,
            email: info.email,
            phoneNumber: info.phone,
            name: info.name,
            password: info.password,
        };
        try {
            await fetch("/api/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForDB),
            });
            await router.push(`/LogIn`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleIdTypeChange = (event) => {
        setIdType(event.target.value);
        setId("");
        if (event.target.value === "Dimex") {
            setIdLength(12);
            setExistsIdType(true);
        } else {
            setIdLength(9);
            setExistsIdType(true);
        }
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
        if (event.target.value.length === idLength) {
            setIsValidId(true);
        } else {
            setIsValidId(false);
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (event.target.value.length > 0) {
            setIsValidName(true);
        } else {
            setIsValidName(false);
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
        if (event.target.value.length === 8) {
            setIsValidPhone(true);
        } else {
            setIsValidPhone(false);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (event.target.value.length > 3 && event.target.value.includes("@")) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

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

    useEffect(() => {
        validateFields();
    }, [name, id, phone, email, password, confirmPassword]);

    const validateFields = () => {
        setValidFields(
            () =>
                isValidName &&
                name != "" &&
                isValidId &&
                id != "" &&
                isValidEmail &&
                email != "" &&
                isValidPhone &&
                phone != 0 &&
                isValidPassword &&
                password != "" &&
                isValidConfirmPassword &&
                confirmPassword != ""
        );
    };

    return (
        <StateNormal>
            <SignUpForm>
                <FormHeader>
                    <Logo src="/assets/img/Logo.png" alt={"Logo"} />
                    <Regístrate>{`Regístrate`}</Regístrate>
                </FormHeader>
                <Name>
                    <TextFieldOutlined
                        variant="outlined"
                        size="medium"
                        label={`Nombre`}
                        type="text"
                        onChange={handleNameChange}
                        error={!isValidName}
                        required={true}
                    />
                </Name>
                <Id>
                    <TextFieldOutlined1
                        value={idType}
                        variant="outlined"
                        size="medium"
                        label={`Tipo`}
                        onChange={handleIdTypeChange}
                        select
                    >
                        <MenuItem value={`Cédula`}>{`Cédula`}</MenuItem>
                        <MenuItem value={`Dimex`}>{`DIMEX`}</MenuItem>
                    </TextFieldOutlined1>
                    <IdInput
                        value={id}
                        variant="outlined"
                        size="medium"
                        label={`Identificación`}
                        type="number"
                        onChange={handleIdChange}
                        error={!isValidId}
                        required={true}
                        onInput={(e) => {
                            e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                            )
                                .toString()
                                .slice(0, idLength);
                        }}
                    />
                </Id>
                <Phone>
                    <TextFieldOutlined3
                        variant="outlined"
                        size="medium"
                        label={`Teléfono`}
                        type="number"
                        required={true}
                        onChange={handlePhoneChange}
                        error={!isValidPhone}
                        onInput={(e) => {
                            e.target.value = Math.max(
                                0,
                                parseInt(e.target.value)
                            )
                                .toString()
                                .slice(0, 8);
                        }}
                    />
                </Phone>
                <Email>
                    <TextFieldOutlined4
                        variant="outlined"
                        size="medium"
                        label={`Correo`}
                        type="email"
                        onChange={handleEmailChange}
                        error={!isValidEmail}
                        required={true}
                    />
                </Email>
                <Password>
                    <TextFieldOutlined5
                        variant="outlined"
                        size="medium"
                        label={`Contraseña`}
                        type={showPassword ? "text" : "password"}
                        required={true}
                        onChange={handlePasswordChange}
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
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Password>
                <ConfirmPassword>
                    <TextFieldOutlined6
                        variant="outlined"
                        size="medium"
                        label={`Confirmar contraseña`}
                        type={showConfirmPassword ? "text" : "password"}
                        required={true}
                        onChange={handleConfirmPasswordChange}
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
                </ConfirmPassword>
                <FormFooter>
                    <ButtonContained
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        disabled={validFields ? false : true}
                        onClick={submitInfo}
                    >
                        {" "}
                        Registrarse{" "}
                    </ButtonContained>
                    <Link1>
                        <Link href="/LogIn">
                            <LinkTitle>
                                {`¿Ya tienes cuenta? Inicia sesión`}
                            </LinkTitle>
                        </Link>
                    </Link1>
                </FormFooter>
            </SignUpForm>
        </StateNormal>
    );
}

export default SignUp;
