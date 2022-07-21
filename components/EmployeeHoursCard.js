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

import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { left } from "@popperjs/core";

const EmployeeHours1 = styled("div")({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 3px 6px rgba(0, 0, 0, 0.15)`,
    borderRadius: `25px`,
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `column`,
    width: `360px`,
    alignItems: `flex-start`,
    padding: `12px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
    margin: `15px 0px 0px 0px`,
});

const Row = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px`,
});

const CheckCircleOutline = styled(CheckCircleOutlineIcon)(({ theme }) => ({
    width: `37px`,
    height: `37px`,
    marginLeft: `10px`,
}));

const PendingActionsOutlined = styled(PendingActionsOutlinedIcon)(
    ({ theme }) => ({
        width: `37px`,
        height: `37px`,
        marginLeft: `10px`,
    })
);

const Left = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    padding: `0px`,
    boxSizing: `border-box`,
    margin: `0px 0px 0px 30px`,
});

const Stats = styled("div")({
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

const NombreApellido = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.87)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `900`,
    fontSize: `20px`,
    letterSpacing: `0.2px`,
    textDecoration: `none`,
    textTransform: `none`,
    margin: `0px`,
}));

const Top = styled("div")({
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

const SinRegistrosPendient = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `400`,
    fontSize: `14px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    margin: `0px`,
    width: `200px`,
}));

const RightSide = styled("div")({
    display: `flex`,
    position: `relative`,
    isolation: `isolate`,
    flexDirection: `row`,
    justifyContent: `right`,
    justifySelf: `flex-end`,
    alignItems: `flex-end`,
    padding: `0px 0px 0px 0px`,
    boxSizing: `border-box`,
    margin: `0px 0px 0px 25px`,
});

const Arrow = styled("img")({
    height: `14px`,
    width: `7px`,
    margin: `0px`,
});

function EmployeeHoursCard(props) {
    return (
        <EmployeeHours1>
            <Row>
                {props.pending ? (
                    <PendingActionsOutlined color="warning" />
                ) : (
                    <CheckCircleOutline color="success" />
                )}
                <Left>
                    <Stats>
                        <NombreApellido>{props.name}</NombreApellido>
                        <Top>
                            <SinRegistrosPendient>
                                {props.pending
                                    ? "Registros Pendientes"
                                    : "Sin Registros Pendientes"}
                            </SinRegistrosPendient>
                        </Top>
                    </Stats>
                </Left>
                <Tooltip
                    title="Ver Registros"
                    arrow
                    enterDelay={1069}
                    placement="top-start"
                >
                    <RightSide>
                        <IconButton
                            onClick={() => {
                                props.setSelectedEmployee(props.name);
                                props.setSelectedId(props.id);
                            }}
                        >
                            <Arrow src="/assets/img/Arrow.png" alt={"Arrow"} />
                        </IconButton>
                    </RightSide>
                </Tooltip>
            </Row>
        </EmployeeHours1>
    );
}

export default EmployeeHoursCard;