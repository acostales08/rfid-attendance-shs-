import React,{useState, useEffect} from 'react'
import ControlledTextField from '../../TextFielld/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { z } from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import requiredString from '../../../utils/Schema/formSchema';
import { useStepper } from '../../../utils/context/stepperContext';
import baseUrl from '../../../utils/baseUrl';

const FirstStep = () => {

  const [ loading, setLoading ] = useState(false)
  const [ emailExist, setEmailExist ] = useState(false)
  const { handleNext, setUserData } = useStepper()

  const emailSchema = z.object({
    email: requiredString("email is required").email("Invalid Email")
  }) 

  const {
      control,
      watch,
      handleSubmit,
      formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema)
  })

  const email = watch('email');
  useEffect(() => {
    setEmailExist(false);
  }, [email]);

  const onSubmit = async(data, e) => {
    setLoading(true)
      e.preventDefault()
      const formData = {
        email: data.email
      }
      setUserData(formData)
      try {
        const response = await axios.post(`${baseUrl}/email/v1/api/send-email`, formData)
        const message = response.data
        if(message === "success"){
            handleNext()
        }
      } catch (error) {
        if(error.response.data){
          setEmailExist(true)
        }
      }finally{
        setLoading(false)
      }

  }
  return (
    <div className='w-full'>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className='h-[13vh] flex justify-center items-start'>
           <ControlledTextField
                variant='outlined'
                label='Email'
                name='email'
                control={control}
                error={!!errors.email || emailExist}
                helperText={emailExist? "Email not exist" : errors.email?.message}
            />  
        </div>
        <div className='h-[7vh] w-full flex justify-center items-center'>
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

export default FirstStep