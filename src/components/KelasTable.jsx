import React from 'react';
import Button from './Button';
import styles from '../pages/Dashboard.module.css';

function KelasTable({ kelasList, allMatkul, allDosen, openEditModal, onDelete }) {
  
  const getMatkulName = (id) => {
    const m = allMatkul.find(item => item.id === id);
    return m ? `${m.nama} (${m.sks} SKS)` : '-';
  };

  const getDosenName = (id) => {
    const d = allDosen.find(item => item.id === id);
    return d ? d.nama : '-';
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Kelas</th>
          <th>Mata Kuliah</th>
          <th>Dosen</th>
          <th>Mahasiswa</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {kelasList.map((kls) => (
          <tr key={kls.id}>
            <td>{kls.namaKelas}</td>
            <td>{getMatkulName(kls.matkulId)}</td>
            <td>{getDosenName(kls.dosenId)}</td>
            <td>
              <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                {kls.mahasiswaIds ? kls.mahasiswaIds.length : 0} Orang
              </span>
            </td>
            <td className={styles.aksi}>
              <Button variant="secondary" onClick={() => openEditModal(kls)}>Edit</Button>
              <Button variant="danger" onClick={() => onDelete(kls.id)}>Hapus</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default KelasTable;