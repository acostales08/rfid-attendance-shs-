import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import baseUrl from '../../../utils/baseUrl';
import { useStepper } from '../../../utils/context/stepperContext';
import { useToastMessege } from '../../../utils/context/toastContext';

const SecondStep = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first: '',
    second: '',
    third: '',
    fourth: ''
  });

  const { ToastMessege } = useToastMessege();
  const { handleNext, userData } = useStepper();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = {
      email: userData.email,
      code: `${formData.first}${formData.second}${formData.third}${formData.fourth}`
    }
    try {
      const response = await axios.post(`${baseUrl}/email/v1/api/validate-code`, form);
    
      const message = response.data;
      if (message === 'success') {
        handleNext();
      } else {
        ToastMessege(
          'Code not match',
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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
        <div className='w-full'>
          <form action='' onSubmit={onSubmit}>
            <div className='h-[13vh] flex justify-center items-start'>
              <Stack spacing={1}>
                <Stack direction="row" spacing={6}>
                  <TextField
                    name='first'
                    value={formData.first}
                    onChange={handleChange}
                    inputProps={{ maxLength: 1 }}
                    className='w-[42px]'
                  />
                  <TextField
                    name='second'
                    value={formData.second}
                    onChange={handleChange}
                    inputProps={{ maxLength: 1 }}
                    className='w-[42px]'
                  />
                  <TextField
                    name='third'
                    value={formData.third}
                    onChange={handleChange}
                    inputProps={{ maxLength: 1 }}
                    className='w-[42px]'
                  />
                  <TextField
                    name='fourth'
                    value={formData.fourth}
                    onChange={handleChange}
                    inputProps={{ maxLength: 1 }}
                    className='w-[42px]'
                  />
                </Stack>
              </Stack>
            </div>
            <div className='h-[7vh] w-full flex justify-center items-center'>
              <div className='w-full'>
                <Button
                  variant='contained'
                  type='submit'
                  color='primary'
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
  );
};

export default SecondStep;
