import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Label from './Label';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import toast from '../helpers/toastHelper';

const emptyForm = { kode: '', nama: '', sks: '' };

function MatkulModal({ isModalOpen, onClose, onSubmit, selectedMatkul }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedMatkul) {
      setForm(selectedMatkul);
    } else {
      setForm(emptyForm);
    }
  }, [selectedMatkul, isModalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.sks) {
      toast.error('Semua field harus diisi!');
      return;
    }
    onSubmit(form);
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedMatkul ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
    >
      <Form onSubmit={handleSubmit}>
        <Label>Kode Mata Kuliah</Label>
        <Input name="kode" value={form.kode} onChange={handleChange} disabled={!!selectedMatkul} />
        <Label>Nama Mata Kuliah</Label>
        <Input name="nama" value={form.nama} onChange={handleChange} />
        <Label>SKS</Label>
        <Input type="number" name="sks" value={form.sks} onChange={handleChange} />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MatkulModal;