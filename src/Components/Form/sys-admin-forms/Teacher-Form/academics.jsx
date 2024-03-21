import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from "@mui/icons-material/Cancel";
import ControlledButton from '../../../Button/Buttton';
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';
import { fetchData, createData, add } from '../../../../utils/api';
import BasicSelectField from '../../../TextFielld/SelectTextfield';
import { useUser } from '../../../../utils/context/userContext';

const AcademicsForm = ({ displayData }) => {
  const { ToastMessege } = useToastMessege();
  const { userData, submitData, setUserData } = useStepper();
  const { closeModal, modalData } = useCrudModal();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);
  const [academicRecordsRequest, setAcademicRecordsRequest] = useState([]);

  const { user } = useUser()

  const academicSchema = z.object({
    // course: requiredString('Please select a course').optional(),
    // section: requiredString('Please select a section').optional(),
    // year_level: requiredString('Please select a year level').optional(),
  });  

  const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(academicSchema),
  });

  const date = new Date();
  const schoolYear = date.getFullYear();

  const courseId = modalData?.courseinfo?.[0]?.courseName;
  const sectionId = modalData?.sectioninfo?.[0]?.section;
  const yearLevelId = modalData?.courseinfo?.[0]?.yearLevel;

  useEffect(() => {
    fetchDataAndSetState('course', setCourse);
    fetchDataAndSetState('section', setSection);
    fetchDataAndSetState('yearLevel', setYearLevel)
  }, []);

  const fetchDataAndSetState = async (type, setState) => {
    const data = await fetchData(type);
    setState(data);
  };

  const handleAddSection = async (data) => {
    // Add new section to academicRecordsRequest
    setAcademicRecordsRequest(prevState => [
      ...prevState,
      {
        studentNo: userData.employeeId,
        course: data.course,
        section: data.section,
        yearLevel: data.year_level,
        schoolYear: schoolYear,
        userType: "teacher",
        isCurrent: 1
      }
    ]);
  
    // Reset the form after adding section
    resetForm();
  
    // Success message
    ToastMessege(
      "Section successfully added",
      'top-right',
      false,
      true,
      true,
      true,
      undefined,
      'colored',
      'success'
    );
  };
  
  const resetForm = () => {
    const resetValues = {};
  
    // Check if academicSchema and its shape property exist before accessing optional properties
    if (academicSchema && academicSchema.shape) {
      if (!academicSchema.shape.course || !academicSchema.shape.course.optional) {
        resetValues.course = '';
      }
      if (!academicSchema.shape.section || !academicSchema.shape.section.optional) {
        resetValues.section = '';
      }
      if (!academicSchema.shape.year_level || !academicSchema.shape.year_level.optional) {
        resetValues.year_level = '';
      }
    }
  
    // Reset the form using the hook-form reset function
    reset(resetValues);
  };
  
  const addLogs = async (message) => {
    const email = user.email;
    try {
      const formdata = {
        transaction: message, // Corrected parameter usage
        user: email
      };
      const response = await add('/save-logs', formdata);
      console.log(response);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };
  

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (modalData) {
      // Handle modal data
    } else {
      const formData = {
        ...userData,
        academicRecordsRequest
      };
    
      // Check if the "Submit" button was clicked
      const isSubmitButton = e.nativeEvent.submitter.name === 'submitButton';
    
      // If submitting, trigger validation
      if (isSubmitButton) {
        // Proceed with validation
        const isValid = await trigger();
        if (!isValid) {
          return;
        }
      }
    
      try {
        const response = await createData('/createTeacherAccount', formData);
        const message = response.data.body === 'Request invalid'
          ? 'Already Exist'
          : 'Added Successfully';
        ToastMessege(
          message,
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          message === 'Added Successfully' ? 'success' : 'warning'
        );
        addLogs();
        submitData();
        displayData();
        closeModal();
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    }
  };

  
  return (
    <div className="h-full w-full p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <BasicSelectField
                  label="Select Strand"
                  name="course"
                  control={control}
                  error={!!errors.course}
                  helperText={errors.course?.message}
                  size="small"
                  options={course}
                  value={courseId || ''}
                />
                <BasicSelectField
                  label="Select section"
                  name="section"
                  control={control}
                  error={!!errors.section}
                  helperText={errors.section?.message}
                  size="small"
                  options={section}
                  value={sectionId || ''}
                />
              </Stack>    
              <Stack direction="row" spacing={1}>
                <BasicSelectField
                  label="Select year level"
                  name="year_level"
                  control={control}
                  error={!!errors.year_level}
                  helperText={errors.year_level?.message}
                  size="small"
                  options={yearLevel}
                  value={yearLevelId || ''}
                />
              </Stack>        
        </Stack>
        <div className="flex my-5 justify-between">
          <ControlledButton
            text="Add section"
            variant="contained"
            size="small"
            color="info"
            onClick={handleSubmit(handleAddSection)}
          />
          <div className="flex gap-4">
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

        </div>
      </form>
    </div>
  );
};

export default AcademicsForm;
