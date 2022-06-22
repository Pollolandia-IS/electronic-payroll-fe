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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";

const TypeEmpleador = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `8px`,
    display: `flex`,
    flexDirection: `row`,
    width: `483px`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `16px`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
}));

const Right = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `38px`,
    padding: `0px 20px`,
    boxSizing: `border-box`,
    width: `483px`,
    height: `170px`,
});

const Details = styled("div")({
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `11px`,
    padding: `10px 0px`,
    boxSizing: `border-box`,
    height: `90px`,
    width: `250px`,
});

const Frame1 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `188px`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `35px`,
    width: `455px`,
});

const Role = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `nowrap`,
    color: `rgba(0, 0, 0, 0.87)`,
    fontStyle: `normal`,
    fontFamily: `Heebo`,
    fontWeight: `700`,
    fontSize: `24px`,
    letterSpacing: `0px`,
    textDecoration: `none`,
    textTransform: `none`,
    width: `441px`,
    lineHeight: `35px`,
    overflow: `hidden`,
    minHeight: `35px`,
    textOverflow: `ellipsis`,
}));

const Monto = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    padding: `0px`,
    boxSizing: `border-box`,
});

const MontoText = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `150%`,
    textTransform: `none`,
    marginRight: `10px`,
}));

const Valor = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `150%`,
    textTransform: `none`,
}));

const Description = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.6)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `400`,
    fontSize: `16px`,
    letterSpacing: `0.15000000596046448px`,
    textDecoration: `none`,
    lineHeight: `150%`,
    textTransform: `none`,
    height: `46px`,
    width: `448px`,
}));

const Stats = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    height: `30px`,
    width: `455px`,
});

function DeductionsCard(props) {
    return (
        <TypeEmpleador>
            <Right>
                <Details>
                    <Frame1>
                        <Tooltip
                            title={props.name}
                            arrow
                            enterDelay={1000}
                            placement="top-start"
                        >
                            <Role>{props.name}</Role>
                        </Tooltip>
                    </Frame1>
                    <Monto>
                        <MontoText>{`Monto:`}</MontoText>
                        <Valor>{props.amount}</Valor>
                    </Monto>
                    <Description>{props.description}</Description>
                </Details>
                <Stats>
                    <IconButton size="small" color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                            props.setIsOpenRemove(true);
                            props.setSelectedDeduction(props.name);
                        }}
                        disabled={props.selectedProject === "Todos"}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stats>
            </Right>
        </TypeEmpleador>
    );
}

export default DeductionsCard;
