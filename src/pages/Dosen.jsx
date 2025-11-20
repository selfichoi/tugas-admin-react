import React, { useState } from 'react';
import DosenModal from '../components/DosenModal';
import Button from '../components/Button';
import Pagination from '../components/Pagination'; 
import { swalConfirm } from '../helpers/swalHelper';
import styles from './Dashboard.module.css';
import { useDosen, useMutationDosen } from '../utils/hooks';

function Dosen() {
  const [page, setPage] = useState(1);
  
  const { data: queryData, isLoading } = useDosen(page);
  const { addDosen, updateDosen, deleteDosen } = useMutationDosen();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDosen, setSelectedDosen] = useState(null);

  const dosen = queryData?.data || [];
  const totalPages = queryData?.totalPages || 1;

  const userString = localStorage.getItem('user');
  const currentUser = userString ? JSON.parse(userString) : { role: 'user' };
  const isAdmin = currentUser.role === 'admin';

  const handleSubmit = (formData) => {
    if (selectedDosen) {
       updateDosen.mutate({ ...formData, id: selectedDosen.id });
    } else {
       addDosen.mutate(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    swalConfirm('Hapus Dosen?', 'Data tidak bisa dikembalikan').then((result) => {
      if (result.isConfirmed) {
        deleteDosen.mutate(id);
      }
    });
  };

  const openAddModal = () => {
    setSelectedDosen(null);
    setModalOpen(true);
  };

  const openEditModal = (dsn) => {
    setSelectedDosen(dsn);
    setModalOpen(true);
  };

  if (isLoading) return <p style={{padding:'20px'}}>Loading Dosen...</p>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Data Dosen</h3>
        <div style={{ width: '200px' }}>
          <Button onClick={openAddModal}>+ Tambah Dosen</Button>
        </div>
      </div>

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
          {dosen.map((dsn) => (
            <tr key={dsn.id}>
              <td>{dsn.nidn}</td>
              <td>{dsn.nama}</td>
              <td>{dsn.bidang}</td>
              <td className={styles.aksi}>
                <Button variant="secondary" onClick={() => openEditModal(dsn)}>Edit</Button>
                {isAdmin && (
                  <Button variant="danger" onClick={() => handleDelete(dsn.id)}>Hapus</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

      <DosenModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </div>
  );
}

export default Dosen;