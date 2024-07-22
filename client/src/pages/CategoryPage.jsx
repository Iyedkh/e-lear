import React, { useState, useEffect } from 'react';
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                if (response.status === 200) {
                    setCategories(response.data);
                    setFilteredCategories(response.data);
                } else {
                    console.error('Failed to fetch categories:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
        filterCategories(event.target.value);
    };

    const filterCategories = (query) => {
        const filtered = categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredCategories(filtered);
    };

    const handleDelete = (categoryId) => {
        setDeleteCategoryId(categoryId);
        setIsDialogOpen(true);
    };

    const confirmDeleteCategory = async () => {
        try {
            await axios.delete(`http://localhost:3000/categories/${deleteCategoryId}`);
            setCategories(categories.filter(category => category._id !== deleteCategoryId));
            setFilteredCategories(filteredCategories.filter(category => category._id !== deleteCategoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        } finally {
            setIsDialogOpen(false);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="hi">
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for category"
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                    <div className="saved">
                        <Link to={`/create-category`} className="btn2">Create Category</Link>
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td className='action-buttons'>
                                    <Link to={`/courses/${category._id}`} className="btn2"> Courses</Link>
                                    <button onClick={() => handleDelete(category._id)} className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this category?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteCategory} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CategoryPage;
