import React, { useState, useEffect } from 'react';
import { Paper, TextField, MenuItem } from '@mui/material';
import { ControlledDataTable } from '../../Components';
import useCount from '../../utils/hooks/useCount';
import { fetchSection } from '../../utils/api';

const currentDate = new Date();

const philippineDate = new Date(currentDate.getTime() + (8 * 60 * 60 * 1000));
const formattedDate = philippineDate.toISOString().split('T')[0];

const StudentAttendanceViewing = () => {
  const [sectionValue, setSectionValue] = useState('');
  const [fromDate, setFromDate] = useState(formattedDate);
  const [toDate, setToDate] = useState(formattedDate);
  const [sectionList, setSectionList] = useState([])
  const { attendance } = useCount();

  const result = localStorage.getItem('userData');
  const response = JSON.parse(result);
  const employeeId = response.employeeId;


  useEffect(() => {
    // sectionfunc()
    displayClasses()
  }, [])

  // const sectionfunc = async() => {
  //   try {
  //     const studentSection = await fetchSection(`/teacher-acads?employeeId=${employeeId}`)
  //     setSection(studentSection.data)      
  //   } catch (error) {
  //     console.error('Error', error);
  //   }

  // }

  const displayClasses = async() => {
    const response = await fetchSection(`/displayAcadsTeacher?empId=${employeeId}`)
    setSectionList(response.data)
  }
  

  const onFilter = (data, search) => {
    const searchTerms = search.toLowerCase().split(' ');
    return data.filter(item => {
      const fullName = item.fullname.toLowerCase();
      const section = `${item.course} ${item.yearLevel}-${item.section}`.toLowerCase();
      return searchTerms.every(term => fullName.includes(term) || section.includes(term));
    });
  };



  const fetchPerSectionAndDate = attendance.filter(item => {
    const itemDate = new Date(item.createdAt);
    const fromDateObj = fromDate ? new Date(fromDate) : null;
    const toDateObj = toDate ? new Date(toDate) : null;

    const withinDateRange = (!fromDateObj || itemDate >= fromDateObj) && (!toDateObj || itemDate <= toDateObj);
     return withinDateRange && item.classes === sectionValue;
  });

  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      center: true,
      width: '80px'
    },
    {
      name: 'Student no.',
      selector: row => row.studentNo,
      sortable: true,
      center: true,
      width: '100px'
    },
    {
      name: 'Full Name',
      selector: row => row.fullname,
      sortable: true,
      center: true,
      width: '200px'
    },
    {
      name: 'Section',
      selector: row => row.classes,
      sortable: true,
      center: true,
      width: '200px'
    },
    {
      name: 'Time In',
      selector: row => row.timeIn,
      sortable: true,
      center: true,
      width: '120px'
    },
    {
      name: 'Time Out',
      selector: row => row.timeOut,
      sortable: true,
      center: true,
      width: '120px'
    },
    {
      name: 'Date',
      selector: row => row.createdAt,
      sortable: true,
      center: true,
      width: '200px'
    }
  ];

  return (
    <div className='h-full w-full bg-[#f3f0f2] p-2'>
      <Paper elevation={1}>
        <div className='h-10 w-full mb-2 flex justify-center items-center'>
            <h1 className='text-xl'>Attendance</h1>
          </div>
          <div className='flex justify-center items-center mb-4 gap-4'>
            <TextField
              type='date'
              label='From Date'
              value={fromDate}
              size='small'
              onChange={(e) => setFromDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type='date'
              label='To Date'
              size='small'
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        <ControlledDataTable
          columns={columns}
          data={fetchPerSectionAndDate}
          pagination
          onFilter={onFilter}
          defaultSearchValue=""
          children={
            <div className='w-[200px]'>
              <TextField
                select
                label="Select Section"
                value={sectionValue}
                fullWidth
                onChange={e => setSectionValue(e.target.value)}
                size="small"
                className="w-full"
                InputProps={{
                  classes: {
                    root: 'h-10', 
                    input: 'h-full'
                  }
                }}
              >
                {sectionList.map((item, index) => (
                  <MenuItem key={index} value={item.classes}>
                    {item.classes}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          }
        />
      </Paper>
    </div>
  );
};

export default StudentAttendanceViewing;
