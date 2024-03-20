import React, { useState, useEffect } from 'react';
import { Stack, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios';

import {
  fetchData,
  createData,
  AcreateData,
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
  const { ToastMessege } = useToastMessege();
  const { handleBack, currentStep, userData, submitData, setUserData } = useStepper();
  const { closeModal, modalData } = useCrudModal();
  const [course, setCourse] = useState([]);
  const [section, setSection] = useState([]);
  const [yearLevel, setYearLevel] = useState([]);


  const academicSchema = z.object({
    course: requiredString('Please select a course'),
    section: requiredString('Please select a section'),
    year_level: requiredString('Please select a year level'),
    // semester: requiredString('Please select a semester'),
  });

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(academicSchema),
  });

  const date = new Date();
  const schoolYear = date.getFullYear();

  const courseInfo = modalData?.courseinfo?.[0]?.courseName;
  const courseId = course.find(sample => sample.name === courseInfo);
  const semesterID = modalData?.courseinfo?.[0]?.semester;
  const yearLevelID = modalData?.courseinfo?.[0]?.yearLevel;
  const sectionfind = modalData?.studSection?.[0]?.section;
  const sectionID = section.find(sample => sample.name === sectionfind);
  const subjectinfo = modalData?.studSubject?.map(item => item.name) || [];
//   const subjectIds = subjectinfo.map(subjectName => {
//     const foundSubject = subject.find(sample => sample.name === subjectName);
//     return foundSubject ? foundSubject.id : null;
// });

// const isSubjectIdsNotNull = subjectIds.some(id => id !== null);

  
  useEffect(() => {
    if (courseId && sectionID && yearLevelID ) {
      setValue("course", String(courseId.id) || "");
      setValue("section", String(sectionID.id) || "");
      // setValue("semester", String(semesterID) || "");
      setValue("yearLevel", String(yearLevelID) || "");
      // setValue("subject", String(subjectIds) || "");

    }
  }, [courseId, sectionID, yearLevelID, setValue]);

  // useEffect(() => {
  //     if(isSubjectIdsNotNull){
  //       setSelectedSubject(subjectIds)
  //     }
  // }, [isSubjectIdsNotNull]);

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
  const addLogs = async () => {
    try {
      // Retrieve userData from localStorage
      const userDataString = localStorage.getItem('userData');
      // Parse the string back to an object
      const userData = JSON.parse(userDataString);
      
      // Extract email from userData
      const email = userData.email;
  
      const formdata = {
        transaction: `A student account has been created with ID number ${userData.studentNo}`,
        user: email
      };
  
      const response = await add('/save-logs', formdata);
      console.log(response);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };
  
  
  const onSubmit = async (data, e) => {
    e.preventDefault()
    if(modalData){
      const formDatas = {
        ...userData,
        courseid: parseInt(data.course),
        sectionid: parseInt(data.section),
        yl: parseInt(data.year_level),
        sy: schoolYear,
        // sem: parseInt(data.semester)
        // managedsubject: selectedSubject.map(subjectId => ({
        //   subject: parseInt(subjectId),
        // })),
      }
      setUserData(formDatas);
      try {
        const response = await AcreateData('/update-student-info', formDatas)
        const message = response.data
        ToastMessege(
          "Updated Successfully",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );

        submitData()
        displayData();
        closeModal();
      } catch (error) {
        console.error('Error submitting data:', error);
      }

    }else{
      const formData = {
        ...userData,
        academicRecords: {
          studentNo: userData.studentNo,
          course: parseInt(data.course),
          section: parseInt(data.section),
          yearLevel: parseInt(data.year_level),
          schoolYear: schoolYear,
          // semester: parseInt(data.semester),
          userType: 'student', 
          isCurrent: 1,
        },
        // subject: selectedSubject.map(subjectId => ({
        //   studentNo: userData.studentNo,
        //   manageSubject: parseInt(subjectId),
        //   userType: 'student',
        //   isCurrent: '1',
        // })),
      };
      setUserData(formData);
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
        addLogs()
        submitData()
        displayData();
        closeModal();
      } catch (error) {
        console.error('Error submitting data:', error);
      }      
    }


  };

  useEffect(() => {
    fetchDataAndSetState('course', setCourse);
    fetchDataAndSetState('section', setSection);
    fetchDataAndSetState('yearLevel', setYearLevel);
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
              value={sectionID || ''} 
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
              value={yearLevelID || ''}
            />
            {/* <BasicSelectField
              label="Select semester"
              name="semester"
              control={control}
              error={!!errors.semester}
              helperText={errors.semester?.message}
              size="small"
              options={semester}
              value={semesterID || ''} 
            /> */}
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
            text="Back"
            variant="contained"
            size="small"
            onClick={handleBack}
            disabled={currentStep === 1}
            color="error"
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
