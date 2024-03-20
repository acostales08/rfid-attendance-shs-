import React, {useState} from 'react'
import ControlledTextField from '../../TextFielld/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import requiredString from '../../../utils/Schema/formSchema'
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';
import { useToastMessege } from '../../../utils/context/toastContext';
import { useStepper } from '../../../utils/context/stepperContext';

const ThirdStep = () => { 

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [ loading, setLoading ] = useState(false)

  const { ToastMessege } = useToastMessege();
  const { userData, submitData } = useStepper()
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConPassword((show) => !show);

  const ChangePassword = z.object({
      newPassword : requiredString("please input your new password"),
      conPassword : requiredString("please Confirm your new password")
  })

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch
  } = useForm({
    resolver: zodResolver(ChangePassword)
  })
  const watchPassword = watch('newPassword', ''); 

  const onSubmit = async(data, e) => {
    setLoading(true)
    e.preventDefault()

    const  formData = {
      email: userData.email,
      password: data.newPassword
    }
    const isSame = data.newPassword === data.conPassword
    if(isSame){
      const response = await axios.post(`${baseUrl}/email/v1/api/update-password`, formData)
      const message = response.data
      if(message === "success"){
        ToastMessege(
          "Password changed successfully.",
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
        submitData()
      }
    }else{
      
    }
  }

  return (
        <div className='w-full px-12'>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className='h-[14vh] flex justify-center items-start gap-5 flex-col'>
            <ControlledTextField
                fullWidth
                label='new password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                name='newPassword'
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                control={control}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />
            <ControlledTextField
                fullWidth
                label='confirm password'
                variant='outlined'
                type={showConPassword ? 'text' : 'password'}
                name='conPassword'
                error={!!errors.conPassword}
                helperText={
                  errors.conPassword?.message ||
                  (watchPassword !== '' && watchPassword !== watch('conPassword') && 'Passwords not match')
                }
                control={control}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                        {showConPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />
            </div>
            <div className='h-[22vh] w-full flex justify-center items-center'>
              <div className="w-full">
                  <Button
                      variant="contained"
                      type='submit'
                      color="primary"
                      fullWidth
                      disabled={loading}
                      startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? 'Loading...' : 'Next'}
                  </Button>            
              </div>
            </div>
          </form>
        </div>
  )
}

export default ThirdStep