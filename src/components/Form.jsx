import React from 'react';
import styles from './Form.module.css';

function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  );
}

export default Form;