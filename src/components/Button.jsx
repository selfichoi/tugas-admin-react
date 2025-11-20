import React from 'react';
import styles from './Button.module.css';

function Button({ children, onClick, type = 'button', variant = 'primary' }) {
  const getVariantClass = () => {
    if (variant === 'danger') return styles.danger;
    if (variant === 'secondary') return styles.secondary;
    return styles.primary;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${getVariantClass()}`}
    >
      {children}
    </button>
  );
}

export default Button;