import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import styles from '../pages/Dashboard.module.css';

function MahasiswaTable({ mahasiswa, openEditModal, onDelete }) {
  const handleDelete = (nim) => {
    onDelete(nim);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>NIM</th>
          <th>Nama</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa.map((mhs) => (
          <tr key={mhs.nim}>
            <td>{mhs.nim}</td>
            <td>
              <Link
                to={`/mahasiswa/${mhs.nim}`}
                className={styles.detailLink}
              >
                {mhs.nama}
              </Link>
            </td>
            <td>{mhs.status ? 'Aktif' : 'Tidak Aktif'}</td>
            <td className={styles.aksi}>
              <Button
                variant="secondary"
                onClick={() => openEditModal(mhs)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(mhs.nim)}
              >
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MahasiswaTable;