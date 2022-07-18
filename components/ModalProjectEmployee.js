import { TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

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
    justifyContent: `flex-start`,
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
                            />
                            <TextFieldStandard1
                                variant="standard"
                                size="small"
                                label={`Salario`}
                            />
                            <TextFieldStandard2
                                variant="standard"
                                size="small"
                                label={`Puesto`}
                            />
                        </Group1>
                        <Frame11>
                            <TextFieldStandard3
                                variant="standard"
                                size="small"
                                label={`Tipo de Empleado`}
                            />
                            <TextFieldStandard4
                                variant="standard"
                                size="small"
                                label={`Horas Semanales`}
                            />
                        </Frame11>
                        <Frame22>
                            <TextFieldStandard5
                                variant="standard"
                                size="small"
                                label={`Tipo de Empleado`}
                            />
                            <TextFieldStandard6
                                variant="standard"
                                size="small"
                                label={`Horas Semanales`}
                            />
                        </Frame22>
                    </Details>
                </Content>
                <Cta>
                    <Links>
                        <Link1>
                            <Cancelar>{`Cancelar`}</Cancelar>
                        </Link1>
                        <ButtonOutlined
                            variant="outlined"
                            size="large"
                            color="primary"
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
