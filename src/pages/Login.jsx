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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email dan Password wajib diisi!');
      return;
    }

    try {
      const response = await api.get(`/users?email=${email}&password=${password}`);

      if (response.data.length > 0) {
        const user = response.data[0];

        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success(`Login berhasil! Halo ${user.nama}`);
        
        navigate('/');
      } else {
        toast.error('Email atau password salah.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan server.');
      console.error(error);
    }
  };

  return (
    <Card title="Login">
      <Form onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
      </Form>
      <p className={styles.register}>
        Belum punya akun? <a href="/register">Daftar</a>
      </p>
    </Card>
  );
}

export default Login;