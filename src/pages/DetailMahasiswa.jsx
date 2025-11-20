import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './Dashboard.module.css'; 

function DetailMahasiswa() {
  const { nim } = useParams();

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Detail Mahasiswa: {nim}</h3>
        <Link to="/mahasiswa" style={{ textDecoration: 'none' }}>
          &larr; Kembali ke Daftar
        </Link>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <p>
          Ini adalah halaman detail untuk mahasiswa dengan NIM <strong>{nim}</strong>.
        </p>
        <p>
          Nanti kamu bisa *fetch* data lengkap mahasiswa di sini.
        </p>
      </div>
    </div>
  );
}

export default DetailMahasiswa;