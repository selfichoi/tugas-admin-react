import React, { useState } from 'react';
import MahasiswaModal from '../components/MahasiswaModal';
import MahasiswaTable from '../components/MahasiswaTable';
import Button from '../components/Button';
import Pagination from '../components/Pagination'; 
import { swalConfirm } from '../helpers/swalHelper';
import styles from './Dashboard.module.css';
import { useMahasiswa, useMutationMahasiswa } from '../utils/hooks';

function Mahasiswa() {
  const [page, setPage] = useState(1);
  
  const { data: queryData, isLoading, isError } = useMahasiswa(page);
  const { addMahasiswa, updateMahasiswa, deleteMahasiswa } = useMutationMahasiswa();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const mahasiswa = queryData?.data || [];
  const totalPages = queryData?.totalPages || 1;

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setModalOpen(true);
  };

  const handleSubmit = (formData) => {
    if (selectedMahasiswa) {
      swalConfirm('Simpan Perubahan?', 'Yakin update data ini?').then((result) => {
        if (result.isConfirmed) {
          updateMahasiswa.mutate({ ...formData, id: selectedMahasiswa.id });
          setModalOpen(false);
        }
      });
    } else {
      addMahasiswa.mutate(formData);
      setModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    swalConfirm('Hapus Mahasiswa?', 'Data hilang permanen').then((result) => {
      if (result.isConfirmed) {
        deleteMahasiswa.mutate(id);
      }
    });
  };

  if (isLoading) return <div style={{padding: '2rem'}}>Loading Data Mahasiswa...</div>;
  if (isError) return <div style={{padding: '2rem'}}>Error mengambil data. Cek server!</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Mahasiswa</h3>
        <div style={{ width: '200px' }}>
          <Button onClick={openAddModal}>+ Tambah Mahasiswa</Button>
        </div>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        mahasiswaList={mahasiswa}
      />
    </div>
  );
}

export default Mahasiswa;