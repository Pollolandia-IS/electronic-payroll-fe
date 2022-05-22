import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import Styles from '../../styles/ProjectModule.module.css';
import CardEmploy from '../../Components/CardEmploy';

const ProjectModule = () => {

  const cardObject = useSelector(
    (state) => state.card.cardObject
  );

  const cardNumber = useSelector(
    (state) => state.card.cardNumber
  );

  const userName = useSelector(
    (state) => state.user.userName
  );

  const nameOfBusiness = useSelector(
    (state) => state.user.nameOfBusiness
  );
  
  console.log(cardObject);

    return (
      <>
        <Navbar />
        <div className={Styles.container}>
          <Sidebar/>
          <div className={Styles.content}>
            <h1 className={Styles.title}>Detalles de Pago</h1>
            <div className={Styles.card}>
              <h3 className={Styles.cardHeader}>Nombre de la empresa: {nameOfBusiness}</h3>
              <div className={Styles.cardBody}>
                <div className={Styles.cardLeft}>
                  <h3>Moneda: <span className={Styles.bolded}>{cardObject.moneda}</span> </h3>
                  <h3>Frecuencia de pago: <span className={Styles.bolded}>{cardObject.frecuency}</span></h3>
                  <h3>Monto neto de transacción: <span className={Styles.bolded}>{cardObject.salary}</span></h3>
                </div>
                <div className={Styles.cardRight}>
                  <h3>Estado: <span className={Styles.bolded}>{cardObject.state}</span></h3>
                  <h3>Cantidad de beneficios habilitados: <span className={Styles.bolded}>{cardObject.id}</span></h3>
                  <h3>Cantidad de empleados en proyecto: <span className={Styles.bolded}>{cardObject.numberOfEmploys}</span></h3>              
                </div>
              </div>
              
            </div>
            <h1 className={Styles.title}>Empleados</h1>
            <CardEmploy/>
          </div>
        </div>
        
      </>
      
    );
  };
  
  export default ProjectModule;