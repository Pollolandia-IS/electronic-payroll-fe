import styles from '../styles/ReportCard.module.css';
import Image from 'next/image';

const ReportCard = ({name, date, hours, status, photo}) => {
  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.card__employee}>
          <Image
            className={styles.card__image}
            src={photo}
            alt={name}
            width={35}
            height={35}
            layout="raw"
            quality={100}
          />
          <h3 className={`${styles.card__text} ${styles.card__name}`}>{name}</h3>
        </div>
        <h3 className={`${styles.card__text} ${styles.card__date}`}>{date}</h3>
        <h3 className={`${styles.card__text} ${styles.card__hours}`}>{hours} horas</h3>
        <h3 className={`${styles.card__text} ${styles.card__status}`}>{status}</h3>
      </section>
      <button className={styles.card__button}><span className="icon PL-close"></span></button>
      <button className={styles.card__button}><span className="icon PL-check"></span></button>
    </div>
  );
}
export default ReportCard;
