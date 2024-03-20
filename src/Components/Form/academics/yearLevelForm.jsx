import React,{ useEffect, useState } from 'react'
import ControlledTextField from '../../TextFielld/TextField'
import ControlledButton from '../../Button/Buttton'
import { Stack } from '@mui/material'
import { z } from 'zod'
import requiredString from '../../../utils/Schema/formSchema'
import { useCrudModal } from '../../../utils/context/crudModalContext'
import { useToastMessege } from '../../../utils/context/toastContext';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createData, updateData } from '../../../utils/api'

const YearLevelForm = ({displayData, modalData: propModalData}) => {

    const { closeModal } = useCrudModal()
    const { ToastMessege } = useToastMessege()
    const courseSchema = z.object({
        name: requiredString("Year Level is required"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(courseSchema)
    });

    useEffect(()=> {
        if(propModalData){
            setValue("name", propModalData.name)
        }
    }, [propModalData])


    const onSubmit = async (data, e) => {
        e.preventDefault()

        const formData = {
            id: propModalData? propModalData.id : undefined,
            name: data.name,
            type: "yearLevel"
        }
        if (propModalData) {
            const response = await updateData("/update", formData);

         } else {
           const response = await createData("/save", formData);
           const message = response.data.status === "CREATED"
                ToastMessege(
                       message? "Added Successfully": "Already Exist",
                       "top-right",
                       false,
                       true,
                       true,
                       true,
                       undefined,
                       "colored",
                       message? "success" : "warning"
                   )
         }
         closeModal();
         displayData();
        closeModal()
        displayData()
    }
  return (
    <div className='h-full w-full p-1'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <ControlledTextField
                    name='name'
                    label='Year Level'
                    size='small'
                    value={propModalData? propModalData.name : ""}
                    control={control}
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

export default YearLevelForm