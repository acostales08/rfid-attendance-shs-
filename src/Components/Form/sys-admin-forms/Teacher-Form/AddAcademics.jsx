import React, { useState, useEffect } from 'react';
import { Stack, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from "@mui/icons-material/Cancel";
import { useUser } from '../../../../utils/context/userContext';

import {
  fetchData,
  AcreateData,
  add,
  createData,
} from '../../../../utils/api';

import BasicSelectField from '../../../TextFielld/SelectTextfield';
import MultipleSelectCheckmarks from '../../../TextFielld/MultipleSelect';
import ControlledButton from '../../../Button/Buttton';
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';


const TeacherAcademic = ({ displayData }) => {
  const [selectedSubject, setSelectedSubject] = useState([]);
  const { ToastMessege } = useToastMessege();
  const { closeModal, modalData } = useCrudModal();

  const [selectedIds, setSelectedIds] = useState({
    course: '',
    section: '',
    year_level: '',
    // semester: '',
    // subject: '',
  });
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);
  const [semester, setSemester] = useState([]);
  // const [subject, setSubject] = useState([]);

  const academicSchema = z.object({
    course: requiredString('Please select a course'),
    section: requiredString('Please select a section'),
    year_level: requiredString('Please select a year level'),
    // semester: requiredString('Please select a semester'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(academicSchema),
  });

  const date = new Date();
  const schoolYear = date.getFullYear();
  
  // const getSelectedNames = () => {
  //   if(selectedSubject.length > 0){
  //     return selectedSubject.map(id => {
  //       const selectedOption = subject.find(option => option.id === id);
  //       return selectedOption ? selectedOption.name : '';
  //     });    
  //   }

  // };
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setSelectedSubject(value);

  // };
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
  

  const onSubmit = async (data) => {
    const formData = {
      academicRecords: {
        employeeId: modalData,
        course: parseInt(data.course),
        section: parseInt(data.section),
        year_level: parseInt(data.year_level),
        schoolYear: schoolYear,
        // semester: parseInt(data.semester),
        userType: 'teacher',
        isCurrent: 1,
      },
      // subject: selectedSubject.map(subjectId => ({
      //   employeeId: modalData,
      //   manageSubject: parseInt(subjectId),
      //   userType: 'teacher',
      //   isCurrent: '1',
      // })),
    };
    console.log(formData)
    try {
      const response = await AcreateData('/add-academic-record', formData);
      closeModal()
      const messege = response.data 
      if (messege === "Created successfully."){
           ToastMessege(
            messege,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
          
          addLogs(`A teacher account has added new section with ID number ${modalData}`)
          displayData();
      }

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  
  

  useEffect(() => {
    fetchDataAndSetState('course', setCourse);
    fetchDataAndSetState('section', setSection);
    fetchDataAndSetState('yearLevel', setYearLevel);
    // fetchDataAndSetState('semester', setSemester);
    // fetchDataAndSetState('subject', setSubject);
  }, []);

  const fetchDataAndSetState = async (type, setState) => {
    const data = await fetchData(type);
    setState(data);
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

            />
            <BasicSelectField
              label="Select section"
              name="section"
              control={control}
              error={!!errors.section}
              helperText={errors.section?.message}
              size="small"
              options={section}

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

            />
            {/* <BasicSelectField
              label="Select semester"
              name="semester"
              control={control}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              size="small"
              options={semester}
              onChange={(value) => setSelectedIds({ ...selectedIds, semester: value })}

            />           */}
          </Stack>
          {/* <MultipleSelectCheckmarks
            label="Select Subject"
            name="subject"
            items={subject}
            onChange={handleChange}
            value={selectedSubject}
            selectedNames={selectedSubject}
            renderValue={() => (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {getSelectedNames().map((name, index) => (
                  <Chip
                  key={index}
                  label={name}
                  onDelete={() => {
                    const filteredIds = selectedSubject.filter((_, idx) => idx !== index);
                    setSelectedSubject(filteredIds);
                  }}
                  deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                />
                ))}
              </Stack>
            )}
          /> */}
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

export default TeacherAcademic;
