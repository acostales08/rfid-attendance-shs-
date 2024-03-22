import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from 'react-hook-form';

const BasicSelectField = (props) => {
  const {
    label,
    name,
    control,
    error,
    helperText,
    options,
    size,
    value, 
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value} 
      render={({ field: { onChange, onBlur, value: fieldValue } }) => ( 
        <TextField
          select
          label={label}
          variant="outlined"
          fullWidth
          error={error}
          size={size}
          value={fieldValue} 
          onBlur={onBlur} 
          onChange={(e) => onChange(e.target.value)} 
          helperText={error && helperText}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.classes}>
              {option.classes}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default BasicSelectField;