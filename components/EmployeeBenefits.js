import BenefitEmployeeCard from "./BenefitEmployeeCard";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Search from "./Search";
import Sidebar from "./Sidebar";
import styles from "/styles/EmployeeBenefits.module.css";
import { Select, FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldStandard = styled(Select)({
    backgroundColor: `rgba(255, 255, 255, 1)`,
    boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.15)`,
    borderRadius: `7px`,
    display: `flex`,
    flexDirection: `row`,
    width: `343px`,
    height: `50px`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    gap: `24px`,
    padding: `0px`,
    boxSizing: `border-box`,
    overflow: `hidden`,
});

const EmployeeBenefits = ({ props }) => {
    const {
        employeeID,
        companyID,
        projectsString,
        hiredIn,
        employeeName,
        isEmployer,
    } = props;
    const [selectedBenefit, setSelectedBenefit] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectCurrency, setProjectCurrency] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [errorText, setErrorText] = useState("");

    const checkBenefitAmount = () => {
        const currentProject = projectsString.find(
            (project) => project.nombre === projectName
        );
        const maxAmountBenefits = parseInt(
            currentProject.cantidadMaximaBeneficios
        );
        const maxAmountSum = parseInt(currentProject.montoMaximoBeneficio);
        const currentAmountBenefits = selectedBenefits.length;
        const currentAmountSum = 0;
        if (selectedBenefits.length === 0) {
            const benefitToAdd = benefits.find(
                (benefit) => benefit.nombreBeneficio === selectedBenefit
            );
            currentAmountSum += parseInt(benefitToAdd.montoPago);
        } else {
            for (let i = 0; i < selectedBenefits.length; i++) {
                const benefitToAdd = benefits.find(
                    (benefit) =>
                        benefit.nombreBeneficio ===
                        selectedBenefits[i].nombreBeneficio
                );
                currentAmountSum += parseInt(benefitToAdd.montoPago);
            }
            const benefitToAdd = benefits.find(
                (benefit) => benefit.nombreBeneficio === selectedBenefit
            );
            currentAmountSum += parseInt(benefitToAdd.montoPago);
            currentAmountBenefits += 1;
        }
        if (
            currentAmountBenefits < maxAmountBenefits &&
            currentAmountSum <= maxAmountSum
        ) {
            return true;
        } else {
            setIsOpenAdd(false);
            if (currentAmountBenefits > maxAmountBenefits) {
                setErrorText("¡Ups! Límite de beneficios excedido.");
            } else {
                setErrorText("¡Ups! Monto límite de beneficios excedido.");
            }
            setIsOpenError(true);
            return false;
        }
    };

    const addBenefit = async () => {
        if (checkBenefitAmount()) {
            const dataForDB = {
                employeeID: employeeID,
                companyID: companyID,
                projectName: projectName,
                benefitName: selectedBenefit,
            };
            try {
                await fetch(`/api/selectBenefit/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataForDB),
                });
                handleProjectChange({ target: { value: projectName } });
                setIsOpenAdd(false);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const removeBenefit = async () => {
        const dataForDB = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
            benefitName: selectedBenefit,
        };
        try {
            await fetch(`/api/quitBenefit/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataForDB),
            });
            handleProjectChange({ target: { value: projectName } });
            setIsOpenRemove(false);
        } catch (error) {
            console.error(error);
        }
    };

    const createBenefitCard = (benefit) => {
        let found = false;
        for (let i = 0; i < selectedBenefits.length && !found; i++) {
            if (
                selectedBenefits[i].nombreBeneficio === benefit.nombreBeneficio
            ) {
                found = true;
                return (
                    <BenefitEmployeeCard
                        key={benefit.nombreBeneficio}
                        name={benefit.nombreBeneficio}
                        description={benefit.descripcion}
                        amount={benefit.montoPago}
                        selected={true}
                        currency={projectCurrency}
                        setIsOpenAdd={setIsOpenAdd}
                        setIsOpenRemove={setIsOpenRemove}
                        setSelectedBenefit={setSelectedBenefit}
                    />
                );
            }
        }
        if (!found) {
            return (
                <BenefitEmployeeCard
                    key={benefit.nombreBeneficio}
                    name={benefit.nombreBeneficio}
                    description={benefit.descripcion}
                    amount={benefit.montoPago}
                    selected={false}
                    currency={projectCurrency}
                    setIsOpenAdd={setIsOpenAdd}
                    setIsOpenRemove={setIsOpenRemove}
                    setSelectedBenefit={setSelectedBenefit}
                />
            );
        }
    };

    const changeCurrency = (projectName) => {
        const currentProject = projectsString.find(
            (project) => project.nombre === projectName
        );
        setProjectCurrency(currentProject.moneda);
    };

    const parseBenefits = () => {
        return benefits.map((benefit) => {
            if (searchText === "") {
                return createBenefitCard(benefit);
            } else {
                if (
                    benefit.nombreBeneficio
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    benefit.descripcion
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    benefit.montoPago.toString().includes(searchText)
                ) {
                    return createBenefitCard(benefit);
                }
            }
        });
    };

    const getSelectedBenefits = async (projectName) => {
        const reqBody = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
        };
        const selectedBenefits = await (
            await fetch(`/api/acquiredBenefits/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setSelectedBenefits(selectedBenefits);
    };

    const getProjects = () => {
        var found = false;
        return projectsString.map((project) => {
            found = false;
            for (let i = 0; i < hiredIn.length && !found; i++) {
                if (hiredIn[i].nombreProyecto === project.nombre) {
                    found = true;
                    return (
                        <MenuItem key={project.nombre} value={project.nombre}>
                            {project.nombre}
                        </MenuItem>
                    );
                }
            }
        });
    };

    const getBenefits = () => {
        let rows = [];
        let benefits = parseBenefits();
        benefits = benefits.filter((benefit) => benefit != undefined);
        for (let i = 0; i < benefits.length; i += 2) {
            rows.push(
                <div key={i} className={styles.main__row}>
                    {benefits[i]}
                    {benefits[i + 1]}
                </div>
            );
        }
        return rows;
    };

    const handleProjectChange = async (event) => {
        setProjectName(event.target.value);
        const reqBody = {
            companyID: companyID,
            projectName: event.target.value,
        };
        const benefits = await (
            await fetch(`/api/benefit/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setBenefits(benefits);
        getSelectedBenefits(event.target.value);
        changeCurrency(event.target.value);
    };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
        getBenefits();
    };

    return (
        <>
            <ConfirmModal
                isOpen={isOpenAdd}
                setIsOpen={setIsOpenAdd}
                text="Deseas agregar este beneficio?"
                buttonText="Confirmar"
                buttonAction={() => addBenefit()}
            />
            <ConfirmModal
                isOpen={isOpenRemove}
                setIsOpen={setIsOpenRemove}
                text="Deseas renunciar a este beneficio?"
                buttonText="Confirmar"
                buttonAction={() => removeBenefit()}
            />
            <ConfirmModal
                isOpen={isOpenError}
                setIsOpen={setIsOpenError}
                text={errorText}
                buttonText="Aceptar"
                buttonAction={() => setIsOpenError(false)}
            />
            <Sidebar
                selected={6}
                username={employeeName}
                isEmployer={isEmployer}
            />
            <main className={styles.main}>
                <div className={styles.main__header}>
                    <FormControl>
                        <InputLabel sx={{ marginLeft: -2 }}></InputLabel>
                        <TextFieldStandard
                            select
                            value={projectName}
                            onChange={handleProjectChange}
                        >
                            {getProjects()}
                        </TextFieldStandard>
                    </FormControl>
                    <Search
                        handleSearch={handleTextChange}
                        searchText={searchText}
                        placeholder="Buscar beneficio..."
                    />
                </div>
                <div className={styles.main__content}>{getBenefits()}</div>
            </main>
        </>
    );
};

export default EmployeeBenefits;
