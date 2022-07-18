import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const CompanyForm = styled("div")({
    display: `flex`,
    position: `absolute`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    boxSizing: `border-box`,
    left: `0px`,
    top: `38px`,
});

const CompanyName = styled(TextField)({
    width: `356px`,
    margin: `0px`,
});

const CompanyId = styled(TextField)({
    width: `356px`,
    margin: `15px 0px 0px 0px`,
});

const CompanyPhone = styled(TextField)({
    width: `356px`,
    margin: `15px 0px 0px 0px`,
});

const CompanyEmail = styled(TextField)({
    width: `356px`,
    margin: `15px 0px 0px 0px`,
});

const CompanyLocation = styled(TextField)({
    width: `356px`,
    margin: `15px 0px 0px 0px`,
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
});

const RegístrateSubtítulo = styled("div")({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    color: '#1976d2',
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `800`,
    fontSize: `25px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    margin: `30px 0px 0px 0px`,
});

const CompanySection = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `420px`,
    width: `356px`,
    margin: `0px`,
});

const Container = styled("div")({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    width: `100vw`,
    justifyContent: `center`,
    alignItems: `flex-start`,
    padding: `84px 40px 40px 61px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
});

const LeftColumn = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const ButtonContained = styled(Button)({
    alignSelf: `stretch`,
    margin: `0px`,
});

function RegisterCompany({ employerId }) {
    const [companyName, setCompanyName] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyLocation, setCompanyLocation] = useState("");
    const [isValidName, setIsValidName] = useState(true);
    const [isValidId, setIsValidId] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidLocation, setIsValidLocation] = useState(true);
    const [validFields, setValidFields] = useState(false);
    const router = useRouter();

    useEffect(() => {
        validateFields();
    }, [companyName, companyId, companyPhone, companyEmail, companyLocation]);

    const validateFields = () => {
        setValidFields(
            () =>
                isValidName &&
                companyName != "" &&
                isValidId &&
                companyId != "" &&
                isValidEmail &&
                companyEmail != "" &&
                isValidPhone &&
                companyPhone != 0 &&
                isValidLocation &&
                companyLocation != ""
        );
    };

    const handleCompanyName = (event) => {
        setCompanyName(event.target.value);
        if (event.target.value.length > 0) {
            setIsValidName(true);
        } else {
            setIsValidName(false);
        }
    };

    const handleCompanyId = (event) => {
        setCompanyId(event.target.value);
        if (event.target.value.length === 12) {
            setIsValidId(true);
        } else {
            setIsValidId(false);
        }
    };

    const handleCompanyPhone = (event) => {
        setCompanyPhone(event.target.value);
        if (event.target.value.length === 8) {
            setIsValidPhone(true);
        } else {
            setIsValidPhone(false);
        }
    };

    const handleCompanyEmail = (event) => {
        setCompanyEmail(event.target.value);
        if (event.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };

    const handleCompanyLocation = (event) => {
        setCompanyLocation(event.target.value);
        if (event.target.value.length > 0) {
            setIsValidLocation(true);
        } else {
            setIsValidLocation(false);
        }
    };

    const submitInfo = () => {
        const info = {
            name: companyName,
            id: companyId,
            phone: companyPhone.toString(),
            email: companyEmail,
            location: companyLocation,
        };
        sendData(info);
    };

    const sendData = async (info) => {
        dataForDB = {
            employerId: employerId,
            name: info.name,
            id: info.id,
            phone: info.phone,
            email: info.email,
            location: info.location,
        };
        try {
            await fetch("/api/company", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForDB),
            });
            await router.push("/"); //Where to go after call the api
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Container>
                <LeftColumn>
                    <FormHeader>
                        <Logo src="/assets/img/Logo.png" alt={"Logo"} />
                        <RegístrateSubtítulo>{`Un paso más!`}</RegístrateSubtítulo>
                        <Regístrate>{`Registra tu Empresa`}</Regístrate>
                    </FormHeader>
                    <CompanySection>
                        <CompanyForm>
                            <CompanyName
                                value={companyName}
                                variant="outlined"
                                size="medium"
                                label={`Razón Social`}
                                type="text"
                                onChange={handleCompanyName}
                                error={!isValidName}
                            />
                            <CompanyId
                                value={companyId}
                                variant="outlined"
                                size="medium"
                                label={`Cédula Jurídica`}
                                type="number"
                                onChange={handleCompanyId}
                                error={!isValidId}
                                onInput={(e) => {
                                    e.target.value = Math.max(
                                        0,
                                        parseInt(e.target.value)
                                    )
                                        .toString()
                                        .slice(0, 12);
                                }}
                            />
                            <CompanyPhone
                                value={companyPhone}
                                variant="outlined"
                                size="medium"
                                label={`Teléfono`}
                                type="number"
                                onChange={handleCompanyPhone}
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
                            <CompanyEmail
                                value={companyEmail}
                                variant="outlined"
                                size="medium"
                                label={`Email`}
                                type="email"
                                onChange={handleCompanyEmail}
                                error={!isValidEmail}
                            />
                            <CompanyLocation
                                value={companyLocation}
                                variant="outlined"
                                size="medium"
                                label={`Dirección`}
                                type="text"
                                onChange={handleCompanyLocation}
                                error={!isValidLocation}
                            />
                        </CompanyForm>
                    </CompanySection>
                    <ButtonContained
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        disabled={validFields ? false : true}
                        onClick={submitInfo}
                    >
                        {" "}
                        Registrar Empresa{" "}
                    </ButtonContained>
                </LeftColumn>
            </Container>
        </>
    );
}

export default RegisterCompany;
