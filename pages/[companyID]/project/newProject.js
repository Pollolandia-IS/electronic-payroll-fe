import Modal from '/components/Modal';
import Aside from "/components/Aside";
import NavBar from "/components/NavBar";
import ProjectCard from "/components/projectCard";
import styles from "/styles/newProject.module.css";
import Router from "next/router";
import { useState } from "react";

export async function getServerSideProps(context) {
  const { companyID} = context.params;
  return {
    props: {
      companyID,
    },
};
}

const newProject = ({companyID}) => {

  const submitInfo = async (event) => {
    event.preventDefault();
    const info = {
        companyID: companyID,
        name: event.target.name.value,
        currency: event.target.currency.value,
        amountBenefit: event.target.amountBenefit.value,
        moneyBenefit: event.target.moneyBenefit.value,
        frequency: event.target.frequency.value,
    };
    try {
      await fetch ('/api/project', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(info),
      });
      await Router.push(`/${companyID}/project`);
  } catch (error) {
      console.error(error);
  }
  };

  const [modalOpened, setModalOpened] = useState(true);

  const navItems = [
    ["Proyectos", true, "/RegisterCompany"],
    ["Reportes", false, "/RegisterCompany"],
    ["Empleados", false, "/RegisterCompany"],
    ["Deducciones", false, "/RegisterCompany"],
    ["Beneficios", false, "/RegisterCompany"],
  ];

  const asideItems = [
      {
        name: 'Nómina',
        icon: 'payroll',
        dropDown: [
          ['+ Crear Proyecto', ''],
        ],
      },
      {
        name: 'Ajustes',
        icon: 'config',
        dropDown: [],
      },
      {
        name: 'Historial',
        icon: 'history',
        dropDown: [],
      },
      {
        name: 'Perfil',
        icon: 'profile',
        dropDown: [],
      },
      {
        name: 'Cerrar Sesión',
        icon: 'logout',
      },
    ];

  return (
    <>
    <NavBar navItems={navItems} />
    <Aside items={asideItems}/>
    <main className={styles.main}>
        <ProjectCard
          id="1"
          name="Proyecto 1"
          userCount="10"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="2"
          name="Proyecto 2"
          userCount="20"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="3"
          name="Proyecto 3"
          userCount="30"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="4"
          name="Proyecto Integrador"
          userCount="30"
          currency="CRC"
          frequency="Semanal"
          startDate="01/01/2020 - 01/08/2022"
        />
                <ProjectCard
          id="1"
          name="Proyecto 1"
          userCount="10"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="2"
          name="Proyecto 2"
          userCount="20"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="3"
          name="Proyecto 3"
          userCount="30"
          currency="USD"
          frequency="Mensual"
          startDate="01/01/2020 - 01/30/2022"
        />
        <ProjectCard
          id="4"
          name="Proyecto Integrador"
          userCount="30"
          currency="CRC"
          frequency="Semanal"
          startDate="01/01/2020 - 01/08/2022"
        />
    </main>
    <Modal title="Nuevo Proyecto" modalOpened={modalOpened} setModalOpened={setModalOpened}>
    <form className={styles.modal} onSubmit={submitInfo} >
      <input className={styles.modal__input} type="text" name='name' placeholder="Nombre del Proyecto" />
      <input className={styles.modal__input} type="text" name='currency' placeholder="Moneda" />
      <input className={styles.modal__input} type="text" name='amountBenefit' placeholder="Beneficios Maximos" />
      <input className={styles.modal__input} type="text" name='moneyBenefit' placeholder="Monto Max Beneficios" />
      <input className={styles.modal__input} type="text" name='frequency' placeholder="Frecuencia de Pago" />
      <input className={styles.modal__submit} type="submit" value="Crear" />
    </form>
    </Modal>
    </>
  );
}

export default newProject;
