import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Label from './Label';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import toast from '../helpers/toastHelper';

const emptyForm = { namaKelas: '', kapasitas: '', matkulId: '', dosenId: '', mahasiswaIds: [] };

function KelasModal({ isModalOpen, onClose, onSubmit, selectedKelas, allDosen, allMatkul, allMahasiswa, allKelas }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedKelas) {
      setForm(selectedKelas);
    } else {
      setForm(emptyForm);
    }
  }, [selectedKelas, isModalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMahasiswaChange = (id) => {
    let newIds = [...(form.mahasiswaIds || [])];
    if (newIds.includes(id)) {
      newIds = newIds.filter(mId => mId !== id);
    } else {
      newIds.push(id);
    }
    setForm({ ...form, mahasiswaIds: newIds });
  };

  const validateSKS = () => {
    // 1. Ambil Data Matkul Terpilih
    const selectedMatkulData = allMatkul.find(m => m.id === form.matkulId);
    if (!selectedMatkulData) return true; 
    const sksMatkul = parseInt(selectedMatkulData.sks);

    // 2. Validasi SKS DOSEN
    if (form.dosenId) {
      const dosen = allDosen.find(d => d.id === form.dosenId);
      if (dosen) {
        const currentSksDosen = allKelas
          .filter(k => k.dosenId === form.dosenId && k.id !== form.id)
          .reduce((acc, curr) => {
            const mk = allMatkul.find(m => m.id === curr.matkulId);
            return acc + (mk ? parseInt(mk.sks) : 0);
          }, 0);

        if (currentSksDosen + sksMatkul > dosen.maxSks) {
          toast.error(`Gagal! Dosen ${dosen.nama} melampaui Max SKS (${dosen.maxSks}). Total saat ini: ${currentSksDosen}`);
          return false;
        }
      }
    }

    // 3. Validasi SKS MAHASISWA
    if (form.mahasiswaIds && form.mahasiswaIds.length > 0) {
      for (const mhsId of form.mahasiswaIds) {
        const mhs = allMahasiswa.find(m => m.id === mhsId);
        if (mhs) {
          const currentSksMhs = allKelas
            .filter(k => (k.mahasiswaIds || []).includes(mhsId) && k.id !== form.id)
            .reduce((acc, curr) => {
              const mk = allMatkul.find(m => m.id === curr.matkulId);
              return acc + (mk ? parseInt(mk.sks) : 0);
            }, 0);

          if (currentSksMhs + sksMatkul > mhs.maxSks) {
            toast.error(`Gagal! Mahasiswa ${mhs.nama} melampaui Max SKS (${mhs.maxSks}). Terambil: ${currentSksMhs}`);
            return false;
          }
        }
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!form.namaKelas || !form.kapasitas || !form.matkulId || !form.dosenId) {
      toast.error('Nama Kelas, Kapasitas, Mata Kuliah, dan Dosen wajib diisi!');
      return;
    }

    if (validateSKS()) {
      onSubmit(form);
    }
  };

  const getMhsSks = (mhsId) => {
    return allKelas
      .filter(k => (k.mahasiswaIds || []).includes(mhsId))
      .reduce((acc, curr) => {
        const mk = allMatkul.find(m => m.id === curr.matkulId);
        return acc + (mk ? parseInt(mk.sks) : 0);
      }, 0);
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedKelas ? 'Edit Jadwal Kelas' : 'Buat Kelas Baru'}
    >
      <Form onSubmit={handleSubmit}>
        <Label>Nama Kelas</Label>
        <Input name="namaKelas" value={form.namaKelas} onChange={handleChange} placeholder="Contoh: 4401" />

        <Label>Kapasitas Kelas</Label>
        <Input type="number" name="kapasitas" value={form.kapasitas} onChange={handleChange} placeholder="Contoh: 30" />

        <Label>Mata Kuliah</Label>
        <select name="matkulId" value={form.matkulId} onChange={handleChange} style={selectStyle}>
          <option value="">-- Pilih Mata Kuliah --</option>
          {allMatkul.map(m => (
            <option key={m.id} value={m.id}>{m.kode} - {m.nama} ({m.sks} SKS)</option>
          ))}
        </select>

        <Label>Dosen Pengampu</Label>
        <select name="dosenId" value={form.dosenId} onChange={handleChange} style={selectStyle}>
          <option value="">-- Pilih Dosen --</option>
          {allDosen.map(d => (
            <option key={d.id} value={d.id}>{d.nama} (Max: {d.maxSks} SKS)</option>
          ))}
        </select>

        <Label>Pilih Mahasiswa</Label>
        <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '6px' }}>
          {allMahasiswa.map(m => {
            const currentSks = getMhsSks(m.id);
            const isOverload = currentSks >= m.maxSks;
            const isSelected = (form.mahasiswaIds || []).includes(m.id);
            
            return (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <input 
                  type="checkbox" 
                  checked={isSelected}
                  onChange={() => handleMahasiswaChange(m.id)}
                  disabled={!isSelected && isOverload} 
                  style={{ marginRight: '10px', cursor: (!isSelected && isOverload) ? 'not-allowed' : 'pointer' }}
                />
                <span style={{ color: (!isSelected && isOverload) ? '#9ca3af' : 'inherit' }}>
                  {m.nama} <small style={{ color: isOverload ? 'red' : '#666' }}>({currentSks}/{m.maxSks} SKS)</small>
                </span>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="button" onClick={handleSubmit}>Simpan Kelas</Button>
        </div>
      </Form>
    </Modal>
  );
}

const selectStyle = {
  width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '1rem'
};

export default KelasModal;