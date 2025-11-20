import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Mahasiswa from './pages/Mahasiswa';
import DetailMahasiswa from './pages/DetailMahasiswa';
import Dosen from './pages/Dosen';
import Matkul from './pages/Matkul';
import Users from './pages/Users';
import Kelas from './pages/Kelas'; 

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="mahasiswa" element={<Mahasiswa />} />
        <Route path="mahasiswa/:nim" element={<DetailMahasiswa />} />
        <Route path="dosen" element={<Dosen />} />
        <Route path="matakuliah" element={<Matkul />} />
        
        <Route path="kelas" element={<Kelas />} />
        
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;