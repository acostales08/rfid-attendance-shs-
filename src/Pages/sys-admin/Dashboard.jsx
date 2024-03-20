import React, { useEffect, useState } from 'react'
import { BsCircleFill } from "react-icons/bs";
import { Paper } from '@mui/material'
import BasicPie from '../../Components/Chart/AttendanceChart'
import BasicBars from '../../Components/Chart/Bars';

import { DashboardCard, ControlledBackdrop } from '../../Components';
import { FaUsers } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { BiSolidUserMinus } from "react-icons/bi";
import useCount from '../../utils/hooks/useCount';




const SysDashboard = () => {

  const [ loading, setLoading ] = useState(true)

  const {  student, teacher, attendance } = useCount();
  
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  const fetchperDay = attendance.filter(item => item.createdAt === formattedDate)

  const studentTotal = student === "No record" ? "No record" : student.length;
  const teacherTotal = teacher === "No record" ? "No record" : teacher.length;
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

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <div className=' h-full w-full bg-[#f3f0f2] p-2 flex flex-col'>
        <div className="h-[25vh] sm:h-[40vh] w-full mb-6">
          <div className="h-full w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 py-2">
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
              <Paper elevation={3}>
                <div className="constainer mx-auto h-[50vh] sm:h-[40vh] flex justify-center items-center p-4 lg:p-8">
                  <BasicBars /> 
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