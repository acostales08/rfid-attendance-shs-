import React, {useEffect, useState} from 'react'
import { Stack, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ControlledTextField from '../Components/TextFielld/TextField'
import requiredString from '../utils/Schema/formSchema'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledButton, ControlledTypography } from '../Components'
import { parentCreateAcc } from '../utils/api'
import { useToastMessege } from '../utils/context/toastContext'
import { createData } from '../utils/api'

const ParentRegistrationForm = () => {
  const [ emailExist, setEmailExist ] = useState(false)
  const navigate = useNavigate()

  const { ToastMessege } = useToastMessege();

  const RegistrationSchema = z.object({
    firstName: requiredString("please input your firstname"),
    middleName: requiredString("please input your firstname"),
    lastName: requiredString("please input your firstname"),
    phoneNumber: requiredString("please input your phoneNumber"), 
    email: requiredString("please input your firstname"),
    password: requiredString("please input your firstname"),
    conpassword: requiredString("please confirm your password")

  })

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(RegistrationSchema)
  });

  const watchPassword = watch('password', ''); 

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const formData = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      credentials: {
        email: data.email,
        password: data.password,
        userType: "parent"
      },
    }
    const inputEmail = {
      email: data.email
    }
    const isSame = data.password === data.conpassword
    console.log(isSame)
      const response = await createData('/email-exist', inputEmail);
      const message = response.data;
      if(message === "exists"){
        setEmailExist(true)
      }else{
        if(isSame){
          try{
            const response = await parentCreateAcc('/createParentAccount', formData)
            const messege = response.data
            console.log(messege)
            if(response.data === "Created successfully."){
              ToastMessege(
                messege,
                'top-right',
                false,
                true,
                true,
                true,
                undefined,
              'colored',
              'success'
              );
                navigate('/')
              }
          }catch(error){
              console.error("error inserting", error)
              if(error.response.data){
                ToastMessege(
                "your name and number not yet registered",
                'top-right',
                false,
                true,
                true,
                true,
                undefined,
              'colored',
              'warning'
              );
              }
          }           
        } 
      }
  
  }
  return (
    <div className='h-screen w-full bg-[#f3f0f2] flex'>
        <div className="h-full w-full flex justify-center items-center">
          <Paper elevation={2}>
            <div className="p-6">
                <ControlledTypography
                  variant='h5'
                  text="Parent Registration Form"
                  style={{
                    padding: '10px',
                    color: '#4d494f'
                  }}
                />
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={2} style={{padding: '10px'}}>
                      <Stack direction="row" spacing={2}>
                        <ControlledTextField
                          variant="outlined"
                          label="Firstname"
                          size="normal"
                          name="firstName"
                          control={control}
                          error={!!errors.firstName}
                          helperText={errors.firstName?.message}
                        />
                        <ControlledTextField
                          variant="outlined"
                          label="middlename"
                          size="normal"
                          name="middleName"
                          control={control}
                          error={!!errors.middleName}
                          helperText={errors.middleName?.message}
                        />
                        <ControlledTextField
                          variant="outlined"
                          label="lastname"
                          size="normal"
                          name="lastName"
                          control={control}
                          error={!!errors.lastName}
                          helperText={errors.lastName?.message}
                        />
                      </Stack>     
                      <ControlledTextField
                          variant="outlined"
                          label="phone number"
                          size="normal"
                          name="phoneNumber"
                          control={control}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                        />
                        <ControlledTextField
                          variant="outlined"
                          label="email"
                          size="normal"
                          name="email"
                          control={control}
                          error={!!errors.email || emailExist}
                          helperText={emailExist? "email is already exist" : errors.email?.message}
                        />
                      <Stack direction="row" spacing={3}>
                        <ControlledTextField
                          variant="outlined"
                          label="password"
                          size="normal"
                          name="password"
                          type="password"
                          control={control}
                          error={!!errors.password}
                          helperText={errors.password?.message}
                        />
                        <ControlledTextField
                          variant="outlined"
                          label="Confirm password"
                          size="normal"
                          name="conpassword"
                          type="password"
                          control={control}
                          error={!!errors.conpassword}
                          helperText={
                            errors.conpassword?.message ||
                            (watchPassword !== '' && watchPassword !== watch('conpassword') && 'Passwords not match')
                          }
                        />
                      </Stack>       
                  </Stack>
                  <div className="p-[10px]">
                    <ControlledButton
                      variant='contained'
                      text="Submit"
                      type="submit"
                      fullWidth
                    />
                  </div>            
                </form>                 
            </div>
          </Paper>
        </div>
    </div>
  )
}

export default ParentRegistrationForm