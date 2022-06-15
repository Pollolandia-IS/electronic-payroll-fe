import BenefitEmployeeCard from "../../../components/BenefitEmployeeCard";
import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
import Sidebar from "../../../components/Sidebar";
import styles from "/styles/Projects.module.css";
import { prisma } from "/.db";
import { TextField, Dialog, Select, FormControl, InputLabel, Button, MenuItem, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Router from "next/router";
import safeJsonStringify from 'safe-json-stringify';

const TextFieldStandard1 = styled(Select)({
    width: `185px`,
});

export async function getServerSideProps(context) {
    const { companyID, employeeID } = context.params;

    let projects = await prisma.proyecto.findMany({
        where: {
            cedulaJuridica: companyID
        },
        select: {
            nombre: true,
        }
    });
    return {
        props: {
            employeeID,
            companyID,
            projects
        },
    };
}

const EmployeeBenefits = ({ employeeID, companyID, projects }) => {
    const [selectedBenefit, setSelectedBenefit] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [isHired, setIsHired] = useState(false);

    const addBenefit = async () => {
        const dataForDB = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
            benefitName: selectedBenefit,
        };
        try {
            await fetch (`/api/selectBenefit/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataForDB),
            });
            handleProjectChange({target: {value: projectName}});
            setIsOpenAdd(false);
        } catch (error) {
            console.error(error);
        }
    }
    const removeBenefit = async () => {
        const dataForDB = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
            benefitName: selectedBenefit,
        };
        try {
            await fetch (`/api/quitBenefit/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dataForDB),
            });
            handleProjectChange({target: {value: projectName}});
            setIsOpenRemove(false);
        } catch (error) {
            console.error(error);
        }
    }

    const parseBenefits = () => {
        const found = false;
        return benefits.map(benefit => {
            found = false;
            for(let i = 0; i < selectedBenefits.length && !found; i++) {
                if(selectedBenefits[i].nombreBeneficio === benefit.nombreBeneficio) {
                    found = true;
                    return <BenefitEmployeeCard key={benefit.nombreBeneficio} name={benefit.nombreBeneficio} 
                        description={benefit.descripcion} amount={benefit.montoPago} selected={true} 
                            setIsOpenAdd={setIsOpenAdd} setIsOpenRemove={setIsOpenRemove} setSelectedBenefit={setSelectedBenefit}/>
                }
            }
            if(!found) {
                return <BenefitEmployeeCard key={benefit.nombreBeneficio} name={benefit.nombreBeneficio}
                    description={benefit.descripcion} amount={benefit.montoPago} selected={false}
                        setIsOpenAdd={setIsOpenAdd} setIsOpenRemove={setIsOpenRemove} setSelectedBenefit={setSelectedBenefit}/>
            }
        })
    }

    const getSelectedBenefits = async (projectName) => {
        const reqBody = {
            employeeID: employeeID,
            companyID: companyID,
            projectName: projectName,
        }
        const selectedBenefits = await (await fetch(`/api/acquiredBenefits/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })).json();
        setSelectedBenefits(selectedBenefits);
    }

    const checkIsHired = async (projectName) => {
        if(projectName !== "") {
            const reqBody = {
                companyID: companyID,
                projectName: projectName,
                employeeID: employeeID,
            }
            const isHired = await (await fetch(`/api/isHired/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })).json();
            if(isHired.length !== 0) {
                setIsHired(true);
            } else {
                setIsHired(false);
            }
        }
    }

    const getBenefits = () => {
        let rows = [];
        if(isHired) {
            const benefits = parseBenefits();
            for (let i = 0; i < benefits.length; i += 2) {
                rows.push(
                    <div key={i} className={styles.main__row}>
                        {benefits[i]}
                        {benefits[i + 1]}
                    </div>
                );
            }
        }
        return rows;
    }

    const handleProjectChange = async (event) => {
        setProjectName(event.target.value);
        const reqBody = {
            companyID: companyID,
            projectName: event.target.value
        }
        const benefits = await (await fetch(`/api/benefit/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        })).json();
        setBenefits(benefits);
        checkIsHired(event.target.value);
        getSelectedBenefits(event.target.value);
    }

    return (
        <>
            <ConfirmModal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} text="Deseas agregar este beneficio?"
                buttonText="Confirmar" buttonAction={() => addBenefit()} />
            <ConfirmModal isOpen={isOpenRemove} setIsOpen={setIsOpenRemove} text="Deseas renunciar a este beneficio?"
                buttonText="Confirmar" buttonAction={() => removeBenefit()} />
            <Sidebar selected={6} username="Obtener de la DB" />
            <main className={styles.main}>
                <div className={styles.main__header}>
                    <FormControl>
                        <InputLabel sx={{ marginLeft: -2 }}></InputLabel>
                        <TextFieldStandard1 select value={projectName} onChange={handleProjectChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {projects.map(project => (
                                <MenuItem key={project.nombre} value={project.nombre}>
                                    {project.nombre}
                                </MenuItem>
                            ))}
                        </TextFieldStandard1>
                    </FormControl>
                    <Search placeholder="Buscar beneficio..." />
                </div>
                <div className={styles.main__content}>    
                    {getBenefits()}
                </div>
            </main>
        </>
    )
}

export default EmployeeBenefits;
