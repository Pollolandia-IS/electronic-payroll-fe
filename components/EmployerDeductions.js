import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import styles from "/styles/EmployerDeductions.module.css";
import Sidebar from "./Sidebar";
import DeductionsCard from "./DeductionsCard";
import NewDeductionModal from "./NewDeductionModal";
import Search from "./Search";
import IconBox from "./IconBox";
import DeleteModal from "../components/DeleteModal";
import Router from "next/router";

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

const Deductions = ({ props }) => {
    const { companyID, deductionString, proyectString, name, isEmployer } =
        props;
    const projects = proyectString;
    const [modalOpened, setModalOpened] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("Todos");
    const [selectedDeduction, setSelectedDeduction] = useState("");
    const [isOpenRemove, setIsOpenRemove] = useState(false);

    const createDeductionCard = (
        nombreDeduccion,
        monto,
        nombreProyecto,
        descripcion,
        currency
    ) => {
        return (
            <DeductionsCard
                key={nombreDeduccion}
                name={nombreDeduccion}
                amount={monto}
                currency={currency}
                description={descripcion}
                setIsOpenRemove={setIsOpenRemove}
                setSelectedDeduction={setSelectedDeduction}
                selectedProject={selectedProjectName}
                companyID={companyID}
                projects={projects}
                projectName={nombreProyecto}
            />
        );
    };

    const getDeductionCurrency = (projectName) => {
        const project = proyectString.find((project) => project.nombre === projectName);
        return project.moneda;
    }

    const getDeductions = () => {
        if (selectedProjectName == "Todos") {
            return deductionString.map((deduction) => {
                if (deduction.habilitado) {
                    if (searchText == "") {
                        let deductionCurrency = getDeductionCurrency(deduction.nombreProyecto);
                        return createDeductionCard(
                            deduction.nombreDeduccion,
                            deduction.monto,
                            deduction.nombreProyecto,
                            deduction.descripcion,
                            deductionCurrency
                        );
                    } else {
                        if (
                            deduction.nombreDeduccion
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        ) {
                            let deductionCurrency = getDeductionCurrency(deduction.nombreProyecto);
                            return createDeductionCard(
                                deduction.nombreDeduccion,
                                deduction.monto,
                                deduction.nombreProyecto,
                                deduction.descripcion,
                                deductionCurrency
                            );
                        }
                    }
                }
            });
        } else {
            return deductionString.map((deduction) => {
                if (deduction.habilitado) {
                    if (selectedProjectName == deduction.nombreProyecto) {
                        if (searchText == "") {
                            let deductionCurrency = getDeductionCurrency(deduction.nombreProyecto);
                            return createDeductionCard(
                                deduction.nombreDeduccion,
                                deduction.monto,
                                deduction.nombreProyecto,
                                deduction.descripcion,
                                deductionCurrency
                            );
                        } else {
                            if (
                                deduction.nombreDeduccion
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                            ) {
                                let deductionCurrency = getDeductionCurrency(deduction.nombreProyecto);
                                return createDeductionCard(
                                    deduction.nombreDeduccion,
                                    deduction.monto,
                                    deduction.nombreProyecto,
                                    deduction.descripcion,
                                    deductionCurrency
                                );
                            }
                        }
                    }
                }
            });
        }
    };

    const getRows = () => {
        let rows = [];
        let deductions = getDeductions();
        deductions = deductions.filter((deduction) => deduction != undefined);
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

    const handleChangeProject = (event) => {
        setSelectedProjectName(event.target.value);
        getRows();
    };

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
        getRows();
    };

    const deleteDeduction = async () => {
        if (selectedProjectName !== "Todos") {
            const dataForDB = {
                companyID: companyID,
                projectName: selectedProjectName,
                deductionName: selectedDeduction,
            };
            try {
                await fetch(`/api/deleteDeduction/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataForDB),
                });
                Router.reload();
                setIsOpenRemove(false);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <DeleteModal
                title="Eliminar deducción"
                message="¿Deseas eliminar esta deducción?"
                buttonText="Eliminar"
                setIsOpen={setIsOpenRemove}
                isOpen={isOpenRemove}
                buttonAction={() => deleteDeduction()}
            />
            <NewDeductionModal
                isOpen={modalOpened}
                setIsOpen={setModalOpened}
                companyID={companyID}
                projects={projects}
            />
            <Sidebar selected={5} username={name} isEmployer={isEmployer} />
            <main className={styles.main}>
                <div className={styles.main__header}>
                    <FormControl>
                        <InputLabel id="select-label"></InputLabel>
                        <TextFieldStandard
                            id="projectName"
                            value={selectedProjectName}
                            size="medium"
                            onChange={handleChangeProject}
                        >
                            <MenuItem key={""} value={"Todos"}>
                                {" "}
                                Todos los Proyectos{" "}
                            </MenuItem>
                            {projects.map((project) => (
                                <MenuItem
                                    key={project.nombre}
                                    value={project.nombre}
                                >
                                    {" "}
                                    {project.nombre}{" "}
                                </MenuItem>
                            ))}
                        </TextFieldStandard>
                    </FormControl>
                    <Search
                        handleSearch={handleTextChange}
                        searchText={searchText}
                        placeholder="Buscar deducción..."
                    />
                    <IconBox action={() => setModalOpened(true)}>
                        <AddIcon fontSize="large" />
                    </IconBox>
                </div>
                {getRows().length !== 0 ? (
                    <div className={styles.main__content}>{getRows()}</div>
                ) : (
                    <div className={styles.main__noDeductions}>
                        {selectedProjectName === "Todos"
                            ? <>
                            <img className={styles.imgNoDeductionsTotal} src="assets/img/404.png"></img> 
                            <div className={styles.noDeductionsTotalTitle}> Aún no hay deducciones creadas</div>
                            </>
                            : <> 
                            <img className={styles.imgNoDeductionsTotal} src="assets/img/404.png"></img> 
                            <div className={styles.noDeductionsTotalTitle}> Aún no hay deducciones creadas para este proyecto </div>
                            </> }
                        <p className={styles.noDeductionsTotal}>
                            {" "}

                            Agrega una deducción con el botón +
                        </p>
                    </div>
                )}
            </main>
        </>
    );
};

export default Deductions;
