import React, { useState } from 'react';
import KelasModal from '../components/KelasModal';
import KelasTable from '../components/KelasTable';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import { swalConfirm } from '../helpers/swalHelper';
import styles from './Dashboard.module.css';
import { 
  useKelas, useMutationKelas, 
  useAllDosen, useAllMatkul, useAllMahasiswa, useAllKelas 
} from '../utils/hooks';

function Kelas() {
  const [page, setPage] = useState(1);

  const { data: queryData, isLoading } = useKelas(page);
  const { addKelas, updateKelas, deleteKelas } = useMutationKelas();

  const { data: allDosen = [] } = useAllDosen();
  const { data: allMatkul = [] } = useAllMatkul();
  const { data: allMahasiswa = [] } = useAllMahasiswa();
  const { data: allKelas = [] } = useAllKelas();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState(null);

  const kelas = queryData?.data || [];
  const totalPages = queryData?.totalPages || 1;

  const handleSubmit = (formData) => {
    if (selectedKelas) {
      updateKelas.mutate({ ...formData, id: selectedKelas.id });
    } else {
      addKelas.mutate(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    swalConfirm('Hapus Kelas?', 'Data tidak bisa dikembalikan').then((result) => {
      if (result.isConfirmed) {
        deleteKelas.mutate(id);
      }
    });
  };

  const openAddModal = () => {
    setSelectedKelas(null);
    setModalOpen(true);
  };

  const openEditModal = (kls) => {
    setSelectedKelas(kls);
    setModalOpen(true);
  };

  if (isLoading) return <p style={{padding:'20px'}}>Loading Data Kelas...</p>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Manajemen Jadwal Kelas</h3>
        <div style={{ width: '200px' }}>
          <Button onClick={openAddModal}>+ Buat Kelas</Button>
        </div>
      </div>
      
      <KelasTable 
        kelasList={kelas} 
        allMatkul={allMatkul}
        allDosen={allDosen}
        openEditModal={openEditModal} 
        onDelete={handleDelete} 
      />
      
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

      <KelasModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedKelas={selectedKelas}
        allDosen={allDosen}
        allMatkul={allMatkul}
        allMahasiswa={allMahasiswa}
        allKelas={allKelas} 
      />
    </div>
  );
}

export default Kelas;