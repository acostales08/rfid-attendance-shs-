import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ControlledTextField from '../../TextFielld/TextField';
import ControlledButton from '../../Button/Buttton';
import { useCrudModal } from '../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../utils/context/toastContext';
import { addClasses } from '../../../utils/api';
import requiredString from '../../../utils/Schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../utils/context/userContext';

const ClassForm = ({ displayData }) => {
  const { closeModal, modalData } = useCrudModal();
  const { ToastMessege } = useToastMessege();
  const { user } = useUser();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        course: requiredString('Please input course code'),
        yearLevel: requiredString('Year level is required'),
        section: requiredString('Section is required'),
      })
    ),
  });

  useEffect(() => {
    if (modalData && typeof modalData === 'object') {
      const sections = modalData.classes.split(' ');
      const course = sections[0];
      const [yearLevel, section] = sections[1].split('-');
      setValue('course', course);
      setValue('yearLevel', yearLevel);
      setValue('section', section);
    }
  }, [modalData, setValue]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const sections = `${data.course} ${data.yearLevel}-${data.section}`;
    const formData = {
      id: modalData.id,
      classes: sections,
    };

    if (modalData && typeof modalData === 'object') {
      const previousData = modalData;
      try {
        const response = await addClasses('/update', formData);
        const updatedData = response.data;

        const dataChanged = JSON.stringify(previousData) !== JSON.stringify(updatedData);

        if (updatedData === 'updated') {
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
        } else {
          ToastMessege('Update Failed', 'top-right', false, true, true, true, undefined, 'colored', 'error');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } else {
      const sections = `${data.course} ${data.yearLevel}-${data.section}`;
      const formdata = {
        id: modalData.id,
        classes: sections,
      };
      try {
        const response = await addClasses('/save', formdata);
        const result = response.data;
        const message = result === 'save' ? 'Added Successfully' : 'Already Exist';

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
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }

    closeModal();
    displayData();
  };

  return (
    <div className="h-full w-full p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <ControlledTextField
            name="course"
            label="Strand"
            size="small"
            value={modalData ? modalData.classes.split(' ')[0] : ''}
            control={control}
            error={!!errors.course}
            helperText={errors.course?.message}
          />
          <ControlledTextField
            name="yearLevel"
            label="Year Level"
            size="small"
            value={modalData ? modalData.classes.split(' ')[1]?.split('-')[0] : ''}
            control={control}
            error={!!errors.yearLevel}
            helperText={errors.yearLevel?.message}
          />
          <ControlledTextField
            name="section"
            label="Section"
            size="small"
            value={modalData ? modalData.classes.split(' ')[1]?.split('-')[1] : ''}
            control={control}
            error={!!errors.section}
            helperText={errors.section?.message}
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

export default ClassForm;
