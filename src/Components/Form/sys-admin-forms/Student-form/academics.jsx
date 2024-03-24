import React, { useState, useEffect } from 'react';
import { Stack, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../../utils/context/userContext';
import {
  fetchSection,
  add
} from '../../../../utils/api';
import BasicSelectField from '../../../TextFielld/SelectTextfield';
import ControlledButton from '../../../Button/Buttton';
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';


const AcademicsForm = ({ displayData }) => {
  const [ sections, setSections ] = useState([])
  const [ selectSection, setSelectSection ] = useState([])
  const { ToastMessege } = useToastMessege();
  const { handleBack, handleNext, currentStep, userData, submitData, setUserData } = useStepper();
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
          classesModels:{
            id: sections?.[0].id,
            empId: userData.studentNo,
            classes: data.section,
            isCurrent: 1
          }
      }
      setUserData(formDatas);
      console.log(formDatas)  
      handleNext()    
    }else{
      const formData = {
        ...userData,
        classesModels: {
          empId: userData.studentNo,
          classes: data.section ,
          isCurrent: 1
        },
      };
      setUserData(formData);
      console.log(formData)   
      handleNext()     
    }
  };
  return (
    <div className="h-full w-full p-1">
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
                text='Back'
                variant='contained'
                size='small'
                onClick={handleBack}
                disabled={currentStep === 1}
                color='error'
            />
            <ControlledButton
              name="submitButton"
              text="Next"
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
