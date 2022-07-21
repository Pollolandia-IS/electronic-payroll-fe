import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import { is } from "date-fns/locale";

const ModalCompanyEmployee1 = styled("div")(({ theme }) => ({
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

const Frame1 = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
    alignSelf: `stretch`,
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
    flexGrow: `1`,
    margin: `0px`,
});

const AgregarEmpleado = styled("div")(({ theme }) => ({
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

const TextFieldStandard = styled(TextField)({
    width: `410px`,
    margin: `0px`,
});

const TextFieldStandard1 = styled(TextField)({
    alignSelf: `stretch`,
    margin: `22px 0px 0px 0px`,
});

const TextFieldStandard2 = styled(TextField)({
    alignSelf: `stretch`,
    margin: `22px 0px 0px 0px`,
});

const TempLabel = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `12px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `12px`,
    textTransform: `none`,
    width: `62px`,
    margin: `0px`,
}));

const Teléfono = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `24px`,
    textTransform: `none`,
    alignSelf: `stretch`,
    margin: `4px 0px 0px 0px`,
}));

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
    cursor: `pointer`,
}));

const ButtonOutlined = styled(Button)({
    margin: `0px 0px 0px 30px`,
});

function ModalCompanyEmployee(props) {
    const [sendData, setSendData] = useState(true);

    useEffect(() => {
        if (props.employeeInfo.name === "") {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }
        if (props.employeeInfo.id === "") {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }
        if (props.employeeInfo.phone === "") {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }
        if (props.employeeInfo.email === "") {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }

        if (props.employeeInfo.name.length > 50) {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }

        if (props.employeeInfo.id.length > 12) {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }

        if (props.employeeInfo.phone.length > 10) {
            setSendData(true);
            return;
        } else {
            setSendData(false);
        }

        if (props.employeeInfo.email.length > 0) {
            const re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(props.employeeInfo.email)) {
                setSendData(true);
                return;
            } else {
                setSendData(false);
            }
        }

        if (props.isEditing) {
            if (props.employeeInfoCopy.name === props.employeeInfo.name) {
                setSendData(true);
            } else {
                setSendData(false);
                return;
            }
            if (props.employeeInfoCopy.id === props.employeeInfo.id) {
                setSendData(true);
            } else {
                setSendData(false);
                return;
            }
            if (props.employeeInfoCopy.phone === props.employeeInfo.phone) {
                setSendData(true);
            } else {
                setSendData(false);
                return;
            }
            if (props.employeeInfoCopy.email === props.employeeInfo.email) {
                setSendData(true);
            } else {
                setSendData(false);
                return;
            }
        }
    }, [
        props.employeeInfo.name,
        props.employeeInfo.id,
        props.employeeInfo.phone,
        props.employeeInfo.email,
    ]);

    return (
        <Dialog open={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <ModalCompanyEmployee1>
                <Content>
                    <Frame1>
                        <NameAndTitle>
                            <AgregarEmpleado>
                                {`Agregar Empleado`}
                            </AgregarEmpleado>
                        </NameAndTitle>
                    </Frame1>
                    <Details>
                        <TextFieldStandard
                            variant="standard"
                            size="small"
                            label={`Nombre del empleado`}
                            value={props.employeeInfo.name}
                            onChange={(e) =>
                                props.setEmployeeInfo({
                                    ...props.employeeInfo,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                        <TextFieldStandard1
                            variant="standard"
                            size="small"
                            label={`Cédula`}
                            inputProps={{
                                readOnly: props.isEditing,
                            }}
                            value={props.employeeInfo.id}
                            onChange={(e) =>
                                props.setEmployeeInfo({
                                    ...props.employeeInfo,
                                    id: e.target.value,
                                })
                            }
                            type="number"
                            required
                        />
                        <TextFieldStandard2
                            variant="standard"
                            size="small"
                            label={`Email`}
                            value={props.employeeInfo.email}
                            onChange={(e) =>
                                props.setEmployeeInfo({
                                    ...props.employeeInfo,
                                    email: e.target.value,
                                })
                            }
                            type="email"
                            required
                        />
                        <TextFieldStandard2
                            variant="standard"
                            size="small"
                            label={`Teléfono`}
                            value={props.employeeInfo.phone}
                            onChange={(e) =>
                                props.setEmployeeInfo({
                                    ...props.employeeInfo,
                                    phone: e.target.value,
                                })
                            }
                            type="number"
                            required
                        />
                    </Details>
                </Content>
                <Cta>
                    <Links>
                        <Link1>
                            <Cancelar onClick={() => props.setIsOpen(false)}>
                                {`Cancelar`}
                            </Cancelar>
                        </Link1>
                        <ButtonOutlined
                            variant="outlined"
                            size="large"
                            color="primary"
                            disabled={sendData}
                            onClick={props.handleSubmit}
                        >
                            {`${props.isEditing ? `Editar` : `Agregar`}`}
                        </ButtonOutlined>
                    </Links>
                </Cta>
            </ModalCompanyEmployee1>
        </Dialog>
    );
}

export default ModalCompanyEmployee;
