"use client"
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ onSearch }) => {
    const [Query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='search'>
            <SearchIcon />
            <input type="text" placeholder="Search Mail" value={Query} onChange={handleChange} />
        </div>
    );
};

export default SearchComponent;
