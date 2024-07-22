import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import 'chart.js/auto';
import '../components/Dashboard/dash.css';
import NavBar from '../components/Header/Header';

const USERS_PER_PAGE = 10;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transformed-data', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response && response.data) {
          setUsers(response.data.users);
        } else {
          throw new Error('Users not found');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.put(`http://localhost:3000/auth/${userId}`, { role: newRole }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      // Refresh data
      const response = await axios.get('http://localhost:3000/transformed-data', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setIsDialogOpen(true);
  };

  const confirmDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/auth/${deleteUserId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        window.alert('User deleted successfully!');
        // Remove the deleted user from the state
        const updatedUsers = users.filter(user => user.id !== deleteUserId);
        setUsers(updatedUsers);
      } else {
        throw new Error(`Error deleting user: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'previous') {
      setCurrentPage(Math.max(currentPage - 1, 1));
    } else if (direction === 'next') {
      const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
      setCurrentPage(Math.min(currentPage + 1, totalPages));
    }
  };

  const getUsersForCurrentPage = () => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return users.slice(startIndex, endIndex);
  };

  return (
    <div className="dashboard">
      <NavBar />
      <h1 className="dashboard-title">User List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="user-list-container">
          <table className="user-list-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getUsersForCurrentPage().map((user, index) => (
                <tr key={user.id}>
                  <td>{(currentPage - 1) * USERS_PER_PAGE + index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td>{user.role}</td>
                  <td className="action-buttons">
                    <button
                      className="role"
                      onClick={() =>
                        handleChangeRole(user.id, user.role === 'user' ? 'admin' : 'user')
                      }
                    >
                      {user.role === 'user' ? 'Promote to Admin' : 'Demote to User'}
                    </button>
                    <button className="adminDelete" onClick={() => handleDeleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-buttons">
            <Button
              variant="contained"
              disabled={currentPage === 1}
              onClick={() => handlePageChange('previous')}
              sx={{ backgroundColor: '#17bf9e', color: 'white' }}
            >
              Previous
            </Button>
            <span className="page-number">{currentPage}</span>
            <Button
              variant="contained"
              disabled={currentPage === Math.ceil(users.length / USERS_PER_PAGE)}
              onClick={() => handlePageChange('next')}
              sx={{ backgroundColor: '#17bf9e', color: 'white' }}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteUser} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
