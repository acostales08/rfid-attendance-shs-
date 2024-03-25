import React, { useEffect, useState } from 'react'
import { BsCircleFill } from "react-icons/bs";
import { Paper } from '@mui/material'
import BasicPie from '../../Components/Chart/AttendanceChart'
import BasicBars from '../../Components/Chart/Bars';

import { DashboardCard, ControlledBackdrop, ControlledDataTable } from '../../Components';
import { FaUsers } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { BiSolidUserMinus } from "react-icons/bi";
import useCount from '../../utils/hooks/useCount';
import { fetchAttendance } from '../../utils/api';




const SysDashboard = () => {
  const [stdattendance, setStdAttendance] = useState([])
  const [ loading, setLoading ] = useState(true)

  const {  student, teacher, attendance } = useCount();

  console.log(teacher)
  
  const currentDate = new Date();
  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const result = await fetchAttendance('/display-attendance');
      setStdAttendance(result.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  
  const fetchperDay = attendance.filter(item => item.createdAt === formattedDate)

  const studentTotal = student === undefined ? "No record" : student.length;

  const teacherTotal = teacher === undefined ? "No record" : teacher.length;
  const studentTotalPresent = fetchperDay.length

  const absent = studentTotal === "No record"? "no record" : studentTotal - studentTotalPresent
  const absentData = absent < 0 ? "0" : absent;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const dashboardCard =[
    {
      id:1,
      total: studentTotal,
      text: 'Total Students Created Account',
      img: <FaUsers size={70} className="opacity-30"/>
    },
    {
      id:2,
      total: studentTotalPresent,
      text: 'Total Students Presents',
      img: <HiUserAdd size={70} className="opacity-30"/>
    },
    {
      id:3,
      total: absentData,
      text: 'Total Students Absents',
      img: <BiSolidUserMinus size={70} className="opacity-30"/>
    },
    {
      id:4,
      total: teacherTotal,
      text: 'Total Teachers Created Account',
      img: <FaUsers size={70} className="opacity-30"/>
    },
  ];
  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      center: true,
      width: '80px',
    },
    {
      name: 'Student no.',
      selector: (row) => row.studentNo,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Full Name',
      selector: (row) => row.fullname,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Section',
      selector: (row) => row.classes,
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Time In',
      selector: (row) => row.timeIn,
      sortable: true,
      center: true,
      width: '120px',
    },
    {
      name: 'Time Out',
      selector: (row) => row.timeOut,
      sortable: true,
      center: true,
      width: '120px',
    },
    {
      name: 'Date',
      selector: (row) => row.createdAt,
      sortable: true,
      center: true,
      width: '150px',
    },
  ];

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <div className=' h-full w-full bg-[#f3f0f2] p-2 flex flex-col'>
        <div className="h-[25vh] sm:h-[40vh] w-full mb-6">
          <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 py-2 overflow-auto">
            {dashboardCard.map(({id, total, text, img}) => (
                <DashboardCard
                  key={id}
                  total={total}
                  text={text}
                  img={img}
                />          
              ))}          
          </div>

        </div>
        <div className="flex gap-2 sm:flex-col lg:flex">
        <div className="h-[50vh] w-[65%] sm:h-[40vh] sm:w-full">
        <Paper elevation={3} style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <div className="container mx-auto h-[50vh] sm:h-[40vh] flex justify-center items-center p-4 lg:p-8">
            <ControlledDataTable columns={columns} data={stdattendance} />
          </div>
        </Paper>
    </div>
        <div className="h-[50vh] w-[35%] sm:h-[40vh] sm:w-full">
          <Paper elevation={3}>
            <div className="h-[50vh] sm:h-[40vh] flex justify-center items-center p-4 lg:p-8">
              <BasicPie />   
            </div>           
          </Paper>
        </div>
      </div>

      </div>      
    )}
    </>

  )
}

export default SysDashboard
