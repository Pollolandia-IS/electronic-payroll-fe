import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import styles from "/styles/EmployerBenefits.module.css";
import Sidebar from "./Sidebar";
import BenefitsCard from "./CardBenefits";
import NewBenefitModal from "./ModalBenefits";
import Search from "./Search";
import IconBox from "./IconBox";
import DeleteModal from "./DeleteModal";
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

const EmployerBenefits = ({ props }) => {
    const { companyID, benefitString, proyectString, name, isEmployer } = props;
    const projects = proyectString;
    const [modalOpened, setModalOpened] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("Todos");
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [selectedBenefit, setSelectedBenefit] = useState("");

    const createBenefitCard = (
        nombreProyecto,
        nombreBeneficio,
        montoPago,
        descripcion,
        currency
    ) => {
        return (
            <BenefitsCard
                key={nombreBeneficio}
                projects={proyectString}
                benefits={benefitString}
                companyID={companyID}
                projectName={nombreProyecto}
                name={nombreBeneficio}
                amount={montoPago}
                currency={currency}
                description={descripcion}
                setIsOpen={setIsOpenRemove}
                setSelected={setSelectedBenefit}
                selectedProjectName={selectedProjectName}
            />
        );
    };

    const getBenefitCurrency = (projectName) => {
        const project = proyectString.find((project) => project.nombre === projectName);
        return project.moneda;
    }

    const getBenefits = () => {
        return benefitString.map((benefit) => {
            if ( benefit.habilitado) {
            if (selectedProjectName == "Todos") {
                if (searchText == "") {
                    let benefitCurrency = getBenefitCurrency(benefit.nombreProyecto);
                    return createBenefitCard(
                        benefit.nombreProyecto,
                        benefit.nombreBeneficio,
                        benefit.montoPago,
                        benefit.descripcion,
                        benefitCurrency
                    );
                } else {
                    if (
                        benefit.nombreBeneficio
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                    ) {
                        let benefitCurrency = getBenefitCurrency(benefit.nombreProyecto);
                        return createBenefitCard(
                            benefit.nombreProyecto,
                            benefit.nombreBeneficio,
                            benefit.montoPago,
                            benefit.descripcion,
                            benefitCurrency
                        );
                    }
                }
            } else {
                if (selectedProjectName == benefit.nombreProyecto) {
                    if (searchText == "") {
                        let benefitCurrency = getBenefitCurrency(benefit.nombreProyecto);
                        return createBenefitCard(
                            benefit.nombreProyecto,
                            benefit.nombreBeneficio,
                            benefit.montoPago,
                            benefit.descripcion,
                            benefitCurrency
                        );
                    } else {
                        if (
                            benefit.nombreBeneficio
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        ) {
                            let benefitCurrency = getBenefitCurrency(benefit.nombreProyecto);
                            return createBenefitCard(
                                benefit.nombreProyecto,
                                benefit.nombreBeneficio,
                                benefit.montoPago,
                                benefit.descripcion,
                                benefitCurrency
                            );
                        }
                    }
                }
            }
        }
        });
    };

    const getRows = () => {
        let rows = [];
        let benefits = getBenefits();
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

    const handleChangeProject = (e) => {
        setSelectedProjectName(e.target.value);
        getRows();
    };

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        getRows();
    };

    const deleteBenefit = async () => {
        if(selectedProjectName !== "Todos"){
            const dataForDB = {
                companyID: companyID,
                projectName: selectedProjectName,
                benefitName: selectedBenefit,
            };
            console.log(selectedBenefit);
            try {
                await fetch(`/api/employerDeleteBenefit/`, {
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
    }

    return (
        <>
            <DeleteModal
                isOpen={isOpenRemove}
                setIsOpen={setIsOpenRemove}
                title="Eliminar Beneficio"
                message="Deseas eliminar este beneficio?"
                buttonText="Eliminar"
                buttonAction={() => deleteBenefit()}
            />
            <NewBenefitModal
                isOpen={modalOpened}
                setIsOpen={setModalOpened}
                companyID={companyID}
                projects={projects}
            />
            <Sidebar selected={6} username={name} isEmployer={isEmployer} />
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
                        placeholder="Buscar beneficio..."
                    />
                    <IconBox action={() => setModalOpened(true)}>
                        <AddIcon fontSize="large" />
                    </IconBox>
                </div>
                <div className={styles.main__content}>{getRows()}</div>
            </main>
        </>
    );
};

export default EmployerBenefits;
