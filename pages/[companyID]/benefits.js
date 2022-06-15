import { useState } from 'react'
import {prisma} from "/.db";
import styles from "/styles/Projects.module.css";
import safeJsonStringify from 'safe-json-stringify';
import Sidebar from "../../components/Sidebar";
import BenefitsCard from '../../components/CardBenefits'
import NewBenefitModal from '../../components/ModalBenefits'
import Search from "../../components/Search";
import IconBox from "../../components/IconBox";
import AddIcon from '@mui/icons-material/Add';

export async function getServerSideProps(context) {
  const { companyID } = context.params;

  let benefitsQuery = await prisma.beneficios.findMany({
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

const Benefits = ({companyID, benefitString, proyectString}) => {
  const projects = proyectString;
  const [modalOpened, setModalOpened] = useState(false);

  const getBenefits = () => {
    return benefitString.map(benefit => {
      return <BenefitsCard key={benefit.nombreBeneficio} name={benefit.nombreBeneficio} amount={benefit.montoPago} description={benefit.descripcion} />
    }
    )
  }

  const getRows = () => {
    let rows = [];
    const benefits = getBenefits();
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
    return(
      <>
        <NewBenefitModal isOpen={modalOpened} setIsOpen={setModalOpened} companyID={companyID} projects={projects}/>
        <Sidebar selected={6} username="Axel Matus" />
        <main className={styles.main}>
          <div className={styles.main__header}>
            <Search placeholder="Buscar proyecto..."/>
            <IconBox action={() =>setModalOpened(true)} ><AddIcon fontSize="large" /></IconBox>
          </div>
          <div className={styles.main__content}>
            {getRows()}
          </div>
        </main>
      </>

    );
}

export default Benefits;
