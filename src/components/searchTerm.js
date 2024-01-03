import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
    Box
  } from '@mui/material';


const Search = () => {

    const [searchTerm,setSearchTerm] = useState('');
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    console.log(term);
  }

    return (
        <>
              <Box
               sx={{
                width: 500,
                maxWidth: '100%',
                color:'white'

              }}
            >
              <TextField
                id="search"
                fullWidth
                variant='standard'
                label='Search'
                value={searchTerm}
                onChange={e => handleInputChange(e)}
              />
            </Box>
        </>
    );
}

export default Search;