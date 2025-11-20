import axios from 'axios';


const initialDb = {
  users: [
    { "id": "1", "email": "admin@kampus.com", "password": "123", "nama": "Super Admin", "role": "admin" },
    { "id": "2", "email": "maba@kampus.com", "password": "123", "nama": "Mahasiswa Baru", "role": "user" }
  ],
  dosen: [
    { "id": "1", "nidn": "123456", "nama": "Pak Budi", "bidang": "RPL", "maxSks": 12 },
    { "id": "2", "nidn": "654321", "nama": "Bu Susi", "bidang": "Jaringan", "maxSks": 9 }
  ],
  matakuliah: [
    { "id": "1", "kode": "A11.4510", "nama": "Pemrograman Web", "sks": "3" },
    { "id": "2", "kode": "A11.4511", "nama": "Jaringan Komputer", "sks": "3" },
    { "id": "3", "kode": "A11.4512", "nama": "Basis Data", "sks": "4" }
  ],
  mahasiswa: [
    { "id": "1", "nim": "20211001", "nama": "Selfi", "status": true, "maxSks": 24 },
    { "id": "2", "nim": "20211002", "nama": "Budi Doremi", "status": true, "maxSks": 20 },
    { "id": "3", "nim": "20211003", "nama": "Siti Aminah", "status": true, "maxSks": 24 }
  ],
  kelas: [
    { "id": "1", "namaKelas": "4401", "kapasitas": "30", "matkulId": "1", "dosenId": "1", "mahasiswaIds": [] },
    { "id": "2", "namaKelas": "4402", "kapasitas": "25", "matkulId": "2", "dosenId": "2", "mahasiswaIds": [] }
  ]
};

const DB_KEY = 'kampus_db_prod';


const getLocalDB = () => {
  const db = localStorage.getItem(DB_KEY);
  if (!db) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialDb));
    return initialDb;
  }
  return JSON.parse(db);
};

const saveLocalDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

const fakeApi = {
  get: async (url) => {
    await delay(300); 
    const db = getLocalDB();
    
    const cleanUrl = url.split('?')[0];
    const collectionKey = cleanUrl.replace('/', '');
    let data = db[collectionKey] || [];

    if (url.includes('?')) {
      const queryString = url.split('?')[1];
      const params = new URLSearchParams(queryString);
      
      data = data.filter(item => {
        let isValid = true;
        for (const [key, value] of params.entries()) {
          if (key === '_page' || key === '_limit') continue;
          if (item[key] != value) isValid = false;
        }
        return isValid;
      });
    }

    return { data };
  },

  post: async (url, newData) => {
    await delay(300);
    const db = getLocalDB();
    const collectionKey = url.replace('/', '');
    
    const id = Math.random().toString(36).substr(2, 9);
    const itemToSave = { id, ...newData };
    
    db[collectionKey] = [...(db[collectionKey] || []), itemToSave];
    saveLocalDB(db);
    
    return { data: itemToSave };
  },

  put: async (url, updatedData) => {
    await delay(300);
    const db = getLocalDB();
    const parts = url.split('/');
    const collectionKey = parts[1]; 
    const id = parts[2]; 
    
    db[collectionKey] = db[collectionKey].map(item => 
      item.id == id ? { ...item, ...updatedData } : item
    );
    saveLocalDB(db);
    
    return { data: updatedData };
  },

  delete: async (url) => {
    await delay(300);
    const db = getLocalDB();
    const parts = url.split('/');
    const collectionKey = parts[1];
    const id = parts[2];
    
    db[collectionKey] = db[collectionKey].filter(item => item.id != id);
    saveLocalDB(db);
    
    return { data: { success: true } };
  }
};


const api = import.meta.env.DEV ? axiosInstance : fakeApi;

export default api;