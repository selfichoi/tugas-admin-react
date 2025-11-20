import React from 'react';
import Button from './Button';
import styles from '../pages/Dashboard.module.css';

function UserTable({ userList, openEditModal, onDelete }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((usr) => (
          <tr key={usr.id}>
            <td>{usr.nama}</td>
            <td>{usr.email}</td>
            <td>
              <span style={{ 
                padding: '4px 8px', 
                borderRadius: '4px', 
                backgroundColor: usr.role === 'admin' ? '#dbeafe' : '#f3f4f6',
                color: usr.role === 'admin' ? '#1e40af' : '#374151',
                fontWeight: 'bold',
                fontSize: '0.8rem'
              }}>
                {usr.role.toUpperCase()}
              </span>
            </td>
            <td className={styles.aksi}>
              <Button variant="secondary" onClick={() => openEditModal(usr)}>Edit Role</Button>
              <Button variant="danger" onClick={() => onDelete(usr.id)}>Hapus</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;