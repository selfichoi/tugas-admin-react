import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const location = useLocation();

  const getHeaderTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/mahasiswa')) return 'Mahasiswa';
    if (path.startsWith('/dosen')) return 'Dosen';
    if (path.startsWith('/matakuliah')) return 'Mata Kuliah';
    
    if (path.startsWith('/kelas')) return 'Manajemen Kelas';
    
    if (path.startsWith('/users')) return 'Manajemen User';
    return 'Sistem Akademik';
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header title={getHeaderTitle()} />
        <main className={styles.content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;