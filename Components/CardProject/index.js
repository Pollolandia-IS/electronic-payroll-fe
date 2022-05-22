import {Component} from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import Styles from '../../styles/CardProject.module.css';
import ButtonComponentCard from '../ButtonCard';





export default function CardProject({projects}){

  const cardValue = useSelector(
    (state) => state.card.cardName
  );
  const cardID = useSelector(
    (state) => state.card.cardNumber
  );

    return (
      <section className={Styles.section}>
        <div className={Styles.proyectos}>
          <div className={Styles.header}>
            <div className={Styles.headerFirst}>
              <div className={Styles.icon}>
                <BsPersonCircle />
              </div>
              <span  className={Styles.headerFirst}>{projects.numberOfEmploys}</span>
            </div> 
            <span className={Styles.headerItem}>{projects.typeOfContract}</span>
            <span className={Styles.headerItem}>{projects.startDate} - {projects.endDate}</span>

          </div>
          <div className={Styles.body}>
            <div className={Styles.bodyLeft}>
              <span className={Styles.headerItem}>Moneda: {projects.moneda}</span>
              <span className={Styles.headerItem}>Estado: {projects.state}</span>
            </div>
            <div className={Styles.bodyCenter}>
              <span className={Styles.headerItem}>Total Salario Neto: {projects.salary}</span>
            </div>
            <div className={Styles.bodyRight}>
              <ButtonComponentCard element = {projects}/>
              <span className={Styles.headerItem}>Frecuencia de pago: {projects.frecuency}</span>
            </div>
          </div>
        </div>
      </section>
    );
};