import styles from '../styles/AsideItem.module.css';
import Icon from './Icon';
import Link from 'next/link';
import { useState } from 'react';
import AsideDropdown from './AsideDropdown';

const AsideItem = (props) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (props.item.dropDown) {
      setIsOpen(!isOpen);
    }
  };


  return (
    <>
      <li className={`${styles.asideItem} ${isOpen ? styles["asideItem--open"] : ""} ${props.item.dropDown ? "" : styles["asideItem--non-dropable"]}`} onClick={handleClick}>
        <Icon icon={props.item.icon} className={`${styles.asideItem__icon} ${styles["asideItem__icon--left"]}`} />
        <span className={styles.asideItem__name}>{props.item.name}</span>
        {props.item.dropDown ? 
        <Icon icon={'arrow'} className={`${styles.asideItem__icon} ${styles["asideItem__icon--right"]} ${isOpen ? "inverted" : ""}`} />
        : null}
      </li>
      {isOpen && props.item.dropDown ? <AsideDropdown items={props.item.dropDown} /> : null}
    </>
  );
}

export default AsideItem;
