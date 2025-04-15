import React, { useState } from 'react'
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';

const SearchContainer = styled.div`
    max-width: 550px;
    display: flex;
    border: 1px solid ${({theme})=>theme.text_secondary};
    width: 80%;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    gap: 6px;
    align-items: center;
    background: ${({theme})=>theme.bg};
    transition: all 0.3s ease;
    &:focus-within {
        border-color: ${({theme})=>theme.primary};
        box-shadow: 0 0 0 2px ${({theme})=>theme.primary + 20};
    }
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    color: inherit;
    font-size: 16px;
    background: transparent;
    &::placeholder {
        color: ${({theme})=>theme.text_secondary};
    }
`;

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    return(
        <SearchContainer>
            <SearchOutlined style={{ fontSize: '22px', color: 'inherit' }} />
            <StyledInput 
                id="searchbar" 
                placeholder="Search by prompt or author..." 
                value={searchQuery}
                onChange={handleChange}
            />
        </SearchContainer>
    )
}

export default SearchBar;