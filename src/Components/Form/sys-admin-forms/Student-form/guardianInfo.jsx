import React, {useEffect, useState} from 'react'
import { Stack} from '@mui/material'
import ControlledTextField from '../../../TextFielld/TextField'
import ControlledButton from '../../../Button/Buttton'
import { z } from 'zod'
import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import requiredString from '../../../../utils/Schema/formSchema'
import { useStepper } from '../../../../utils/context/stepperContext'
import { useCrudModal } from '../../../../utils/context/crudModalContext'
import useCount from '../../../../utils/hooks/useCount'

const GuardianInfo = () => {

    const {userData, setUserData, handleBack, handleNext, currentStep} = useStepper()
    const {closeModal, modalData } = useCrudModal()

     const studentSchema = z.object({
        parentFirstName: requiredString("required"),
        parentMiddleName: requiredString("required"),
        parentLastName: requiredString("required"),
        parentPhoneNo: requiredString("required") .refine(value => /^\d{11}$/.test(value), { 
            message: "Phone Number must be exactly 11 digits long"
        })
        .refine(value => !isNaN(parseInt(value)), { 
            message: "Phone Number must be a number" 
        }),
    });

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(studentSchema),
      });


      console.log(modalData?.[0])

      const studentinfo = modalData?.[0];

      useEffect(() => {
        if (studentinfo) {
            setValue("parentFirstName", studentinfo.parentFirstName || "");
            setValue("parentMiddleName", studentinfo.parentMiddleName || "");
            setValue("parentLastName", studentinfo.parentLastName || "");
            setValue("parentPhoneNo", studentinfo.parentPhoneNo || "");
        } else {
            setValue("parentFirstName", userData.parentFirstName || "");
            setValue("parentMiddleName", userData.parentMiddleName || "");
            setValue("parentLastName", userData.parentLastName || "");
            setValue("parentPhoneNo", userData.parentPhoneNo || "");
        }
    }, [studentinfo, setValue, userData]);
    

    const onSubmit = (data, e ) => {
        e.preventDefault()

        if(modalData){
            const formDatas = {
                ...userData,
                parentFirstName: data.parentFirstName,
                parentMiddleName: data.parentMiddleName,
                parentLastName: data.parentLastName,
                parentPhoneNo: data.parentPhoneNo,
            }
            setUserData(formDatas)
            handleNext()
        }else{
            const formData = {
                ...userData,
                parentFirstName: data.parentFirstName,
                parentMiddleName: data.parentMiddleName,
                parentLastName: data.parentLastName,
                parentPhoneNo: data.parentPhoneNo,
            }     
            setUserData(formData)
            handleNext()    
        }


      } 

  return (
    <div className='h-full w-full p-1'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='First Name (guardian)'
                    name='parentFirstName'
                    value={studentinfo? studentinfo.parentFirstName : ""}
                    control={control}
                    error={!!errors.parentFirstName}
                    helperText={errors.parentFirstName?.message}
                />            
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Middle Name'
                    name='parentMiddleName'
                    value={studentinfo? studentinfo.parentMiddleName : ""}
                    control={control}
                    error={!!errors.parentMiddleName}
                    helperText={errors.parentMiddleName?.message}
                />
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Last Name (guardian)'
                    name='parentLastName'
                    value={studentinfo? studentinfo.parentLastName : ""}
                    control={control}
                    error={!!errors.parentLastName}
                    helperText={errors.parentLastName?.message}
                />             
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Phone Number (guardian)'
                    name='parentPhoneNo'
                    value={studentinfo? studentinfo.parentPhoneNo : ""}
                    control={control}
                    error={!!errors.parentPhoneNo}
                    helperText={errors.parentPhoneNo?.message}
                />     
            </Stack>          
            <div className="flex my-5 justify-end gap-4">
                <ControlledButton
                    text='Back'
                    variant='contained'
                    size='small'
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    color='error'
                />
                    <ControlledButton
                    text='Next'
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

export default GuardianInfo