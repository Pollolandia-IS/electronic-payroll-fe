import React from 'react';
import { useSelector } from 'react-redux';
import Styles from '../../styles/CardReport.module.css';


export default function CardReport(props){

    return (
      <section className={Styles.section}>
        <div className={Styles.report}>
          <div className={Styles.header}>
              <span className={Styles.headerSpan}>Pago generado el día:</span>
          </div>
          <div className={Styles.body}>
            <span className={Styles.headerItem}>Total salario aprobado: </span>
            <span className={Styles.headerItem}>Estado: </span>
          </div>
        </div>
      </section>
    );
};