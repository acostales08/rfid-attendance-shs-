import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import ControlledTextField from '../../TextFielld/TextField'
import ControlledButton from '../../Button/Buttton'
import { useToastMessege } from '../../../utils/context/toastContext'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import requiredString from '../../../utils/Schema/formSchema'
import { useCrudModal } from '../../../utils/context/crudModalContext'
import { Announcement } from '../../../utils/api'


const AnnouncementForm = ({fetchData}) => {

  const { closeModal, modalData } = useCrudModal()
  const { ToastMessege } = useToastMessege();
  const announcementSchema = z.object({
    title: requiredString("please input title"),
    body: requiredString("please input announcement")
  })

  const { control, handleSubmit, setValue, formState: {errors} } = useForm({
    resolver: zodResolver(announcementSchema)
  })

  useEffect(()=> {
    if(modalData){
      setValue('title', modalData.date)
      setValue('body', modalData.body)
    }
  }, [modalData, setValue])

  console.log(modalData)
  const onSubmit = async(data, e) => {
    e.preventDefault()

    const formData = {
        id: modalData? modalData.id : undefined,
        date: data.title,
        body: data.body,      
        activated: 0
    }
    if(!modalData){
        try {
          const response = await Announcement('/create', formData)
        if(response.data === "success"){
          ToastMessege(
            "Successfully Created",
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
          closeModal()
          fetchData()          
        }

        } catch (error) {
          
        }
    }else{
      try {
        const response = await Announcement('/update', formData)
        if(response.data === "updated"){
          ToastMessege(
            "Updated Created",
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
        closeModal()
        fetchData()          
        }

      } catch (error) {
        
      }
    }



  }

  return (
    <div className='h-full w-full p-1'>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
            <ControlledTextField
              name="title"
              label="Announcement Title"
              variant="outlined"
              control={control}
              size="small"
              error={!!errors.title}
              helperText={errors.title?.message}
              value={modalData? modalData.title : ""}
            />
            <ControlledTextField
              name="body"
              label="Announcement"
              multiline
              rows={8}
              variant="outlined"
              control={control}
              size="small"
              error={!!errors.body}
              helperText={errors.body?.message}
              value={modalData? modalData.body : ""}
            />
        </Stack>
        <div className="flex my-5 justify-end gap-4">
            <ControlledButton
            text='Submit'
            variant='contained'
            size='small'
            type='submit'
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

export default AnnouncementForm