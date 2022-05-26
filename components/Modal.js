import styles from '../styles/Modal.module.css';
import ModalOverlay from './ModalOverlay';

const Modal = ({children, title, modalOpened, setModalOpened}) => {
  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    <>
      {modalOpened && (
      <ModalOverlay>
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <div className={styles.modal__header__fill}></div>
            <h2 className={styles.modal__title}>{title}</h2>
            <button className={styles.modal__close} onClick={closeModal}><span className="icon PL-close"></span></button>
          </div>
          <div className={styles.modal__body}>
            <div className={styles.modal__content}>
            {children}
            </div>
          </div>
        </div>
      </ModalOverlay> )}
    </>
  );
};

export default Modal;
