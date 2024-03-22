import React, { useState, useEffect } from 'react';
import { Stack, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../../utils/context/userContext';

import {
  fetchSection,
  createData,
  AcreateData,
  updateData,
  add
} from '../../../../utils/api';

import BasicSelectField from '../../../TextFielld/SelectTextfield';
import MultipleSelectCheckmarks from '../../../TextFielld/MultipleSelect';
import ControlledButton from '../../../Button/Buttton';
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';


const AcademicsForm = ({ displayData }) => {
  const [ sections, setSections ] = useState([])
  const [ selectSection, setSelectSection ] = useState([])
  const { ToastMessege } = useToastMessege();
  const { handleBack, currentStep, userData, submitData, setUserData } = useStepper();
  const { closeModal, modalData } = useCrudModal();

  const { user } = useUser()

  const academicSchema = z.object({
    section: requiredString('Please Select Section'),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(academicSchema),
  });


  const date = new Date();
  const schoolYear = date.getFullYear();

  const addLogs = async (message) => {
    const email = user.email;
    try {
      const formdata = {
        transaction: message, 
        user: email
      };
      const response = await add('/save-logs', formdata);
      console.log(response);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };

  useEffect(() => {
    displaySection()
    displayS()
  }, [])

  const sectioninfo = sections?.[0];

  useEffect(() => {
    if (sectioninfo) {
      setValue("section", sectioninfo.classes);
    }
  }, [sectioninfo, setValue]);

  console.log(userData)

  const displayS = async() => {
    const response = await fetchSection(`/displayAcadsTeacher?empId=${userData.studentNo}`)
    const result = response.data
    setSections(result)
  }

  const displaySection = async() => {
      try {
      const  response = await fetchSection('/displayClasses')
      const result = response.data
      setSelectSection(result)
      } catch (error) {
        console.error("error fetching sections")
      }
  }
  
  const onSubmit = async(data, e) => {
    e.preventDefault()
    if(modalData){
      const formDatas = {
        ...userData,
        // imageurl: "sampleimage01.png",
          classesModels:{
            id: sections?.[0].id,
            empId: userData.studentNo,
            classes: data.section,
            isCurrent: 1
          }
      }
      setUserData(formDatas);
      console.log(formDatas)
      try {
        const response = await updateData('/updateStudentAccount', formDatas)
        const message = response.data
        console.log(response)
        if(message === 'Created successfully.'){
        ToastMessege(
          "Created successfully.",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );

        addLogs(`A student account has been updated with ID number ${userData.studentNo}`)
        submitData()
        displayData();
        closeModal();          
        }

      } catch (error) {
        console.error('Error submitting data:', error);
      }

    }else{
      const formData = {
        ...userData,
        imageurl: "sampleimage01.png",
        classesModels: {
          empId: userData.studentNo,
          classes: data.section ,
          isCurrent: 1
        },
      };
      setUserData(formData);
      console.log(formData)
      try {
        const response = await createData('/createStudentAccount', formData);
        const messege = response.data === 'Request invalid.'
            ? 'Email or Student ID number already Exist' 
            : 'Added Successfully';
    
        ToastMessege(
          messege,
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          messege === 'Request invalid.' ? 'warning' : 'success'
        );
        
        addLogs(`A student account has been created with ID number ${userData.studentNo}`)
        submitData()
        displayData();
        closeModal();
      } catch (error) {
        console.error('Error submitting data:', error);
      }      
    }
  };


  return (
    <div className="h-full w-full p-1">
      <div className="h-[40vh] w-full mb-10">
        <div className="border h-full w-full p-4">
            <img src="" alt="" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
              <BasicSelectField
                label="Select Section"
                name="section"
                control={control}
                error={!!errors.section}
                helperText={errors.section?.message}
                size="small"
                options={selectSection}
                value=""
              />
          </Stack>
        </Stack>
        <div className="flex justify-end gap-4 mt-4">
            <ControlledButton
              name="submitButton"
              text="Submit"
              variant="contained"
              size="small"
              type="submit"
              color="primary"
            />
            <ControlledButton
              text="Cancel"
              variant="outlined"
              size="small"
              color="primary"
              onClick={closeModal}
            />            
          </div>
      </form>
    </div>
  );
};

export default AcademicsForm;
