import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Label from './Label';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import toast from '../helpers/toastHelper';

const emptyForm = { nidn: '', nama: '', bidang: '', maxSks: '' };

function DosenModal({ isModalOpen, onClose, onSubmit, selectedDosen }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedDosen) {
      setForm(selectedDosen);
    } else {
      setForm(emptyForm);
    }
  }, [selectedDosen, isModalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nidn || !form.nama || !form.maxSks) {
      toast.error('NIDN, Nama, dan Max SKS harus diisi!');
      return;
    }
    onSubmit(form);
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedDosen ? 'Edit Dosen' : 'Tambah Dosen'}
    >
      <Form onSubmit={handleSubmit}>
        <Label>NIDN</Label>
        <Input 
          name="nidn" 
          value={form.nidn} 
          onChange={handleChange} 
          disabled={!!selectedDosen} 
          placeholder="Masukkan NIDN"
        />
        
        <Label>Nama Dosen</Label>
        <Input 
          name="nama" 
          value={form.nama} 
          onChange={handleChange} 
          placeholder="Nama Lengkap dan Gelar"
        />
        
        <Label>Bidang Keahlian</Label>
        <Input 
          name="bidang" 
          value={form.bidang} 
          onChange={handleChange} 
          placeholder="Contoh: Rekayasa Perangkat Lunak"
        />

        <Label>Batas Maksimal SKS Mengajar</Label>
        <Input 
          type="number" 
          name="maxSks" 
          value={form.maxSks} 
          onChange={handleChange} 
          placeholder="Contoh: 12" 
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default DosenModal;