import React from 'react';
import styles from './Modal.module.css';
import Button from './Button';

function Modal({ isOpen, onClose, title, children, footerButtons }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          {footerButtons ? (
            footerButtons
          ) : (
            <Button onClick={onClose} variant="secondary">
              Tutup
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;