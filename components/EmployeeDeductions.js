import DeductionEmployeeCard from "./DeductionEmployeeCard";
import AddDeductionModal from "./AddDeductionModal";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import Search from "./Search";
import Sidebar from "./Sidebar";
import styles from "/styles/EmployeeDeductions.module.css";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
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

const EmployeeDeductions = ({ props }) => {
    const {
        employeeID,
        companyID,
        projectsString,
        hiredIn,
        employeeName,
        isEmployer,
    } = props;
    const [selectedDeduction, setSelectedDeduction] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [projectCurrency, setProjectCurrency] = useState("");
    const [deductions, setDeductions] = useState([]);
    const [selectedDeductions, setSelectedDeductions] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [errorText, setErrorText] = useState("");
    const [amountChosen, setAmountChosen] = useState(0);
    const [currency, setCurrency] = useState("");
    const [defaultAmount, setDefaultAmount] = useState(0);
    //TODO: Fix styling

    const checkDeductionAmount = () => {
        let currentAmountSum = 0;
        let maxAmountSum = 0;
        for (let i = 0; i < hiredIn.length; i++) {
            if (hiredIn[i].nombreProyecto === projectName) {
                maxAmountSum += hiredIn[i].montoPago;
            }
        }
        if (selectedDeductions.length === 0) {
            if (amountChosen !== 0) {
                currentAmountSum += parseInt(amountChosen);
            } else {
                currentAmountSum += defaultAmount;
            }
        } else {
            for (let i = 0; i < selectedDeductions.length; i++) {
                currentAmountSum += parseInt(selectedDeductions[i].aporte);
            }
            if (amountChosen !== 0) {
                currentAmountSum += parseInt(amountChosen);
            } else {
                currentAmountSum += defaultAmount;
            }
            console.log(currentAmountSum);
        }
        if (currentAmountSum <= maxAmountSum) {
            return true;
        } else {
            setIsOpenAdd(false);
            setErrorText("¡Ups! No puedes aportar más que tu sueldo.");
            setIsOpenError(true);
            return false;
        }
    };

    const addDeduction = async () => {
        if (checkDeductionAmount()) {
            const dataForDB = {
                employeeID: employeeID,
                companyID: companyID,
                projectName: projectName,
                deductionName: selectedDeduction,
                amount: parseInt(amountChosen),
            };
            try {
                await fetch(`/api/addVoluntaryDeduction/`, {
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

    const removeDeduction = async () => {
        const dataForDB = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
            deductionName: selectedDeduction,
        };
        try {
            await fetch(`/api/quitVoluntaryDeduction/`, {
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

    const createDeductionCard = (deduction) => {
        let found = false;
        for (let i = 0; i < selectedDeductions.length && !found; i++) {
            if (
                selectedDeductions[i].nombreDeduccion ===
                deduction.nombreDeduccion
            ) {
                found = true;
                return (
                    <DeductionEmployeeCard
                        key={deduction.nombreDeduccion}
                        name={deduction.nombreDeduccion}
                        setDefaultAmount={setDefaultAmount}
                        description={deduction.descripcion}
                        amount={selectedDeductions[i].aporte}
                        selected={true}
                        currency={projectCurrency}
                        setAmountChosen={setAmountChosen}
                        setIsOpenAdd={setIsOpenAdd}
                        setIsOpenRemove={setIsOpenRemove}
                        setSelectedDeduction={setSelectedDeduction}
                    />
                );
            }
        }
        if (!found) {
            return (
                <DeductionEmployeeCard
                    key={deduction.nombreDeduccion}
                    name={deduction.nombreDeduccion}
                    setDefaultAmount={setDefaultAmount}
                    description={deduction.descripcion}
                    amount={deduction.monto}
                    selected={false}
                    currency={projectCurrency}
                    setAmountChosen={setAmountChosen}
                    setIsOpenAdd={setIsOpenAdd}
                    setIsOpenRemove={setIsOpenRemove}
                    setSelectedDeduction={setSelectedDeduction}
                />
            );
        }
    };

    const parseDeductions = () => {
        return deductions.map((deduction) => {
            if (searchText === "") {
                return createDeductionCard(deduction);
            } else {
                if (
                    deduction.nombreDeduccion
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    deduction.descripcion
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    deduction.monto.toString().includes(searchText)
                ) {
                    return createDeductionCard(deduction);
                }
            }
        });
    };

    const getSelectedDeductions = async (projectName) => {
        const reqBody = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
        };
        const selectedDeductions = await (
            await fetch(`/api/getAcquiredDeductions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        setSelectedDeductions(selectedDeductions);
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

    const getDeductions = () => {
        let rows = [];
        let deductions = parseDeductions();
        deductions = deductions.filter(
            (deduction) => deduction != undefined
        );
        for (let i = 0; i < deductions.length; i += 2) {
            rows.push(
                <div key={i} className={styles.main__row}>
                    {deductions[i]}
                    {deductions[i + 1]}
                </div>
            );
        }
        return rows;
    };

    const changeCurrency = (projectName) => {
        const currentProject = projectsString.find(
            (project) => project.nombre === projectName
        );
        setProjectCurrency(currentProject.moneda);
    };

    const handleProjectChange = async (event) => {
        setProjectName(event.target.value);
        const reqBody = {
            companyID: companyID,
            projectName: event.target.value,
        };
        const deductions = await (
            await fetch(`/api/getDeductions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reqBody),
            })
        ).json();
        const currentProject = projectsString.find(
            (project) => project.nombre === event.target.value
        );
        setCurrency(currentProject.moneda);
        setDeductions(deductions);
        getSelectedDeductions(event.target.value);
        changeCurrency(event.target.value);
    };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
        getDeductions();
    };

    return (
        <>
            <AddDeductionModal
                isOpen={isOpenAdd}
                setIsOpen={setIsOpenAdd}
                amountChosen={amountChosen}
                setAmountChosen={setAmountChosen}
                currency={currency}
                deductionName={selectedDeduction}
                defaultAmount={defaultAmount}
                buttonAction={() => addDeduction()}
                buttonText="Confirmar"
            />
            <ConfirmModal
                isOpen={isOpenRemove}
                setIsOpen={setIsOpenRemove}
                text="Deseas renunciar a esta deducción?"
                buttonText="Confirmar"
                buttonAction={() => removeDeduction()}
            />
            <ConfirmModal
                isOpen={isOpenError}
                setIsOpen={setIsOpenError}
                text={errorText}
                buttonText="Aceptar"
                buttonAction={() => setIsOpenError(false)}
            />
            <Sidebar
                selected={5}
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
                        placeholder="Buscar deducción..."
                    />
                </div>
                <div className={styles.main__content}>{getDeductions()}</div>
            </main>
        </>
    );
};

export default EmployeeDeductions;
