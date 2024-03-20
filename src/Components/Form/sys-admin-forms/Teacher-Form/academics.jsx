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
import { fetchData, createData } from '../../../../utils/api';
import BasicSelectField from '../../../TextFielld/SelectTextfield';

const AcademicsForm = ({ displayData }) => {
  const { ToastMessege } = useToastMessege();
  const { userData, submitData, setUserData } = useStepper();
  const { closeModal, modalData } = useCrudModal();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);

  const academicSchema = z.object({
    course: requiredString('Please select a course'),
    section: requiredString('Please select a section'),
    year_level: requiredString('Please select a year level'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
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

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (modalData) {
      // Your existing code for updating data
    } else {
      const formData = {
        ...userData,
        academicRecordsRequest: [
          ...(userData.academicRecordsRequest || []),
          {
            courseid: parseInt(data.course),
            sectionid: parseInt(data.section),
            yl: parseInt(data.year_level),
            sy: schoolYear,
          }
        ]
      };

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
        <div className="flex my-5 justify-end gap-4">
          <ControlledButton
            text="Add section"
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              const data = {
                course: control.getValues('course'),
                section: control.getValues('section'),
                year_level: control.getValues('year_level')
              };
              onSubmit(data, { preventDefault: () => {} });
            }}
          />
          <ControlledButton
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
