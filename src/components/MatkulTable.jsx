import React from 'react';
import Button from './Button';
import styles from '../pages/Dashboard.module.css';

function MatkulTable({ matkulList, openEditModal, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Kode</th>
          <th>Nama Matkul</th>
          <th>SKS</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {matkulList.map((mk) => (
          <tr key={mk.id}>
            <td>{mk.kode}</td>
            <td>{mk.nama}</td>
            <td>{mk.sks}</td>
            <td className={styles.aksi}>
              <Button variant="secondary" onClick={() => openEditModal(mk)}>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(mk.id)}>Hapus</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MatkulTable;