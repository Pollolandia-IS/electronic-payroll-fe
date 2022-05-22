import React from 'react';
import { useSelector } from 'react-redux';
import Styles from '../../styles/CardEmploy.module.css';
import { BsPersonCircle } from 'react-icons/bs';





export default function CardProject(props){

    return (
      <section className={Styles.section}>
        <div className={Styles.employ}>
          <div className={Styles.header}>
              <div className={Styles.icon}>
                <BsPersonCircle />
              </div>
              <span className={Styles.headerSpan}>Name :</span>
              <span></span>
          </div>
          <div className={Styles.body}>
            <span className={Styles.headerItem}>Total salario Bruto: </span>
            <span className={Styles.headerItem}>Servicio: </span>
            <span className={Styles.headerItem}>Fecha de ingreso: </span>
          </div>
        </div>
      </section>
    );
};


