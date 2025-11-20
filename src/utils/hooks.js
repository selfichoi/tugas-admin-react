import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';
import toast from '../helpers/toastHelper';

const fetchPaginatedData = async (url, page, limit = 5) => {
  const response = await api.get(url);
  const allData = response.data;
  const totalItems = allData.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    data: allData.slice(startIndex, endIndex),
    totalItems,
    totalPages: totalPages || 1,
    allData: allData 
  };
};

const fetchAllData = async (url) => {
  const response = await api.get(url);
  return response.data;
};

export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const [mhs, dosen, matkul, kelas, users] = await Promise.all([
        api.get('/mahasiswa'),
        api.get('/dosen'),
        api.get('/matakuliah'),
        api.get('/kelas'),
        api.get('/users')
      ]);
      return {
        mahasiswa: mhs.data,
        dosen: dosen.data,
        matkul: matkul.data,
        kelas: kelas.data,
        users: users.data
      };
    }
  });
};

export const useAllDosen = () => useQuery({ queryKey: ['all-dosen'], queryFn: () => fetchAllData('/dosen') });
export const useAllMatkul = () => useQuery({ queryKey: ['all-matkul'], queryFn: () => fetchAllData('/matakuliah') });
export const useAllMahasiswa = () => useQuery({ queryKey: ['all-mahasiswa'], queryFn: () => fetchAllData('/mahasiswa') });
export const useAllKelas = () => useQuery({ queryKey: ['all-kelas'], queryFn: () => fetchAllData('/kelas') });


export const useMahasiswa = (page = 1) => useQuery({ queryKey: ['mahasiswa', page], queryFn: () => fetchPaginatedData('/mahasiswa', page), keepPreviousData: true });
export const useDosen = (page = 1) => useQuery({ queryKey: ['dosen', page], queryFn: () => fetchPaginatedData('/dosen', page), keepPreviousData: true });
export const useMatkul = (page = 1) => useQuery({ queryKey: ['matakuliah', page], queryFn: () => fetchPaginatedData('/matakuliah', page), keepPreviousData: true });
export const useKelas = (page = 1) => useQuery({ queryKey: ['kelas', page], queryFn: () => fetchPaginatedData('/kelas', page), keepPreviousData: true });
export const useUsers = (page = 1) => useQuery({ queryKey: ['users', page], queryFn: () => fetchPaginatedData('/users', page), keepPreviousData: true });

const createMutation = (key, url, label) => {
  const queryClient = useQueryClient();
  return {
    add: useMutation({
      mutationFn: (newData) => api.post(url, newData),
      onSuccess: () => {
        queryClient.invalidateQueries([key]);
        queryClient.invalidateQueries([`all-${key}`]);
        queryClient.invalidateQueries(['dashboard-data']);
        toast.success(`${label} berhasil ditambahkan!`);
      },
      onError: () => toast.error(`Gagal menambah ${label}`)
    }),
    update: useMutation({
      mutationFn: (data) => api.put(`${url}/${data.id}`, data),
      onSuccess: () => {
        queryClient.invalidateQueries([key]);
        queryClient.invalidateQueries([`all-${key}`]);
        queryClient.invalidateQueries(['dashboard-data']);
        toast.success(`${label} berhasil diupdate!`);
      },
      onError: () => toast.error(`Gagal update ${label}`)
    }),
    remove: useMutation({
      mutationFn: (id) => api.delete(`${url}/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries([key]);
        queryClient.invalidateQueries([`all-${key}`]);
        queryClient.invalidateQueries(['dashboard-data']);
        toast.success(`${label} berhasil dihapus!`);
      },
      onError: () => toast.error(`Gagal menghapus ${label}`)
    })
  };
};

export const useMutationMahasiswa = () => { const m = createMutation('mahasiswa', '/mahasiswa', 'Mahasiswa'); return { addMahasiswa: m.add, updateMahasiswa: m.update, deleteMahasiswa: m.remove }; };
export const useMutationDosen = () => { const m = createMutation('dosen', '/dosen', 'Dosen'); return { addDosen: m.add, updateDosen: m.update, deleteDosen: m.remove }; };
export const useMutationMatkul = () => { const m = createMutation('matakuliah', '/matakuliah', 'Matkul'); return { addMatkul: m.add, updateMatkul: m.update, deleteMatkul: m.remove }; };
export const useMutationKelas = () => { const m = createMutation('kelas', '/kelas', 'Kelas'); return { addKelas: m.add, updateKelas: m.update, deleteKelas: m.remove }; };
export const useMutationUsers = () => { const m = createMutation('users', '/users', 'User'); return { addUser: m.add, updateUser: m.update, deleteUser: m.remove }; };