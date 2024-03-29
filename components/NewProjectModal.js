import {
    TextField,
    Dialog,
    Select,
    FormControl,
    InputLabel,
    Button,
    MenuItem,
    Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useRouter } from "next/router";

const ModalBeneficio1 = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `8px`,
    display: `flex`,
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
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `30px`,
    padding: `40px 40px 15px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    height: `418px`,
});

const Details = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `30px`,
    padding: `0px 10px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    height: `363px`,
});

const Frame1 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-end`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
});

const NameAndTitle = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `10px`,
    padding: `0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
});

const CrearNuevoBeneficio = styled("div")(({ theme }) => ({
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
}));

const FrameX = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `20px`,
    height: `20px`,
});

const X = styled("img")({
    height: `12px`,
    width: `12px`,
});

const TextFieldStandard = styled(TextField)({
    alignSelf: `stretch`,
});

const Frame11 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-end`,
    gap: `29px`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `53px`,
    width: `410px`,
});

const TextFieldStandard1 = styled(Select)({
    width: `185px`,
});

const TextFieldStandard2 = styled(TextField)({
    width: `185px`,
});

const Crc = styled("div")({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 1)`,
    fontStyle: `normal`,
    fontFamily: `Inter`,
    fontWeight: `500`,
    fontSize: `18px`,
    letterSpacing: `0.46000000834465027px`,
    textDecoration: `none`,
    textTransform: `uppercase`,
    width: `48px`,
    marginLeft: `-15px`,
});

const TextFieldOutlined = styled(TextField)({
    alignSelf: `stretch`,
    flexGrow: `1`,
});

const Cta = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(0, 0, 0, 0.04)`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `14px`,
    padding: `20px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
}));

