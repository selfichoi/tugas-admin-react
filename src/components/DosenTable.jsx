import React from 'react';
import Button from './Button';
import styles from '../pages/Dashboard.module.css';

function DosenTable({ dosenList, openEditModal, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>NIDN</th>
          <th>Nama</th>
          <th>Bidang</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {dosenList.map((dsn) => (
          <tr key={dsn.id}>
            <td>{dsn.nidn}</td>
            <td>{dsn.nama}</td>
            <td>{dsn.bidang}</td>
            <td className={styles.aksi}>
              <Button variant="secondary" onClick={() => openEditModal(dsn)}>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(dsn.id)}>Hapus</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DosenTable;