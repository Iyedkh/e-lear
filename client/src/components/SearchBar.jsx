import React from 'react';
import { InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const StyledInputWrapper = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
});

const StyledSearchIconWrapper = styled('div')({
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    '&:hover': {
        backgroundColor: '#f1f1f1',
    },
});

const StyledInputBase = styled(InputBase)({
    padding: '8px 12px',
    marginLeft: 8,
    borderRadius: 4,
    width: 200,
});

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = () => {
        onSearch(searchQuery);
    };

    return (
        <StyledInputWrapper>
            <StyledSearchIconWrapper>
                <SearchIcon />
            </StyledSearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                value={searchQuery}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
            />
            <button onClick={handleSubmit}>Search</button>
        </StyledInputWrapper>
    );
};

export default SearchBar;
