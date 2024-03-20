import { useState, useEffect } from 'react';
import { fetchAttendancePerCourse, fetchAttendance, fetchAccountData } from '../api';

const useCount = () => {
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presPerCourse, setPresPerCourse] = useState([])
  const [studentPerCourse, setStudentPerCourse] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    fetchData();
    fetchAttendace()
    fetchStudentPerCourse()
    fetchAttendanceData()
  }, []);

  const fetchData = async () => {
    try {
      const [studentData, teacherData] = await Promise.all([
        fetchAccountData("/displayAllStudent"),
        fetchAccountData("/displayAllTeacher")
      ]);

      setStudent(studentData);
      setTeacher(teacherData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const fetchAttendace = async() => {
    try {
      const result = await fetchAttendancePerCourse('/total-students-present-per-course')
      const response = result.data
      setPresPerCourse(response)
    } catch (error) {
      
    }
  }

  const fetchStudentPerCourse = async() => {
    try {
      const response = await fetchAttendancePerCourse('/total-students-enrolled-per-course')
      setStudentPerCourse(response.data)
    } catch (error) {
      
    }
  }

  const fetchAttendanceData = async () => {
    try {
      const result = await fetchAttendance('/display-attendance');
      setAttendance(result.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };


  
  const studentTotal = student.length;
  const teacherTotal = teacher.length;

  return { student, teacher, studentTotal, teacherTotal, loading, error, presPerCourse, setPresPerCourse, setStudentPerCourse, studentPerCourse, attendance };
};

export default useCount;
