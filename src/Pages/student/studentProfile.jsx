import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { ControlledDataTable, ControlledBackdrop } from '../../Components';
import { createData } from '../../utils/api';


const StudentProfile = () => {
  // const [data, setData] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchData = async () => {
      const item = localStorage.getItem("userData");
      const result = JSON.parse(item);
      const studentNo = result.studentNo;
      
      const data = {
        studentNo: studentNo
      };

      const [infoData, courseData] = await Promise.all([
        createData('/student-info', data),
        createData('/student-course', data)
      ]);

      setStudentInfo(infoData.data);
      setCourse(courseData.data);
      setLoading(false)
    };

    fetchData();
  }, []);

  const array = studentInfo.map(arr => {
    const coursename = course.map(arr2 => arr2.courseName);
    return { ...arr, coursename };
  });

  // const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  // const columns = [
  //   {
  //     name: 'No.',
  //     selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
  //     sortable: true,
  //     center: true,
  //     width: '80px',
  //   },
  //   {
  //     name: "Subject Name",
  //     selector: row => row.name,
  //     center: true,
  //     width: "300px"
  //   }
  // ];

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
              padding: "52px 32px",
              flexDirection: "column"
            }}>
              {array.map((item, index) => (
                <React.Fragment key={index}>
                  <h1 className="text-gray-600 text-2xl">Student Profile</h1>
                  <h1 className="text-gray-600 text-1xl">{item.coursename}</h1>
                  <div className="p-3 text-1xl text-gray-600">
                    <p className="font-semibold">Student Number : <span className='font-normal'>{item.studentNo}</span></p>
                    <p className="font-semibold">Rfid Number : <span className='font-normal'>{item.rfidNo}</span></p>
                    <p className="font-semibold">Full Name : <span className='font-normal'>{`${item.lastName}, ${item.firstName} ${item.middleName}`}</span></p>
                    <p className="font-semibold">Email Address : <span className='font-normal'>{item.credentials.email}</span></p>
                    <p className="font-semibold">Address : <span className='font-normal'>{`${item.address.street} ${item.address.barangay} ${item.address.city} ${item.address.zip_code}`}</span></p>
                  </div>                
                </React.Fragment>
              ))}
            </Paper>
          </div>
          {/* <div className="h-full w-2/4 sm:w-full">
            <Paper elevation={1}>
              <ControlledDataTable
                columns={columns}
                data={data}
                onFilter={(data, search) =>
                  data.filter((item) =>
                    Object.values(item).some((value) =>
                      String(value).toLowerCase().includes(search.toLowerCase())
                    )
                  )
                }
                defaultSearchValue=""
              />
            </Paper>
          </div> */}
        </div>
      </div>      
    )}
    </>

  );
};

export default StudentProfile;
