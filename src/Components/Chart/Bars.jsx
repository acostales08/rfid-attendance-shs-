import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import useCount from '../../utils/hooks/useCount';

const BasicBars = () => {
  const { presPerCourse, studentPerCourse } = useCount();

  const arrCourse = [];
  const enrolledStudentPerCourse = [];
  const presentStudent = [];
  const absent = [];

  presPerCourse.forEach(array1 => {
    let enrolled = 0;
    let absentCount = 0;
    studentPerCourse.forEach(array2 => {
      if (array1.course === array2.course_code) {
        enrolled = array2.total_students_enrolled_per_course;
        absentCount = array2.total_students_enrolled_per_course - array1.presentPerCourse;        
      }
    });
    arrCourse.push(array1.course);
    enrolledStudentPerCourse.push(enrolled);
    presentStudent.push(array1.presentPerCourse);
    absent.push(absentCount);
  });

  if (arrCourse.length === 0 || enrolledStudentPerCourse.length === 0 || presentStudent.length === 0 || absent.length === 0) {
    return null; 
  }

  const sanitizeData = (data) => {
    return data.map((value) => (isNaN(value) ? 0 : parseInt(value)));
  };

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: arrCourse }]}
      series={[
        { data: sanitizeData(enrolledStudentPerCourse) },
        { data: sanitizeData(presentStudent) },
        { data: sanitizeData(absent) },
      ]}
      width={650}
      height={300}
    />
  );
};

export default BasicBars;
