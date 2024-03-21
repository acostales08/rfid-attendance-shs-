import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ControlledTextField from '../../TextFielld/TextField';
import ControlledButton from '../../Button/Buttton';
import { useCrudModal } from '../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../utils/context/toastContext';
import { createData, updateData, add  } from '../../../utils/api'
import requiredString from '../../../utils/Schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../utils/context/userContext';

const CourseForm = ({ displayData, modalData: propModalData }) => {
  const { closeModal } = useCrudModal();
  const { ToastMessege } = useToastMessege();

  const courseSchema = z.object({
    courseCode: requiredString("please input course code"),
    name: requiredString('Course is required'),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    if (propModalData) {
      setValue('name', propModalData.name);
      setValue('courseCode', propModalData.courseCode);
    }
  }, [propModalData, setValue]);


  const { user } = useUser()

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

    const formData = {
      id: propModalData ? propModalData.id : undefined,
      courseCode: data.courseCode,
      name: data.name,
      type: 'course',
    };

    if (propModalData) {
      const previousData = propModalData;
      try {
        const response = await updateData('/update', formData);
        const updatedData = response.data.status;

        const dataChanged =JSON.stringify(previousData) !== JSON.stringify(updatedData);

        if (updatedData === 'OK') {
          ToastMessege(
            dataChanged ? 'Updated Successfully' : 'No Changes Detected',
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            dataChanged ? 'success' : 'info'
          );
          addLogs('update course')
        } else {
          ToastMessege(
            'Update Failed',
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'error'
          );
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }

    } else {
      const response = await createData('/save', formData);
      const message = response.data.status === 'CREATED'
          ? 'Added Successfully'
          : 'Already Exist';

          ToastMessege(
        message,
        'top-right',
        false,
        true,
        true,
        true,
        undefined,
        'colored',
        message === 'Added Successfully' ? 'success' : 'error'
      );
    }
    addLogs("create new course")
    closeModal();
    displayData();
  };
  return (

          <div className="h-full w-full p-1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
              <ControlledTextField
                  name="courseCode"
                  label="Strand Code"
                  size="medium"
                  value={propModalData ? propModalData.courseCode : ''}
                  control={control}
                  error={!!errors.courseCode}
                  helperText={errors.courseCode?.message}
                />
                <ControlledTextField
                  name="name"
                  label="Strand"
                  size="medium"
                  value={propModalData ? propModalData.name : ''}
                  control={control}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Stack>

              <div className="flex my-5 justify-end gap-4">
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

export default CourseForm;