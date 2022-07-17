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
                        src="/../public/assets/img/employee3.png"
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
                            { !props.removeCheckbox &&
                            <Checkbox
                                onChange={props.handleCheckbox}
                                name={String(props.cardItems.cedula)}
                                checked={props.checkedBoxValue}
                                sx={{
                                    color: "#000000",
                                    "&.Mui-checked": { color: "#FE3D2B" },
                                }}
                            />
                            }
                        </div>
                        <h3 className={styles.card__name}>
                            Nombre: {" "}
                            <span className={styles.bolded}>{props.cardItems.nombre}</span>
                        </h3>
                        <h3 className={styles.card__name}>
                            Cedula: {" "}
                            {props.cardItems.cedula}
                        </h3>
                        <h3 className={styles.card__name}>
                            Correo: {" "}
                            {props.cardItems.hace_uso[0].email}
                        </h3>
                    </div>
                    <div className={styles.card__info__body}>
                        <h3 className={styles.card__name}>
                            Telefono {props.cardItems.telefono}
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );

}

CardEmployee.defaultProps = {
    removeCheckbox: false
}
export default CardEmployee;
