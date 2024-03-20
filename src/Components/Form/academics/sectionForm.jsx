import React, { useEffect } from 'react'
import ControlledTextField from '../../TextFielld/TextField'
import ControlledButton from '../../Button/Buttton'
import { createData, updateData  } from '../../../utils/api'
import { useCrudModal } from '../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../utils/context/toastContext';
import { Stack } from '@mui/material'
import { z } from 'zod'
import requiredString from '../../../utils/Schema/formSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const SectionForm = ({displayData, modalData: propModalData}) => {

    const { closeModal } = useCrudModal()
    const { ToastMessege } = useToastMessege()
    const classSchema = z.object({
        name: requiredString("section is required")
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(classSchema)
    });

    useEffect(() => {
      if (propModalData) {
        setValue('name', propModalData.name);
      }
    }, [propModalData]);
  
    const onSubmit = async (data, e) => {
      e.preventDefault();
    
      const formData = {
        id: propModalData ? propModalData.id : undefined,
        name: data.name,
        type: 'section'
      };
      if (propModalData) {
        const response = await updateData("/update", formData);
        const messege = response.data.status
        console.log(messege)
        ToastMessege(
         messege? "Updated Successfully" : "Already Exist",
         "top-right",
         false,
         true,
         true,
         true,
         undefined,
         "colored",
         messege? "success" : "warning"
     )
     } else {
       const response = await createData("/save", formData);
       const messege = response.data.status === "CREATED"
             ToastMessege(
                  messege? "Added Successfully": "Already Exist",
                   "top-right",
                   false,
                   true,
                   true,
                   true,
                   undefined,
                   "colored",
                   messege? "success" : "warning"
               )
     }
     closeModal();
     displayData();
      closeModal();
      displayData();
    };
    
  return (
    <div className='h-full w-full p-1'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <ControlledTextField
                    name='name'
                    label='Section'
                    size='small'
                    control={control}
                    value={propModalData? propModalData : "" }
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />          
            </Stack>

            <div className="flex my-5 justify-end gap-4">

                <ControlledButton
                    text='Submit'
                    variant='contained'
                    size='small'
                    type='submit'
                    // onClick={handleChange}
                    color='primary'
                />
                <ControlledButton
                    text='Cancel'
                    variant='outlined'
                    size='small'
                    color='primary'
                    onClick={closeModal}
                />       
            </div>        
        </form>

    </div>
  )
}

export default SectionForm