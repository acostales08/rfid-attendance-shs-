import React, {useState, useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import useCount from '../../utils/hooks/useCount';
import { fetchAttendance } from '../../utils/api';

const BasicPie = () => {
  const {  student, attendance } = useCount(0);


  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;

  const fetchperDay = attendance.filter(item => item.createdAt === formattedDate)

  const studentTotal =  student === "No record" ? "No record" : student.length;
  const studentTotalPresent = fetchperDay.length

  const absent = studentTotal === "No record"? "no record" : studentTotal - studentTotalPresent
  const absentData = absent < 0 ? "0" : absent;

  return (
    <PieChart
      series={[
        {
          data: [
            { id: 1, value: parseInt(studentTotal), label: 'Total Students' },
            { id: 2, value: parseInt(studentTotalPresent), label: 'Present' },
            { id: 3, value: parseInt(absentData), label: 'Absent' },
          ],
        },
      ]}
      width={500}
      height={300}
    />
  );
}
export default BasicPie