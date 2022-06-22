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
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import EditProjectModal from "../components/EditProjectModal";

const TypeGeneral = styled("div")(({ theme }) => ({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 3px 5px rgba(0, 0, 0, 0.2)`,
    borderRadius: `8px`,
    display: `flex`,
    flexDirection: `row`,
    width: `483px`,
    height: `170px`,
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
    padding: `10px 0px`,
    boxSizing: `border-box`,
    height: `90px`,
    width: `441px`,
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

const Frame2 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `10px`,
    padding: `0px`,
    boxSizing: `border-box`,
});

const Date = styled("div")(({ theme }) => ({
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

const DateValue = styled("div")(({ theme }) => ({
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

const Frame1 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `flex-start`,
    gap: `10px`,
    padding: `0px`,
    boxSizing: `border-box`,
});

const Frequency = styled("div")(({ theme }) => ({
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

const FrequencyValue = styled("div")(({ theme }) => ({
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

const Stats = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `5px`,
    padding: `0px`,
    boxSizing: `border-box`,
    height: `30px`,
    width: `455px`,
});

const Frame11 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `5px`,
    padding: `0px`,
    boxSizing: `border-box`,
});

const EmployeeCount = styled("div")(({ theme }) => ({
    textAlign: `left`,
    whiteSpace: `pre-wrap`,
    color: `rgba(0, 0, 0, 0.87)`,
    fontStyle: `normal`,
    fontFamily: `Roboto`,
    fontWeight: `500`,
    fontSize: `14px`,
    letterSpacing: `0.10000000149011612px`,
    textDecoration: `none`,
    lineHeight: `157.00000524520874%`,
    textTransform: `none`,
}));

const Frame4 = styled("div")({
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-end`,
    alignItems: `center`,
    gap: `5px`,
    alignSelf: `stretch`,
    width: `348px`,
});

function ProjectCard(props) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    return (
        <>
            <EditProjectModal
                isOpen={editModalIsOpen}
                setIsOpen={setEditModalIsOpen}
                projects={props.projects}
                companyID={props.companyID}
                name={props.name}
                maxBen={props.maxBen}
                maxAmountBen={props.maxAmountBen}
                currency={props.currency}
                frequency={props.frequency}
                date={props.date}
                employeeCount={props.employeeCount}
            />
            <TypeGeneral>
                <Right>
                    <Details>
                        <Tooltip
                            title={props.name}
                            arrow
                            enterDelay={1500}
                            placement="top-start"
                        >
                            <Role>{props.name}</Role>
                        </Tooltip>
                        <Frame2>
                            <Date>{`Fecha de inicio:`}</Date>
                            <DateValue>{props.date}</DateValue>
                        </Frame2>
                        <Frame1>
                            <Frequency>{`Frecuencia: `}</Frequency>
                            <FrequencyValue>{props.frequency}</FrequencyValue>
                        </Frame1>
                    </Details>
                    <Stats>
                        <Frame11>
                            <AccountCircleOutlinedIcon color="primary" />
                            <EmployeeCount>{props.employeeCount}</EmployeeCount>
                        </Frame11>
                        <Frame4></Frame4>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() => setEditModalIsOpen(true)}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Stats>
                </Right>
            </TypeGeneral>
        </>
    );
}

export default ProjectCard;
