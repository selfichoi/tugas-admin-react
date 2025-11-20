import React, { useState } from 'react';
import MatkulModal from '../components/MatkulModal';
import MatkulTable from '../components/MatkulTable';
import Button from '../components/Button';
import Pagination from '../components/Pagination'; 
import { swalConfirm } from '../helpers/swalHelper';
import styles from './Dashboard.module.css';
import { useMatkul, useMutationMatkul } from '../utils/hooks';

function Matkul() {
  const [page, setPage] = useState(1);

  const { data: queryData, isLoading } = useMatkul(page);
  const { addMatkul, updateMatkul, deleteMatkul } = useMutationMatkul();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedMatkul, setSelectedMatkul] = useState(null);

  const matkul = queryData?.data || [];
  const totalPages = queryData?.totalPages || 1;

  const handleSubmit = (formData) => {
    if (selectedMatkul) {
      updateMatkul.mutate({ ...formData, id: selectedMatkul.id });
    } else {
      addMatkul.mutate(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    swalConfirm('Hapus Mata Kuliah?', 'Data tidak bisa dikembalikan').then((result) => {
      if (result.isConfirmed) {
        deleteMatkul.mutate(id);
      }
    });
  };

  const openAddModal = () => {
    setSelectedMatkul(null);
    setModalOpen(true);
  };

  const openEditModal = (mk) => {
    setSelectedMatkul(mk);
    setModalOpen(true);
  };

  if (isLoading) return <p style={{padding:'20px'}}>Loading Mata Kuliah...</p>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Data Mata Kuliah</h3>
        <div style={{ width: '200px' }}>
          <Button onClick={openAddModal}>+ Tambah Matkul</Button>
        </div>
      </div>
      <MatkulTable matkulList={matkul} openEditModal={openEditModal} onDelete={handleDelete} />
      
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

      <MatkulModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMatkul={selectedMatkul}
      />
    </div>
  );
}

export default Matkul;