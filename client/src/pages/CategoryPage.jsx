import React, { useState, useEffect } from 'react';
import NavBar from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoryPage.css';

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchInput, setSearchInput] = useState('');

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

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:3000/categories/${categoryId}`);
            setCategories(categories.filter(category => category._id !== categoryId));
            setFilteredCategories(filteredCategories.filter(category => category._id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
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
                                    <Link to={`/courses/${category._id}`} className="btn2" > Courses</Link>
                                    <button onClick={() => handleDelete(category._id)} className="delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;
