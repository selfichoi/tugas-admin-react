import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import Form from '../components/Form';
import toast from '../helpers/toastHelper';
import api from '../api/api';
import styles from './Login.module.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', nama: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const checkUser = await api.get(`/users?email=${formData.email}`);
      if (checkUser.data.length > 0) {
        toast.error('Email sudah terdaftar!');
        return;
      }

      const newUser = { ...formData, role: 'user' };

      await api.post('/users', newUser);
      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error('Terjadi kesalahan saat registrasi.');
    }
  };

  return (
    <Card title="Register">
      <Form onSubmit={handleRegister}>
        <div>
          <Label htmlFor="nama">Nama Lengkap</Label>
          <Input name="nama" placeholder="Nama Anda" onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
        <Button type="submit">Daftar Sekarang</Button>
      </Form>
      <p className={styles.register}>
        Sudah punya akun? <a href="/login">Login</a>
      </p>
    </Card>
  );
}

export default Register;