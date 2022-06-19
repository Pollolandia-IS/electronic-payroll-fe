import { Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useState } from 'react'
import {prisma} from "/.db";
import styles from "/styles/EmployerDeductions.module.css";
import safeJsonStringify from 'safe-json-stringify';
import Sidebar from "../../components/Sidebar";
import DeductionsCard from '../../components/DeductionsCard'
import NewDeductionModal from '../../components/NewDeductionModal'
import Search from "../../components/Search";
import IconBox from "../../components/IconBox";


export async function getServerSideProps(context) {
  const { companyID } = context.params;

  let deductionsQuery = await prisma.deduccionVoluntaria.findMany({
    where: {
      cedulaJuridica: companyID
    }
  });
  let projectQuery = await prisma.proyecto.findMany({
    where: {
      cedulaJuridica: companyID
    },
    select: {
      nombre: true,
      moneda: true,
    },
  });
  const deductionString = JSON.parse(safeJsonStringify(deductionsQuery));
  const proyectString = JSON.parse(safeJsonStringify(projectQuery));

  return {
    props: {
      companyID,
      deductionString,
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

const Deductions = ({companyID, deductionString, proyectString}) => {
  const projects = proyectString;
  const [modalOpened, setModalOpened] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedProjectName, setSelectedProjectName] = useState('Todos');

  const getDeductions = () => {
    if(selectedProjectName == 'Todos'){
      return deductionString.map(deduction => {
        if(searchText == ''){
          return <DeductionsCard key={deduction.nombreDeduccion} name={deduction.nombreDeduccion} amount={deduction.monto} description={deduction.descripcion} />
        } else {
          if(deduction.nombreDeduccion.toLowerCase().includes(searchText.toLowerCase())){
            return <DeductionsCard key={deduction.nombreDeduccion} name={deduction.nombreDeduccion} amount={deduction.monto} description={deduction.descripcion} />
          }
        }
      });
    } else {
      return deductionString.map(deduction => {
        if(selectedProjectName == deduction.nombreProyecto ){
          if(searchText == ''){
            return <DeductionsCard key={deduction.nombreDeduccion} name={deduction.nombreDeduccion} amount={deduction.monto} description={deduction.descripcion} />
          } else {
            if(deduction.nombreDeduccion.toLowerCase().includes(searchText.toLowerCase())){
              return <DeductionsCard key={deduction.nombreDeduccion} name={deduction.nombreDeduccion} amount={deduction.monto} description={deduction.descripcion} />
            }
          }
        }
      });
    }
  }

  const getRows = () => {
    let rows = [];
    let deductions = getDeductions();
    deductions = deductions.filter(deduction => deduction != undefined);
    for (let i = 0; i < deductions.length; i += 2) {
      rows.push(
        <div key={i} className={styles.main__row}>
          {deductions[i]}
          {deductions[i + 1]}
        </div>
      );
    }
    return rows;
  }

  const handleChangeProject = (e) => {
    setSelectedProjectName(e.target.value);
    getRows();
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
    getRows();
  };

  return(
    <>
      <NewDeductionModal isOpen={modalOpened} setIsOpen={setModalOpened} companyID={companyID} projects={projects}/>
      <Sidebar selected={6} username="Derek Suárez" />
      <main className={styles.main}>
        <div className={styles.main__header}>
          <FormControl>
            <InputLabel id="select-label"></InputLabel>
            <TextFieldStandard id="projectName" value={selectedProjectName} size="medium" onChange={handleChangeProject}>
            <MenuItem key={""} value={'Todos'}> Todos los Proyectos </MenuItem>
            {projects.map((project) => (
              <MenuItem key={project.nombre} value={project.nombre}> {project.nombre} </MenuItem>
            ))}
            </TextFieldStandard>
          </FormControl>
          <Search handleSearch={handleTextChange}  searchText={searchText} placeholder="Buscar deducción..."/>
          <IconBox action={() =>setModalOpened(true)} ><AddIcon fontSize="large" /></IconBox>
        </div>
        <div className={styles.main__content}>
          {getRows()}
        </div>
      </main>
    </>
  );
}

export default Deductions;
