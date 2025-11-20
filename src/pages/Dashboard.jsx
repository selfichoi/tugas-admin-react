import React from 'react';
import styles from './Dashboard.module.css';
import { useDashboardData } from '../utils/hooks';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';


const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('The width(-1) and height(-1) of chart')) {
    return; 
  }
  originalWarn(...args);
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || { nama: 'Pengguna' };
  const { data, isLoading } = useDashboardData();

  if (isLoading) return <div style={{ padding: '20px' }}>Loading Dashboard Data...</div>;

  const totalMhs = data?.mahasiswa?.length || 0;
  const totalDosen = data?.dosen?.length || 0;
  const totalMatkul = data?.matkul?.length || 0;
  const totalKelas = data?.kelas?.length || 0;

  const dataBar = [
    { name: 'Mahasiswa', jumlah: totalMhs },
    { name: 'Dosen', jumlah: totalDosen },
    { name: 'Matkul', jumlah: totalMatkul },
    { name: 'Kelas', jumlah: totalKelas },
  ];

  const users = data?.users || [];
  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;
  const dataPie = [
    { name: 'Admin', value: adminCount },
    { name: 'User', value: userCount },
  ];

  const dataArea = data?.kelas?.map(k => ({
    name: k.namaKelas,
    kapasitas: parseInt(k.kapasitas) || 0
  })) || [];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Dashboard Eksekutif</h3>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Selamat Datang, {user.nama}! 👋</h2>
          <p style={{ color: '#6b7280' }}>Berikut adalah laporan statistik sistem akademik hari ini.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <StatCard title="Total Mahasiswa" value={totalMhs} color="#3b82f6" />
          <StatCard title="Total Dosen" value={totalDosen} color="#10b981" />
          <StatCard title="Mata Kuliah" value={totalMatkul} color="#f59e0b" />
          <StatCard title="Total Kelas" value={totalKelas} color="#ef4444" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginBottom: '20px', color: '#374151' }}>Statistik Data Akademik</h4>
            <div style={{ width: '100%', height: 300, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataBar}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#8884d8" name="Jumlah Data" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ marginBottom: '20px', color: '#374151' }}>Komposisi Pengguna Sistem</h4>
            <div style={{ width: '100%', height: 300, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {dataPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ marginBottom: '20px', color: '#374151' }}>Analisis Kapasitas Kelas</h4>
          <div style={{ width: '100%', height: 300, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataArea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="kapasitas" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Kapasitas (Orang)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      borderLeft: `5px solid ${color}`
    }}>
      <h5 style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{title}</h5>
      <h2 style={{ margin: '10px 0 0 0', fontSize: '2rem', color: '#111827' }}>{value}</h2>
    </div>
  );
}

export default Dashboard;