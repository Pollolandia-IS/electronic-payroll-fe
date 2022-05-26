import Link from 'next/link';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({id, name, userCount, currency, frequency, startDate}) => {
  return (
    <section className={styles.card}>
      <div className={styles["card-header"]} >
          <span className="icon PL-user"></span>
          <span className={styles["card-header__users"]}>{userCount}</span>
        <h3 className={styles["card-header__title"]}>{name}</h3>
        <span className={styles["card-header__date"]}>{startDate}</span>
      </div>
      <div className={styles["card-body"]}>
        <div>
          <p className={`${styles["card-body__element"]} ${styles["card-body__element--currency"]}`}>Moneda: {currency}</p>
          <p className={`${styles["card-body__element"]} ${styles["card-body__element--frequency"]}`}>Frecuencia de Pago: {frequency}</p>
        </div>
        <div>
          <p className={`${styles["card-body__element"]} ${styles["card-body__element--salary"]}`}>Total Salario Neto: <span>25.000.000¢</span></p>
          <Link href="/project/[id]" as={`/project/${id}`}>
            <a><button className={`${styles["card-body__element"]} ${styles["card-body__element--button"]}`}>Ver Detalles</button></a>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectCard;
