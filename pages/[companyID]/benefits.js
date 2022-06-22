import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { prisma } from "/.db";
import styles from "/styles/EmployerBenefits.module.css";
import safeJsonStringify from "safe-json-stringify";
import Sidebar from "../../components/Sidebar";
import BenefitsCard from "../../components/CardBenefits";
import NewBenefitModal from "../../components/ModalBenefits";
import Search from "../../components/Search";
import IconBox from "../../components/IconBox";

export async function getServerSideProps(context) {
    const { companyID } = context.params;

    let benefitsQuery = await prisma.beneficios.findMany({
        where: {
            cedulaJuridica: companyID,
        },
    });
    let projectQuery = await prisma.proyecto.findMany({
        where: {
            cedulaJuridica: companyID,
        },
        select: {
            nombre: true,
            moneda: true,
        },
    });
    const benefitString = JSON.parse(safeJsonStringify(benefitsQuery));
    const proyectString = JSON.parse(safeJsonStringify(projectQuery));

    return {
        props: {
            companyID,
            benefitString,
            proyectString,
        },
    };
}

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

const Benefits = ({ companyID, benefitString, proyectString }) => {
    const projects = proyectString;
    const [modalOpened, setModalOpened] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedProjectName, setSelectedProjectName] = useState("Todos");

    const createBenefitCard = (
        nombreProyecto,
        nombreBeneficio,
        montoPago,
        descripcion
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
                description={descripcion}
            />
        );
    };

    const getBenefits = () => {
        return benefitString.map((benefit) => {
            if (selectedProjectName == "Todos") {
                if (searchText == "") {
                    return createBenefitCard(
                        benefit.nombreProyecto,
                        benefit.nombreBeneficio,
                        benefit.montoPago,
                        benefit.descripcion
                    );
                } else {
                    if (
                        benefit.nombreBeneficio
                            .toLowerCase()
                            .includes(searchText.toLowerCase())
                    ) {
                        return createBenefitCard(
                            benefit.nombreProyecto,
                            benefit.nombreBeneficio,
                            benefit.montoPago,
                            benefit.descripcion
                        );
                    }
                }
            } else {
                if (selectedProjectName == benefit.nombreProyecto) {
                    if (searchText == "") {
                        return createBenefitCard(
                            benefit.nombreProyecto,
                            benefit.nombreBeneficio,
                            benefit.montoPago,
                            benefit.descripcion
                        );
                    } else {
                        if (
                            benefit.nombreBeneficio
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                        ) {
                            return createBenefitCard(
                                benefit.nombreProyecto,
                                benefit.nombreBeneficio,
                                benefit.montoPago,
                                benefit.descripcion
                            );
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

    return (
        <>
            <NewBenefitModal
                isOpen={modalOpened}
                setIsOpen={setModalOpened}
                companyID={companyID}
                projects={projects}
            />
            <Sidebar selected={6} username="Axel Matus" />
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

export default Benefits;
