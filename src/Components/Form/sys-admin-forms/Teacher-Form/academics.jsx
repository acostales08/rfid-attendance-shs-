import React, { useState, useEffect } from 'react';
import { Stack, Chip } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CancelIcon from "@mui/icons-material/Cancel";
import ControlledButton from '../../../Button/Buttton';
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';
import { fetchData, createData, add, fetchSection, updateData } from '../../../../utils/api';
import MultipleSelectCheckmarks from '../../../TextFielld/MultipleSelect';
import { useUser } from '../../../../utils/context/userContext';


const AcademicsForm = ({ displayData }) => {
  const { ToastMessege } = useToastMessege();
  const { userData, submitData, setUserData } = useStepper();
  const { closeModal, modalData } = useCrudModal();
  const [sections, setSections] = useState([]);
  const [ selectedSection, setSelectedSections ] = useState([])
  const [ teachSection, setTeachSection ] = useState([])

  const { user } = useUser()

  const academicSchema = z.object({
    course: requiredString('Please select a course').optional(),
    section: requiredString('Please select a section').optional(),
    year_level: requiredString('Please select a year level').optional(),
  });  

  const { control, handleSubmit, reset, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(academicSchema),
  });

  const date = new Date();
  const schoolYear = date.getFullYear();
  const samplearr = teachSection.map(classes => {
    return classes.classes
  })
  const isClassesIsNotNull = samplearr.some(classess => classess !== undefined)

    useEffect(() => {
      if(isClassesIsNotNull){
        setSelectedSections(samplearr)
      }
  }, [isClassesIsNotNull]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const [sectionData, selectSectionData] = await Promise.all([
            fetchSection('/displayAcadsTeacher', { empId: userData.employeeId }),
            fetchSection('/displayClasses')
          ]);
    
          setTeachSection(sectionData.data);
          setSections(selectSectionData.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors here, such as showing a notification to the user
        }
      };
    
      fetchData();
    }, [userData.employeeId]);

    useEffect(() => {
        displaySelectClass()
        displayClasses()
    }, [])


    const displaySelectClass = async() => {
      const response = await fetchSection('/displayClasses')
      setSections(response.data)
    }

    const displayClasses = async() => {
      const response = await fetchSection(`/displayAcadsTeacher?empId=${userData.employeeId}`)
      setTeachSection(response.data)
    }

    const getSelectedNames = () => {
      if(selectedSection.length > 0){
        return selectedSection.map(id => {
          const selectedOption = sections.find(option => option.classes === id);

          return selectedOption ? selectedOption.classes : '';
        });    
      }
      return [];
    };
    

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedSections(value);

    };

  const addLogs = async (message) => {
    const email = user.email;
    try {
      const formdata = {
        transaction: message,
        user: email
      };
      const response = await add('/save-logs', formdata);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };
  
  const onSubmit = async (data, e) => {
    e.preventDefault();

    if (modalData) {
      const formDatas = {
        ...userData,
        classesModels: selectedSection.map(section => ({
            empId: userData.employeeId,
            classes: section,
            isCurrent: '1',
          })),
      };

      console.log(formDatas)
      try {
        const response = await updateData('/updateTeacherAccount', formDatas)
        const result = response.data
        console.log(result)
        if(result === "Updated"){
          ToastMessege(
            "update successfully",
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
          addLogs(`A Teacher account has been updated with ID number ${userData.employeeId}`);
          submitData();
          displayData();
          closeModal();   

        }
      } catch (error) {
        console.error("error updating teacher's account")
      }
        
    } else {
      const formData = {
        ...userData,
        classesModels: selectedSection.map(section => ({
            empId: userData.employeeId,
            classes: section,
            isCurrent: '1',
          })),
      };
        addLogs(`A Teacher account has been created with ID number ${userData.employeeId}`);
        submitData();
        displayData();
        closeModal();    
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
        addLogs(`A Teacher account has been created with ID number ${userData.employeeId}`);
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
        <MultipleSelectCheckmarks
            label="Select Class"
            name="section"
            items={sections}
            onChange={handleChange}
            value={selectedSection}
            selectedNames={selectedSection}
            renderValue={() => (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {getSelectedNames().map((name, index) => (
                  <Chip
                  key={index}
                  label={name}
                  onDelete={() => {
                    const filteredIds = selectedSection.filter((_, idx) => idx !== index);
                    setSelectedSections(filteredIds);
                  }}
                  deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                />
                ))}
              </Stack>
            )}
          />   
        </Stack>
        <div className="flex my-5 justify-between">
          <div className="flex justify-end gap-4">
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
