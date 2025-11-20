import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Label from './Label';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import toast from '../helpers/toastHelper';
import styles from '../pages/Dashboard.module.css';

const emptyForm = { nim: '', nama: '', status: true, maxSks: '' };

function MahasiswaModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
  mahasiswaList,
}) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedMahasiswa) {
      setForm(selectedMahasiswa);
    } else {
      setForm(emptyForm);
    }
  }, [selectedMahasiswa, isModalOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault(); // Cegah reload jika dipanggil dari form

    if (!form.nim || !form.nama || !form.maxSks) {
      toast.error('NIM, Nama, dan Max SKS tidak boleh kosong!');
      return;
    }

    if (!selectedMahasiswa) {
      const isNIMExist = mahasiswaList.some((mhs) => mhs.nim === form.nim);
      if (isNIMExist) {
        toast.error('NIM sudah terdaftar. Gunakan NIM lain.');
        return;
      }
    }

    onSubmit(form);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedMahasiswa ? 'Edit Mahasiswa' : 'Tambah Mahasiswa'}
    >
      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="nim">NIM</Label>
          <Input
            id="nim"
            name="nim"
            placeholder="Masukkan NIM"
            value={form.nim}
            onChange={handleChange}
            disabled={!!selectedMahasiswa}
          />
        </div>
        <div>
          <Label htmlFor="nama">Nama</Label>
          <Input
            id="nama"
            name="nama"
            placeholder="Masukkan Nama"
            value={form.nama}
            onChange={handleChange}
          />
        </div>
        
        {/* INPUT BARU: MAX SKS */}
        <div>
          <Label htmlFor="maxSks">Batas Maksimal SKS</Label>
          <Input
            id="maxSks"
            type="number"
            name="maxSks"
            placeholder="Contoh: 24"
            value={form.maxSks}
            onChange={handleChange}
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={form.status}
            onChange={handleChange}
          />
          <Label htmlFor="status">Mahasiswa Aktif</Label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="button" onClick={handleSubmit}>Simpan</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MahasiswaModal;