import BenefitEmployeeCard from "../../../components/BenefitEmployeeCard";
import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";
import Search from "../../../components/Search";
import Sidebar from "../../../components/Sidebar";
import styles from "/styles/Projects.module.css";
import { prisma } from "/.db";
import { TextField, Dialog, Select, FormControl, InputLabel, Button, MenuItem, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
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
            cantidadMaximaBeneficios: true,
            montoMaximoBeneficio: true,
        }
    });
    const hired = await prisma.esContratado.findMany({
        where: {
            cedulaJuridica: companyID,
            cedulaEmpleado: employeeID,
        }
    });
    const employee = await prisma.persona.findMany({
        where: {
            cedula: employeeID,
        }, select: {
            nombre: true,
        },
    });
    const hiredIn = JSON.parse(safeJsonStringify(hired));
    const projectsString = JSON.parse(safeJsonStringify(projects));
    const employeeName = JSON.parse(safeJsonStringify(employee));
    return {
        props: {
            employeeID,
            companyID,
            projectsString,
            hiredIn,
            employeeName,
        },
    };
}

const EmployeeBenefits = ({ employeeID, companyID, projectsString, hiredIn, employeeName }) => {
    const [selectedBenefit, setSelectedBenefit] = useState("");
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenRemove, setIsOpenRemove] = useState(false);
    const [isOpenError, setIsOpenError] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [errorText, setErrorText] = useState("");

    const checkBenefitAmount = () => {
        const currentProject = projectsString.find(project => project.nombre === projectName);
        const maxAmountBenefits = parseInt(currentProject.cantidadMaximaBeneficios);
        const maxAmountSum = parseInt(currentProject.montoMaximoBeneficio);
        const currentAmountBenefits = selectedBenefits.length;
        const currentAmountSum = 0;
        if(selectedBenefits.length === 0){
            const benefitToAdd = benefits.find(benefit => benefit.nombreBeneficio === selectedBenefit);
            currentAmountSum += parseInt(benefitToAdd.montoPago);
        } else {
            for(let i = 0; i < selectedBenefits.length; i++) {  
                const benefitToAdd = benefits.find(benefit => benefit.nombreBeneficio 
                    === selectedBenefits[i].nombreBeneficio);
                currentAmountSum += parseInt(benefitToAdd.montoPago);
            }
        }
        if (currentAmountBenefits < maxAmountBenefits && currentAmountSum < maxAmountSum) {
            return true;
        } else {
            setIsOpenAdd(false);
            if(currentAmountBenefits > maxAmountBenefits){
                setErrorText("¡Ups! Límite de beneficios excedido.");
            } else {
                setErrorText("¡Ups! Monto límite de beneficios excedido.");
            }
            setIsOpenError(true);
            return false;
        }
    }

    const addBenefit = async () => {
        if(checkBenefitAmount()){
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
            if(searchText === ""){
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
            } else {
                if(benefit.nombreBeneficio.toLowerCase().includes(searchText.toLowerCase()) 
                    || benefit.descripcion.toLowerCase().includes(searchText.toLowerCase()) 
                        || benefit.montoPago.toString().includes(searchText)){
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
                }
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

    const getProjects = () => {
        var found = false;
        return projectsString.map(project => {
            found = false;
            for(let i = 0; i < hiredIn.length && !found; i++) {
                if(hiredIn[i].nombreProyecto === project.nombre) {
                    found = true;
                    return <MenuItem key={project.nombre} value={project.nombre}>{project.nombre}</MenuItem>
                }
            }
        })
    }

    const getBenefits = () => {
        let rows = [];
        let benefits = parseBenefits();
        benefits = benefits.filter(benefit => benefit != undefined);
        for (let i = 0; i < benefits.length; i += 2) {
            rows.push(
                <div key={i} className={styles.main__row}>
                    {benefits[i]}
                    {benefits[i + 1]}
                </div>
            );
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
        getSelectedBenefits(event.target.value);
    }

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
        getBenefits();
    };

    return (
        <>
            <ConfirmModal isOpen={isOpenAdd} setIsOpen={setIsOpenAdd} text="Deseas agregar este beneficio?"
                buttonText="Confirmar" buttonAction={() => addBenefit()} />
            <ConfirmModal isOpen={isOpenRemove} setIsOpen={setIsOpenRemove} text="Deseas renunciar a este beneficio?"
                buttonText="Confirmar" buttonAction={() => removeBenefit()} />
            <ConfirmModal isOpen={isOpenError} setIsOpen={setIsOpenError} text={errorText}
                buttonText="Aceptar" buttonAction={() => setIsOpenError(false)} />
            <Sidebar selected={6} username={employeeName[0].nombre} />
            <main className={styles.main}>
                <div className={styles.main__header}>
                    <FormControl>
                        <InputLabel sx={{ marginLeft: -2 }}></InputLabel>
                        <TextFieldStandard1 select value={projectName} onChange={handleProjectChange}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {getProjects()}
                        </TextFieldStandard1>
                    </FormControl>
                    <Search handleSearch={handleTextChange}  searchText={searchText} placeholder="Buscar beneficio..."/>
                </div>
                <div className={styles.main__content}>    
                    {getBenefits()}
                </div>
            </main>
        </>
    )
}

export default EmployeeBenefits;
