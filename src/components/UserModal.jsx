import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Label from './Label';
import Input from './Input';
import Form from './Form';
import Button from './Button';
import toast from '../helpers/toastHelper';

const emptyForm = { nama: '', email: '', password: '', role: 'user' };

function UserModal({ isModalOpen, onClose, onSubmit, selectedUser }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (selectedUser) {
      setForm(selectedUser);
    } else {
      setForm(emptyForm);
    }
  }, [selectedUser, isModalOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isModalOpen) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={onClose}
      title={selectedUser ? 'Edit User & Role' : 'Tambah User'}
    >
      <Form onSubmit={handleSubmit}>
        <Label>Nama Lengkap</Label>
        <Input name="nama" value={form.nama} onChange={handleChange} />
        <Label>Email</Label>
        <Input name="email" value={form.email} onChange={handleChange} disabled={!!selectedUser} />
        <Label>Password</Label>
        <Input name="password" value={form.password} onChange={handleChange} type="password" />
        
        <Label>Role Akses</Label>
        <select 
          name="role" 
          value={form.role} 
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
        >
          <option value="user">User Biasa</option>
          <option value="admin">Administrator</option>
        </select>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UserModal;