import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";

const ModalProjectEmployee1 = styled("div")(({ theme }) => ({
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
    padding: `40px 40px 30px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
});

const Frame2 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const Frame1 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const NameAndTitle = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `380px`,
    margin: `0px`,
});

const ContratarEmpleado = styled("div")(({ theme }) => ({
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

const Frame21 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const NameAndTitle1 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `380px`,
    margin: `0px`,
});

const ProyectoAbogados = styled("div")({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(25, 118, 210, 1)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    alignSelf: `stretch`,
    margin: `0px`,
});

const Details = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px 10px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `30px 0px 0px 0px`,
});

const Group1 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `177px`,
    width: `400px`,
    margin: `0px`,
});

const TextFieldStandard = styled(TextField)({
    alignSelf: `stretch`,
    width: `400px`,
    position: `absolute`,
    left: `0px`,
    top: `0px`,
});

const TextFieldStandard1 = styled(TextField)({
    alignSelf: `stretch`,
    width: `400px`,
    position: `absolute`,
    left: `0px`,
    top: `66px`,
});

const TextFieldStandard2 = styled(TextField)({
    alignSelf: `stretch`,
    width: `400px`,
    position: `absolute`,
    left: `0px`,
    top: `132px`,
});

const Frame11 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `53px`,
    width: `410px`,
    margin: `30px 0px 0px 0px`,
});

const TextFieldStandard3 = styled(TextField)({
    width: `185px`,
    margin: `0px`,
});

const TextFieldStandard4 = styled(TextField)({
    width: `185px`,
    margin: `0px 0px 0px 30px`,
});

const Frame22 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `53px`,
    width: `410px`,
    margin: `30px 0px 0px 0px`,
});

const TextFieldStandard5 = styled(TextField)({
    width: `185px`,
    margin: `0px`,
});

const TextFieldStandard6 = styled(TextField)({
    width: `185px`,
    margin: `0px 0px 0px 30px`,
});

const Cta = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(0, 0, 0, 0.04)`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
    padding: `20px 40px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
    margin: `0px`,
}));

const Links = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    width: `420px`,
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
    margin: `0px`,
    cursor: `pointer`,
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
    margin: `0px`,
}));

const ButtonOutlined = styled(Button)({
    margin: `0px 0px 0px 30px`,
});

function ModalProjectEmployee(props) {
  const currencies = [
    {
      value: "Por horas",
      label: "Por horas",
    },
    {
      value: "Tiempo completo",
      label: "Tiempo completo",
    }];

    const [nameError, setNameError] = useState("");
    const [salarioError, setSalarioError] = useState("");
    const [puestoError, setPuestoError] = useState("");
    const [fechaInicioError, setFechaInicioError] = useState("");
    const [fechaFinError, setFechaFinError] = useState("");
    const [tipoEmpleadoError, setTipoEmpleadoError] = useState("");
    const [horasError, setHorasError] = useState("");

    const [openFirst, setOpenFirst] = useState(false);
    
    useEffect(() => {
        if (!props.openDrawer && openFirst) {
            props.setIsOpen(true);
        }
    } , [props.openDrawer]);

    const handleSubmit = (e) => {
        // check if all fields are filled
        if (props.projectNewContract.name === "" || props.projectNewContract.salary === "" || props.projectNewContract.position === "" || props.projectNewContract.startDate === "" || props.projectNewContract.endDate === "" || props.projectNewContract.type === "") {
            if (props.projectNewContract.name === "") {
                setNameError("El nombre es requerido");
            } else {
                setNameError("");
            }
            
            if (props.projectNewContract.salary === "") {
                setSalarioError("El salario es requerido");
            } else {
                setSalarioError("");
            }
            if (props.projectNewContract.position === "") {
                setPuestoError("El puesto es requerido");
            } else {
                setPuestoError("");
            }
            if (props.projectNewContract.startDate === "") {
                console.log("entro vacio");
                setFechaInicioError("red");
            } else {
                setFechaInicioError("");
            }
            
            if (props.projectNewContract.endDate === "") {
                console.log("entro vacio");
                setFechaFinError("red");
            } else {
                setFechaFinError("");
            }
            if (props.projectNewContract.type === "") {
                setTipoEmpleadoError("El tipo de empleado es requerido");
            } else {
                setTipoEmpleadoError("");
            }
            return;
        } else {
            setNameError("");
            setSalarioError("");
            setPuestoError("");
            setFechaInicioError("");
            setFechaFinError("");
            setTipoEmpleadoError("");
            setHorasError("");
        }
        
        if (props.projectNewContract.hours === "" && props.projectNewContract.type === "Por horas") {
            setHorasError("Las horas son requeridas");
            return;
        } else {
            setHorasError("");
        }

        // check if the dates not is undifined
        if (props.projectNewContract.startDate == "Invalid Date" || props.projectNewContract.endDate == "Invalid Date") {
            setFechaInicioError("red");
            setFechaFinError("red");
            return;
        } else {
            setFechaInicioError("");
            setFechaFinError("");
        }

        // check if the dates are valid
        console.log(props.projectNewContract.startDate, props.projectNewContract.endDate);
        if (props.projectNewContract.startDate > props.projectNewContract.endDate) {
            console.log("entro menor");
            setFechaInicioError("red");
            setFechaFinError("red");
            return;
        } else {
            setFechaInicioError("");
            setFechaFinError("");
        }

        // check if the hours are valid
        if (props.projectNewContract.type === "Por horas" && (props.projectNewContract.hours < 0 || props.projectNewContract.hours > 24)) {
            setHorasError("Las horas deben ser entre 0 y 24");
            return;
        } else {
            setHorasError("");
        }

        // check if the salary is valid
        if (props.projectNewContract.salary < 0 || props.projectNewContract.salary > 99999999) {
            setSalarioError("El salario es inválido");
            return;
        } else {
            setSalarioError("");
        }

        // check if the name is valid
        if (props.projectNewContract.name > 50) {
            setNameError("El nombre no puede tener más de 50 caracteres");
            return;
        } else {
            setNameError("");
        }

        // check if the position is valid
        if (props.projectNewContract.position.length > 50) {
            setPuestoError("El puesto no puede tener más de 50 caracteres");
            return;
        }

        // check if the type is diferent from por horas, if it not is por horas, the hours null
        if (props.projectNewContract.type !== "Por horas") {
            props.setProjectNewContract({...props.projectNewContract, hours: null});
        }
        props.submitContract();
    }

    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <ModalProjectEmployee1>
                <Content>
                    <Frame2>
                        <Frame1>
                            <NameAndTitle>
                                <ContratarEmpleado>
                                    {`Contratar Empleado`}
                                </ContratarEmpleado>
                            </NameAndTitle>
                        </Frame1>
                        <Frame21>
                            <NameAndTitle1>
                                <ProyectoAbogados>
                                    {`Proyecto ${props.projectSelected}`}
                                </ProyectoAbogados>
                            </NameAndTitle1>
                        </Frame21>
                    </Frame2>
                    <Details>
                        <Group1>
                            <TextFieldStandard
                                variant="standard"
                                size="small"
                                label={`Nombre`}
                                value={props.projectNewContract.name}
                                onClick={() => {props.setIsOpen(false); props.toggleDrawer(true); setOpenFirst(true);}}
                                helperText={nameError}
                                error={nameError !== ""}
                                required
                            />
                            <TextFieldStandard1
                                variant="standard"
                                size="small"
                                label={`Salario`}
                                type="number"
                                value={props.projectNewContract.salary}
                                onChange={(e) => { props.setProjectNewContract({...props.projectNewContract, salary: e.target.value})}}
                                helperText={salarioError}
                                error={salarioError !== ""}
                                required
                            />
                            <TextFieldStandard2
                                variant="standard"
                                size="small"
                                label={`Puesto`}
                                value={props.projectNewContract.position}
                                onChange={(e) => { props.setProjectNewContract({...props.projectNewContract, position: e.target.value})}}
                                helperText={puestoError}
                                error={puestoError !== ""}
                                required
                            />
                        </Group1>
                        <Frame11>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} alignItems="stretch">
                                <DesktopDateTimePicker
                                    label= "Fecha de inicio *"
                                    value={props.projectNewContract.startDate}
                                    onChange={(date) => { props.setProjectNewContract({...props.projectNewContract, startDate: date})}}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            sx={{ width: 195, label: { color: fechaInicioError } }}
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3} alignItems="stretch">
                                <DesktopDateTimePicker
                                    label="Fecha de finalización *"
                                    value={props.projectNewContract.endDate}
                                    helperText={fechaFinError}
                                    error={fechaFinError !== ""}
                                    onChange={(date) => { props.setProjectNewContract({...props.projectNewContract, endDate: date})}}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            sx={{ width: 195, label:{color: fechaInicioError} }}
                                        />
                                    )}
                                />
                            </Stack>
                        </LocalizationProvider>
                        </Frame11>
                        <Frame22>
                            <TextFieldStandard5
                                variant="standard"
                                size="small"
                                label={`Tipo de Empleado`}
                                select
                                required
                                value={props.projectNewContract.type}
                                helperText={tipoEmpleadoError}
                                error={tipoEmpleadoError !== ""}
                                onChange={(e) => props.setProjectNewContract({ ...props.projectNewContract, type: e.target.value })}
                            > 
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextFieldStandard5>
                            {
                                props.projectNewContract.type === "Por horas" ? (
                                  <TextFieldStandard6
                                    variant="standard"
                                    size="small"
                                    label={`Horas Semanales`}
                                    type="number"
                                    required
                                    value={props.projectNewContract.hours}
                                    helperText={horasError}
                                    error={horasError !== ""}
                                    onChange={(e) => props.setProjectNewContract({ ...props.projectNewContract, hours: e.target.value })}
                                  />
                                ) : ( <div /> )
                            }
                        </Frame22>
                    </Details>
                </Content>
                <Cta>
                    <Links>
                        <Link1>
                            <Cancelar onClick={() => props.setIsOpen(false)}>{`Cancelar`}</Cancelar>
                        </Link1>
                        <ButtonOutlined
                            variant="outlined"
                            size="large"
                            color="primary"
                            onClick={() => { handleSubmit(); }}
                        >
                            {" "}
                            Agregar{" "}
                        </ButtonOutlined>
                    </Links>
                </Cta>
            </ModalProjectEmployee1>
        </Dialog>
    );
}

export default ModalProjectEmployee;
