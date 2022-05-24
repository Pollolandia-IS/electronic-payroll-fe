import styles from '../styles/CardEmployee.module.css';
import Image from 'next/image';
import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';


const CardEmployee = (props) => {

    return (
      <>
        <div className={styles.card}>
          <div className={styles.card__head}>
            <Image
              className={styles.card__image}
              src={props.cardItems.srcImg}
              alt={props.cardItems.name}
              width={202}
              height={189}
              layout="raw"
              quality={100}
            />
          </div>
          <div className={styles.card__info}>
            <div className={styles.card__info__head}>
              <div className={styles.card__info__check}>
                <Checkbox
                  onChange={props.handleCheckbox}
                  name={props.cardItems.name}
                  checked={props.checkedBoxValue}
                  sx={{
                    color: "#000000",
                    "&.Mui-checked": { color: "#FE3D2B" },
                  }}
                />
              </div>
              <h3 className={styles.card__name}>
                Total Salario Bruto{" "}
                <span className={styles.bolded}>{props.cardItems.salary}</span>
              </h3>
              <h3 className={styles.card__name}>
                {" "}
                {props.cardItems.typeOfWork}
              </h3>
            </div>
            <div className={styles.card__info__body}>
              <h3 className={styles.card__name}>
                Fecha de ingreso {props.cardItems.date}
              </h3>
            </div>
          </div>
        </div>
      </>
    );

}
export default CardEmployee;
