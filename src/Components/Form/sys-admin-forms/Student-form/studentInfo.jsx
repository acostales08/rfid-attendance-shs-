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

const StudentInfoForm = () => {

    const [emailExist, setEmailExist] = useState(false)
    const [ rfidExists, setRfidExists ] = useState(false)
    const [ sid, setSid ] = useState(false)
    const { student } = useCount()
    const {  closeModal, modalData } = useCrudModal();
    const { setUserData, userData, currentStep, handleBack, handleNext } = useStepper();

    const studentSchema = z.object({
        studentNo: requiredString("student no. required").refine(value => !isNaN(parseInt(value)), { message: "Student number must be a number" }),
        rfidNo: requiredString("rfid no. required").refine(value => !isNaN(parseInt(value)), { message: "Rfid number must be a number" }),
        firstName: requiredString("fristname required"),
        middleName: requiredString("required"),
        lastName: requiredString("lastname required"),
        street: requiredString("street required"),
        barangay: requiredString("barangay required"),
        city: requiredString("city required"),
        zipCode: requiredString("zipcode required").refine(value => !isNaN(parseInt(value)), { message: "zip code must be a number" }),
        email: requiredString("email required").email("Invalid Email"),
        password: requiredString("required"),
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        watch
      } = useForm({
        resolver: zodResolver(studentSchema),
      });

      const email = watch('email');
      const stId = watch('studentNo')
      const strfid = watch('rfidNo')
      useEffect(() => {
        setEmailExist(false);
        setSid(false)
        setRfidExists(false)
      }, [email, stId, strfid]);

      
      const studentinfo = modalData?.[0]

      useEffect(() => {
          if (studentinfo) {
              setValue("studentNo", studentinfo.studentNo || ""); 
              setValue("rfidNo", studentinfo.rfidNo || "");
              setValue("firstName", studentinfo.firstName || "");
              setValue("middleName", studentinfo.middleName || "");
              setValue("lastName", studentinfo.lastName || "");
              
              // Null checks for nested properties
              setValue("street", studentinfo.address?.street || "");
              setValue("barangay", studentinfo.address?.barangay || "");
              setValue("city", studentinfo.address?.city || "");
              setValue("zipCode", studentinfo.address?.zip_code || "");
              
              // Null checks for nested properties
              setValue("email", studentinfo.credentials?.email || "");
              setValue("password", "sample");
          }
      }, [studentinfo, setValue]);
      
      const onSubmit = async (data, e) => {
        e.preventDefault();
        if(modalData){
            const formDatas ={
                id: modalData?.[0].id,
                studentNo: data.studentNo,
                rfidNo: data.rfidNo,
                firstName: data.firstName,
                middleName: data.middleName,
                lastName: data.lastName,
                address: {
                    id: modalData?.[0].address.id,
                  street: data.street,
                  barangay: data.barangay,
                  city: data.city,
                  zip_code: data.zipCode,
                },
                credentials: {
                    id:modalData?.[0].credentials.id,
                  email: data.email,
                  ...(modalData === null && { password: data.password }),
                  userType: "student"
      
                },
            }
            setUserData(formDatas);
            handleNext();
        }else{
            const formData = {
                studentNo: data.studentNo,
                rfidNo: data.rfidNo,
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
                  userType: "student"
      
                },
              };
            const inputedEmail = {
                email: data.email
            };
            const inputedIdNum = formData.studentNo;
            let studentNum = false;
            
            if (Array.isArray(student) && student.some(s => s.studentNo === inputedIdNum)) {
                studentNum = true;
            }
            const inputedrfidNum = formData.rfidNo;
            let rfidNum = false;
            
            if (Array.isArray(student) && student.some(s => s.rfidNo === inputedrfidNum)) {
                rfidNum = true;
            }
            if(modalData){
                setUserData(formData);
                handleNext();
            }else{
                try {
                    const response = await createData('/email-exist', inputedEmail);
                    const message = response.data;
                
                    if (message === "exists" && studentNum && rfidNum) {
                        setEmailExist(true);
                        setSid(true);
                        setRfidExists(true);
                    } else if (studentNum && rfidNum){
                        setSid(true);
                        setRfidExists(true);
                    } else if (message === "exists" && studentNum){
                        setEmailExist(true);
                        setSid(true);
                    } else if (message === "exists" && rfidNum){
                        setEmailExist(true);
                        setRfidExists(true);
                    } else if (studentNum) {
                        setSid(true);
                    } else if (rfidNum) {
                        setRfidExists(true);
                    } else if (message === "exists") {
                        setEmailExist(true);
                    } else if (!message && student === "No record") {
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
        }


      };
      
  return (
    <div className='h-full w-full p-1'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Student Number'
                    name='studentNo'
                    // value={studentinfo? studentinfo.studentNo : ""}
                    control={control}
                    error={!!errors.studentNo || sid}
                    helperText={sid? "Student ID number already exist" : errors.studentNo?.message}
                /> 
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='RFID no.'
                    name='rfidNo'
                    // value={studentinfo? studentinfo.rfidNo : ""}
                    control={control}
                    error={!!errors.rfidNo || rfidExists}
                    helperText={rfidExists? "Rfid number already exist" : errors.rfidNo?.message}
                />                 
            </Stack>
            <Stack direction="row" spacing={1}>
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='First Name'
                    name='firstName'
                    // value={studentinfo? studentinfo.firstName : ""}
                    control={control}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                />            
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Middle Name'
                    name='middleName'
                    // value={studentinfo? studentinfo.middleName : ""}
                    control={control}
                    error={!!errors.middleName}
                    helperText={errors.middleName?.message}
                />
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Last Name'
                    name='lastName'
                    // value={studentinfo? studentinfo.lastName : ""}
                    control={control}
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
                    // value={studentinfo? studentinfo.address.street : ""}
                    control={control}
                    error={!!errors.street}
                    helperText={errors.street?.message}
                />
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Barangay'
                    name='barangay'
                    // value={studentinfo? studentinfo.address.barangay : ""}
                    control={control}
                    error={!!errors.barangay}
                    helperText={errors.barangay?.message}
                />
            </Stack>
            <Stack direction="row" spacing={1}>
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='City'
                    name='city'
                    // value={studentinfo? studentinfo.address.city : ""}
                    control={control}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                />
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Zip Code'
                    name='zipCode'
                    // value={studentinfo? studentinfo.address.zip_Code : ""}
                    control={control}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                />                
            </Stack>
                <ControlledTextField
                    size='small'
                    variant='outlined'
                    label='Email'
                    name='email'
                    // value={studentinfo? studentinfo.credentials.email : ""}
                    control={control}
                    error={!!errors.email || emailExist}
                    helperText={emailExist? "Email is already exist" : errors.email?.message}
                />
                {modalData === null &&
                
                    <ControlledTextField
                            size='small'
                            variant='outlined'
                            label='Password'
                            name='password'
                            value={studentinfo? studentinfo.credentials.password : ""}
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
                    // onClick={handleNext}
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

export default StudentInfoForm