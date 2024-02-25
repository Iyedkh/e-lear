// src/components/Navigation.js

import React from 'react';
import './styles.css'; // Import the CSS file for styling

function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Catalog</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Community</a></li>
                <li><a href="#">Career Center</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;
