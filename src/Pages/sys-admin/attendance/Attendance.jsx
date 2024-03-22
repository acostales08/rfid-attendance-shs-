import React, { useEffect, useState, useRef } from 'react';
import { ControlledDataTable } from '../../../Components';
import { Paper, TextField, Button } from '@mui/material';
import { fetchAttendance } from '../../../utils/api';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../Components/Print/print';


const currentDate = new Date();

const philippineDate = new Date(currentDate.getTime() + (8 * 60 * 60 * 1000));
const formattedDate = philippineDate.toISOString().split('T')[0];

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const result = await fetchAttendance('/display-attendance');
      setAttendance(result.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };


  const fetchdata = attendance.filter(item => item.createdAt >= startDate && item.createdAt <= endDate);

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
      width: '200px',
    },
    {
      name: 'Section',
      selector: (row) => row.classes,
      sortable: true,
      center: true,
      width: '200px',
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
      width: '200px',
    },
  ];

  return (
    <>
    <div style={{ display: 'none'}}>
      <ComponentToPrint startDate={startDate} endDate={endDate} attendance={attendance}  ref={componentRef}/>
    </div>
    <div className="h-full w-full bg-[#f3f0f2] p-2">
      <div className='flex items-center justify-between pb-1'>
        <Button size='small' variant='contained' onClick={handlePrint} sx={{marginBottom: 1}}>Print</Button>
        <div className='flex gap-4'>
          <TextField
            type='date'
            variant='outlined'
            size='small'
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type='date'
            variant='outlined'
            size='small'
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />          
        </div>        
      </div>  
      <Paper elevation={1}>
        <ControlledDataTable
          columns={columns}
          data={fetchdata}
          pagination
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
    </div>
    </>
  );
};

export default Attendance;
