import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search for a country...',
}) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        backgroundColor: 'var(--input-background-color)',
        color: 'var(--text-color)',
        '& .MuiInputBase-input::placeholder': {
          color: 'var(--text-color)',
          opacity: 1,
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--text-color)',
        },
        '& .MuiSvgIcon-root': {
          color: 'var(--icon-color)',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