const Links = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    gap: `30px`,
    padding: `0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
});

const Link1 = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
});

const Cancelar = styled("div")(({ theme }) => ({
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
}));

const NewProjectModal = (props) => {
    const router = useRouter();
    const [dateValue, setDateValue] = useState(new Date());
    const handleChange = (newValue) => {
        setDateValue(newValue);
    };
    const [nameValue, setNameValue] = useState("");
    const [frequencyValue, setFrequencyValue] = useState("");
    const [currencyValue, setCurrencyValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [benefitsValue, setBenefitsValue] = useState("");
    const [isValidAmount, setIsValidAmount] = useState(true);
    const [isValidBenefits, setIsValidBenefits] = useState(true);
    const [validFields, setValidFields] = useState(false);

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };
    const handleFrequencyChange = (event) => {
        setFrequencyValue(event.target.value);
    };
    const handleCurrencyChange = (event) => {
        setCurrencyValue(event.target.value);
    };
    const handleAmountChange = (event) => {
        setAmountValue(event.target.value);
        if (event.target.value < 0) {
            setIsValidAmount(false);
        } else {
            setIsValidAmount(true);
        }
    };
    const handleBenefitsChange = (event) => {
        setBenefitsValue(event.target.value);
        if (event.target.value < 0) {
            setIsValidBenefits(false);
        } else {
            setIsValidBenefits(true);
        }
    };
    const validateFields = () => {
        setValidFields(
            () =>
                isValidAmount &&
                isValidBenefits &&
                nameValue !== "" &&
                frequencyValue !== "" &&
                currencyValue !== "" &&
                amountValue !== "" &&
                benefitsValue !== "" &&
                dateValue !== null &&
                dateValue != "Invalid Date" &&
                dateValue.toString().split(" ")[3][0] === "2"
        );
    };

    const sendProject = async () => {
        dateValue.setHours(dateValue.getHours() - 6);
        const project = {
            companyID: props.companyID,
            name: nameValue,
            frequency: frequencyValue,
            currency: currencyValue,
            amount: amountValue,
            benefits: benefitsValue,
            date: dateValue.toISOString(),
        };
        await fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });
        props.setIsOpen(false);
        router.reload();
    };

    useEffect(() => {
        validateFields();
    }, [
        nameValue,
        frequencyValue,
        currencyValue,
        amountValue,
        benefitsValue,
        isValidAmount,
        isValidBenefits,
        dateValue,
    ]);

    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <ModalBeneficio1>
                <Content>
                    <Details>
                        <Frame1>
                            <NameAndTitle>
                                <CrearNuevoBeneficio>{`Nuevo Proyecto`}</CrearNuevoBeneficio>
                            </NameAndTitle>
                            <FrameX onClick={() => props.setIsOpen(false)}>
                                <X src={"/assets/img/x.png"} alt={"x"} />
                            </FrameX>
                        </Frame1>
                        <TextFieldStandard
                            variant="standard"
                            size="medium"
                            label={`Nombre`}
                            value={nameValue}
                            onChange={handleNameChange}
                            maxLength={90}
                        />
                        <Frame11>
                            <FormControl>
                                <InputLabel sx={{ marginLeft: -2 }}>
                                    Frecuencia de Pago
                                </InputLabel>
                                <TextFieldStandard1
                                    variant="standard"
                                    size="medium"
                                    value={frequencyValue}
                                    onChange={handleFrequencyChange}
                                >
                                    <MenuItem value={"Semanal"}>
                                        Semanal
                                    </MenuItem>
                                    <MenuItem value={"Quincenal"}>
                                        Quincenal
                                    </MenuItem>
                                    <MenuItem value={"Mensual"}>
                                        Mensual
                                    </MenuItem>
                                </TextFieldStandard1>
                            </FormControl>
                            <FormControl>
                                <InputLabel sx={{ marginLeft: -2 }}>
                                    Moneda
                                </InputLabel>
                                <TextFieldStandard1
                                    variant="standard"
                                    size="medium"
                                    value={currencyValue}
                                    onChange={handleCurrencyChange}
                                >
                                    <MenuItem value={"USD"}>
                                        Dólares(USD)
                                    </MenuItem>
                                    <MenuItem value={"CRC"}>
                                        Colones(CRC)
                                    </MenuItem>
                                </TextFieldStandard1>
                            </FormControl>
                        </Frame11>
                        <Frame11>
                            <TextFieldStandard2
                                variant="standard"
                                size="medium"
                                label={`Monto máx. beneficios`}
                                type="number"
                                value={amountValue}
                                onChange={handleAmountChange}
                                error={!isValidAmount}
                            />
                            <TextFieldStandard2
                                variant="standard"
                                size="medium"
                                label={`Beneficios máximos`}
                                type="number"
                                value={benefitsValue}
                                onChange={handleBenefitsChange}
                                error={!isValidBenefits}
                            />
                        </Frame11>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} alignItems="stretch">
                                <DesktopDatePicker
                                    label="Fecha de inicio"
                                    inputFormat="dd/MM/yyyy"
                                    value={dateValue}
                                    onChange={handleChange}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            sx={{ width: 185 }}
                                            size="medium"
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Details>
                </Content>
                <Cta>
                    <Links>
                        <Link1>
                            <Cancelar onClick={() => props.setIsOpen(false)}>
                                {`Cancelar`}
                            </Cancelar>
                        </Link1>
                        {!validFields ? (
                            <Tooltip
                                title={"Debes Completar todos los campos"}
                                arrow
                                placement="top"
                            >
                                <span>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={sendProject}
                                        disabled={!validFields}
                                    >
                                        {" "}
                                        {`Crear Proyecto`}{" "}
                                    </Button>
                                </span>
                            </Tooltip>
                        ) : (
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                onClick={sendProject}
                                disabled={!validFields}
                            >
                                {" "}
                                {`Crear Proyecto`}{" "}
                            </Button>
                        )}
                    </Links>
                </Cta>
            </ModalBeneficio1>
        </Dialog>
    );
};

export default NewProjectModal;
