import React, {useEffect, useState} from 'react'
import { Stack} from '@mui/material'
import ControlledTextField from '../../../TextFielld/TextField'
import ControlledButton from '../../../Button/Buttton'
import { useStepper } from '../../../../utils/context/stepperContext'
import { useCrudModal } from '../../../../utils/context/crudModalContext'
import { z } from 'zod'
import { useForm } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod'
import requiredString from '../../../../utils/Schema/formSchema'
import useCount from '../../../../utils/hooks/useCount'
import { createData } from '../../../../utils/api'


const TeacherInfo = () => {
    const [ emailExist, setEmailExist ] = useState(false)
    const [ tidExist, setTidExist ] = useState(false)
    const {  closeModal, modalData } = useCrudModal();
    const { teacher } = useCount()
    const { setUserData, userData, currentStep, handleBack, handleNext } = useStepper();

    const teacherSchema = z.object({
        employeeId: requiredString(" required").refine(value => !isNaN(parseInt(value)), { message: "Employee number must be a number" }),
        firstName: requiredString("required"),
        middleName: requiredString("required"),
        lastName: requiredString("required"),
        street: requiredString("required"),
        barangay: requiredString("required"),
        city: requiredString("required"),
        zipCode: requiredString("required").refine(value => !isNaN(parseInt(value)), { message: "zip code number must be a number" }),
        email: requiredString("required").email("Invalid Email"),
        password: requiredString("required"),
    });

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(teacherSchema),
        defaultValues: {
            employeeId: userData.employeeId || '',
            firstName: userData.firstName || '',
            middleName: userData.middleName || '',
            lastName: userData.lastName || '',
            street: userData.address?.street || '',
            barangay: userData.address?.barangay || '',
            city: userData.address?.city || '',
            zipCode: userData.address?.zip_code || '',
            email: userData.credentials?.email || '',
            password: userData.credentials?.password || '',
          },
      });

      const email = watch('email');
      const id = watch('employeeId')

      useEffect(() => {
        setEmailExist(false)
        setTidExist(false)
      }, [id, email])

      const teacherInfo = modalData?.[0]

      useEffect(() => {
        if (teacherInfo) {
          setValue("employeeId", teacherInfo.employeeId || "");
          setValue("firstName", teacherInfo.firstName || "");
          setValue("middleName", teacherInfo.middleName || "");
          setValue("lastName", teacherInfo.lastName || "");
      
          // Check if address exists before accessing its properties
          if (teacherInfo.address) {
            setValue("street", teacherInfo.address.street || "");
            setValue("barangay", teacherInfo.address.barangay || "");
            setValue("city", teacherInfo.address.city || "");
            setValue("zipCode", teacherInfo.address.zip_code || "");
          }
      
          // Check if credentials exist before accessing its properties
          if (teacherInfo.credentials) {
            setValue("email", teacherInfo.credentials.email || "");
            setValue("password", "sample"); // Assuming this is a default password
          }
        }
      }, [teacherInfo, setValue]);


      const onSubmit = async(data, e) => {
        e.preventDefault();
      if(modalData){
        const formDatas ={
            id: modalData?.[0].id,
            employeeId: data.employeeId,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            address: {
                street: data.street,
                barangay: data.barangay,
                city: data.city,
                zip_code: data.zipCode,
            },
            credentials: {
                email: data.email,
                ...(modalData === null && { password: data.password }),
                userType: "teacher"
            },
            
        }
        console.log(formDatas)
        setUserData(formDatas);
        handleNext();
      }else{
            const formData = {
            employeeId: data.employeeId,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            address: {
                street: data.street,
                barangay: data.barangay,
                city: data.city,
                zip_code: data.zipCode,
            },
            credentials: {
                email: data.email,
                ...(modalData === null && { password: data.password }),
                userType: "teacher"
            },
            };
            const inputedEmail = {
                email: data.email
            };
            const inputedIdNum = formData.employeeId;
            let teacherNum = false;
            
            if (Array.isArray(teacher) && teacher.some(t=> t.employeeId === inputedIdNum)) {
                teacherNum = true;
            }
            try {
                const response = await createData('/email-exist', inputedEmail);
                const message = response.data;
            
                if (message === "exists" && teacherNum) {
                    setEmailExist(true);
                    setTidExist(true);
                } else if (teacherNum) {
                    setTidExist(true);
                } else if (message === "exists") {
                    setEmailExist(true);
                } else if (!message && teacher === "No record") {
                    setUserData(formData);
                    handleNext();
                } else {
                    setUserData(formData);
                    handleNext();
                }
            } catch (error) {
                console.error("Error inserting email", error);
            }        
      }

      };
  return (
<div className='h-full w-full p-1'>
  <form action="" onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Employee Number'
          name='employeeId'
          control={control}
          value={modalData? modalData[0]?.employeeId : ""}
          error={!!errors.employeeId || tidExist}
          helperText={tidExist ? "Student ID number already exists" : errors.employeeId?.message}
        />  
      </Stack>
      <Stack direction="row" spacing={1}>
        <ControlledTextField
          size='small'
          variant='outlined'
          label='First Name'
          name='firstName'
          control={control}
          value={modalData?.firstName || ""}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />            
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Middle Name'
          name='middleName'
          control={control}
          value={modalData?.middleName || ""}
          error={!!errors.middleName}
          helperText={errors.middleName?.message}
        />
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Last Name'
          name='lastName'
          control={control}
          value={modalData?.lastName || ""}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />               
      </Stack>
      <Stack direction="row" spacing={1}>
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Street'
          name='street'
          control={control}
          value={modalData?.address?.street || ""}
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
          control={control}
          value={modalData?.address?.barangay || ""}
          error={!!errors.barangay}
          helperText={errors.barangay?.message}
        />
        <ControlledTextField
          size='small'
          variant='outlined'
          label='City'
          name='city'
          control={control}
          value={modalData?.address?.city || ""}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Zip Code'
          name='zipCode'
          control={control}
          value={modalData?.address?.zipCode || ""}
          error={!!errors.zipCode}
          helperText={errors.zipCode?.message}
        />                
      </Stack>
      <ControlledTextField
        size='small'
        variant='outlined'
        label='Email'
        name='email'
        control={control}
        value={modalData?.credentials?.email || ""}
        error={!!errors.email || emailExist}
        helperText={emailExist ? "Email already exists" : errors.email?.message}
      />
      {modalData === null && 
        <ControlledTextField
          size='small'
          variant='outlined'
          label='Password'
          name='password'
          value={modalData?.credentials?.password || ""}
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      }
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

export default TeacherInfo