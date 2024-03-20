import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@mui/material'

const ControlledTextField = (props) => {
  const { 
    variant, 
    size, 
    control, 
    name, 
    label, 
    value, 
    onChange, 
    error, 
    helperText, 
    type, 
    InputProps, 
    disabled,
    autoFocus,
    ...rest } = props
  
  return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                  variant={variant}
                  label={label}
                  value={value}
                  name={name}
                  onChange={onChange}
                  {...field}
                  error={error}
                  helperText={helperText}
                  type={type}
                  size={size}
                  sx={{ borderColor: error ? 'red' : undefined }}
                  InputProps={InputProps}
                  fullWidth
                  autoComplete="off"
                  autoFocus={autoFocus}
                  disabled={disabled}
                  {...rest}
              />
            )}
        />
  )
}

export default ControlledTextField     

