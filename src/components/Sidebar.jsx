import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user.role === 'admin';
  const sidebarTitle = isAdmin ? 'Administrator' : 'Mahasiswa Panel';

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.brand}>{sidebarTitle}</h1>
      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/mahasiswa" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Mahasiswa
        </NavLink>
        
        <NavLink 
          to="/dosen" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Dosen
        </NavLink>
        
        <NavLink 
          to="/matakuliah" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Mata Kuliah
        </NavLink>

        <NavLink 
          to="/kelas" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          Kelas
        </NavLink>
        
        {isAdmin && (
          <NavLink 
            to="/users" 
            className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
          >
            Manajemen User
          </NavLink>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;