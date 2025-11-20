import React, { useState } from 'react';
import UserModal from '../components/UserModal';
import UserTable from '../components/UserTable';
import Button from '../components/Button';
import Pagination from '../components/Pagination'; 
import { swalConfirm } from '../helpers/swalHelper';
import styles from './Dashboard.module.css';
import { useUsers, useMutationUsers } from '../utils/hooks';

function Users() {
  const [page, setPage] = useState(1);

  const { data: queryData, isLoading } = useUsers(page);
  const { addUser, updateUser, deleteUser } = useMutationUsers();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = queryData?.data || [];
  const totalPages = queryData?.totalPages || 1;

  const handleSubmit = (formData) => {
    if (selectedUser) {
      updateUser.mutate({ ...formData, id: selectedUser.id });
    } else {
      addUser.mutate(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    swalConfirm('Hapus User?', 'User ini tidak akan bisa login lagi').then((result) => {
      if (result.isConfirmed) {
        deleteUser.mutate(id);
      }
    });
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const openEditModal = (usr) => {
    setSelectedUser(usr);
    setModalOpen(true);
  };

  if (isLoading) return <p style={{padding: '20px'}}>Loading Users...</p>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3>Manajemen User & Role</h3>
        <div style={{ width: '200px' }}>
          <Button onClick={openAddModal}>+ Tambah User</Button>
        </div>
      </div>
      <UserTable userList={users} openEditModal={openEditModal} onDelete={handleDelete} />
      
      <Pagination 
        page={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />

      <UserModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default Users;