import { TextField, Button, Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { useEffect, useState } from "react";

const TypeQuest = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `8px`,
    display: `flex`,
    flexDirection: `column`,
    height: `276px`,
    width: `386px`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `10px`,
    padding: `0px 0px 22px 0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
}));

const Content = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `flex-start`,
    gap: `14px`,
    padding: `30px 40px 20px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
});

const Details = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `6px`,
    padding: `4px 0px 0px 0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
});

const ReporteDeHoras = styled("div")(({ theme }) => ({
    textAlign: `center`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.87)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `700`,
    fontSize: `20px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    alignSelf: `stretch`,
}));

const Frame3 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    gap: `40px`,
    padding: `0px 10px`,
    boxSizing: `border-box`,
    width: `356px`,
});

const Row1 = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `20px`,
    padding: `0px`,
    boxSizing: `border-box`,
    flexGrow: `1`,
});

const TextFieldStandard = styled(TextField)({
    alignSelf: `stretch`,
});

const Cta = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(0, 0, 0, 0.04)`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `20px`,
    padding: `20px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    height: `63px`,
}));

const Links = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    gap: `20px`,
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

const Link2 = styled("div")(({ theme }) => ({
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

function HourModal(props) {
    const [disableButtonModal, setDisableButtonModal] = useState(true);
    const today = new Date();

    let dateLeft = new Date(today);

    if (props.isOpen) {
        dateLeft = props.projectStart.filter((item) => {
            return item.nombre === props.selectedProjectName;
        })[0].fechaInicio;
    }

    useEffect(() => {
        if (!props.hours || !props.date) {
            setDisableButtonModal(true);
            return;
        }

        if (props.date == "Invalid Date") {
            setDisableButtonModal(true);
            return;
        }

        if (props.hours <= 0 || props.hours > 24) {
            setDisableButtonModal(true);
            return;
        }

        if (props.date > today) {
            setDisableButtonModal(true);
            return;
        }

        if (props.date.toISOString() < dateLeft) {
            setDisableButtonModal(true);
            return;
        }

        setDisableButtonModal(false);
    }, [props.hours, props.date]);
    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <TypeQuest>
                <Content>
                    <Details>
                        <ReporteDeHoras>{`Registro de horas`}</ReporteDeHoras>
                    </Details>
                </Content>
                <Frame3>
                    <Row1>
                        <TextFieldStandard
                            name="hours"
                            value={props.hours}
                            onChange={(e) => props.handleHours(e.target.value)}
                            variant="standard"
                            size="small"
                            label={`Horas`}
                            type="number"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} alignItems="stretch">
                                <DesktopDateTimePicker
                                    label="Fecha de registro"
                                    value={props.date}
                                    onChange={(date) => props.handleDate(date)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            sx={{ width: 336 }}
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Row1>
                </Frame3>
                <Cta>
                    <Links>
                        <Link1 onClick={() => props.setIsOpen(false)}>
                            <Link2
                                sx={{ cursor: "pointer" }}
                            >{`Cancelar`}</Link2>
                        </Link1>
                        <Button
                            variant="contained"
                            size="medium"
                            color="primary"
                            disabled={disableButtonModal}
                            onClick={props.handleSubmit}
                        >
                            {" "}
                            Subir Reporte{" "}
                        </Button>
                    </Links>
                </Cta>
            </TypeQuest>
        </Dialog>
    );
}

export default HourModal;
