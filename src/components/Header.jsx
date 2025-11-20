import React from 'react';
import { useNavigate } from 'react-router-dom';
import { swalLogout } from '../helpers/swalHelper';
import styles from './Header.module.css';

function Header({ title }) {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { nama: 'Admin' };

  const handleLogout = () => {
    swalLogout().then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        navigate('/login');
      }
    });
  };

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.userInfo}>
        <span>Halo, {user.nama}</span>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;