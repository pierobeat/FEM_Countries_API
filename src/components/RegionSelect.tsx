import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type RegionSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const RegionSelect: React.FC<RegionSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const menuItemStyles = { color: 'var(--text-color)' };

  return (
    <FormControl fullWidth variant="outlined">
      <Select
        value={value}
        onChange={handleChange}
        displayEmpty
        sx={{
          backgroundColor: 'var(--select-background-color)',
          color: 'var(--text-color)',
          '& .MuiSelect-icon': {
            color: 'var(--icon-color)',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--text-color)',
          },
        }}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value="" sx={{ fontWeight: 'bold', ...menuItemStyles }}>
          Filter By Region
        </MenuItem>
        {['Africa', 'America', 'Asia', 'Europe', 'Oceania'].map((region) => (
          <MenuItem key={region} value={region} sx={{ color: 'var(--text-color)' }}>
            {region}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default RegionSelect;
