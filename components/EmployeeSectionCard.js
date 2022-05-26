import styles from '../styles/EmployeeSectionCard.module.css';
import Image from 'next/image';

const EmployeeSectionCard = ({name, job, email, phone, photo}) => {
  return (
    <div className={styles.card}>
        <Image
          className={styles.card__image}
          src={photo}
          alt={name}
          width={114}
          height={106}
          layout="raw"
          quality={100}
        />
      <div className={styles.card__info}>
        <h3 className={styles.card__name}>{name}</h3>
        <h3 className={styles.card__name}>{job}</h3>
        <h3 className={styles.card__name}>{email}</h3>
        <h3 className={styles.card__name}>{phone}</h3>
      </div>
    </div>
  );
}
export default EmployeeSectionCard;
