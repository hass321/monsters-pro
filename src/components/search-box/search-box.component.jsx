import React from 'react';
import './search-box.styles.css';

export const SearchBox = ({ placeholder, handleChange }) => (
    <div className="search-container">
        <input 
            className="search-box"
            type="search"
            placeholder={placeholder}
            onChange={handleChange}
        />
    </div>
);
