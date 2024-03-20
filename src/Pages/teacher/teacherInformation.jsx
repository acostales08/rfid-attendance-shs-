import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { ControlledDataTable, ControlledBackdrop} from '../../Components';
import { createData } from '../../utils/api';

const TeacherInformation = () => {
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const item = localStorage.getItem("userData");
      const result = JSON.parse(item);
      const employeeNo = result.employeeId;
      
      const data = {
        employeeId: employeeNo
      };

      const [ infoData, courseData] = await Promise.all([
        createData('/teacher-info', data),
        createData('/teacher-course', data)
      ]);

      setTeacherInfo(infoData.data);
      setCourse(courseData.data);
      setLoading(false)
    };

    fetchData();
  }, []);

  console.log(course)

  const array = teacherInfo.map(arr => {
    const coursename = course.map(arr2 => arr2.courseName);
    return { ...arr, coursename };
  });



  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <div className='h-full w-full bg-[#f3f0f2] p-5'>
        <div className="flex gap-4 justify-center items-center sm:flex-col">
          <div className="h-full w-[60%] sm:w-full">
            <Paper elevation={1} style={{
              display: "flex",
              justifyContent: "center", 
              alignItems: "center", 
              padding: "32px",
              flexDirection: "column"
            }}>
              {array.map((item, index) => (
                <React.Fragment key={index}>
                  <h1 className="text-gray-600 text-2xl">Profile</h1>
                  <div className="p-3 text-1xl text-gray-600">
                    <p className="font-semibold">Department : <span className='font-normal'>{item.coursename}</span></p>
                    <p className="font-semibold">Employee Number : <span className='font-normal'>{item.employeeId}</span></p>
                    <p className="font-semibold">Full Name : <span className='font-normal'>{`${item.lastName}, ${item.firstName} ${item.middleName}`}</span></p>
                    <p className="font-semibold">Email Address : <span className='font-normal'>{item.credentials.email}</span></p>
                    <p className="font-semibold">Address : <span className='font-normal'>{`${item.address.street}, ${item.address.barangay}, ${item.address.city}, ${item.address.zip_code}`}</span></p>
                  </div>              
                </React.Fragment>
              ))}
            </Paper>
          </div>
        </div>
      </div>      
    )}
    </>

  );
};

export default TeacherInformation;
