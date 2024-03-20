import React from 'react'

import { Stack } from '@mui/material'
import ControlledTextField from '../../TextFielld/TextField'
import ControlledButton from '../../Button/Buttton'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import requiredString from '../../../utils/Schema/formSchema'


const ParentForm = ({onClick}) => {

    const parentSchema = z.object({
        firstName: requiredString("firstname is required"),
        middleName: requiredString("middlename is required"),
        lastName: requiredString("lastname is required"),
        phoneNumber: requiredString("phone numner is required"),
        street: requiredString("street is required"),
        barangay: requiredString("barangay is required"),
        city: requiredString("city is required"),
        zipCode: requiredString("zipcode is required"),
        email: requiredString("email is required").email("Invalid Email"),
        password: requiredString("password is required")
    });

    const {
        control,
        handleSubmit,
        handleChange,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(parentSchema)
    });

    const onSubmit = (data, e)=> {
        e.preventDefault();
        console.log("success", data);
    }

  return (
    <div className='h-full w-full p-1'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                    
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='First Name'
                        name='firstName'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />            
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Middle Name'
                        name='middleName'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.middleName}
                        helperText={errors.middleName?.message}
                    />
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Last Name'
                        name='lastName'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />               
                </Stack>
                <Stack direction="row" spacing={1}>
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Phone Number'
                        name='phoneNumber'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                    />
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Street'
                        name='street'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.street}
                        helperText={errors.street?.message}
                    />            
                </Stack>
                <Stack direction="row" spacing={1}>
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Barangay'
                        name='barangay'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.barangay}
                        helperText={errors.barangay?.message}
                    />
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='City'
                        name='city'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                        
                    />
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Zip Code'
                        name='zipCode'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode?.message}
                    />                
                </Stack>
                <Stack direction="row" spacing={1}>
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Email'
                        name='email'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <ControlledTextField
                        size='small'
                        variant='outlined'
                        label='Password'
                        name='password'
                        onChange={handleChange}
                        control={control}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />                  
                </Stack>            
    

        </Stack>
        <div className="flex my-5 justify-end gap-4">
            <ControlledButton
                text='Submit'
                variant='contained'
                size='small'
                color='primary'
                type="submit"
            />
            <ControlledButton
                text='Cancel'
                variant='outlined'
                size='small'
                color='primary'
                onClick={onClick}
            />       
        </div>
        </form>
    </div>
  )
}

export default ParentForm