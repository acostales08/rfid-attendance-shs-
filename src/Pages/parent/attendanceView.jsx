import React, {useEffect, useState} from 'react'
import { Paper, TextField, MenuItem } from '@mui/material';
import { ControlledDataTable } from '../../Components';
import { fetchAttendance, selectName } from '../../utils/api';
import { useUser } from '../../utils/context/userContext';
import axios from 'axios';

const currentDate = new Date();

const philippineDate = new Date(currentDate.getTime() + (8 * 60 * 60 * 1000));
const formattedDate = philippineDate.toISOString().split('T')[0];

const ParentAttendanceViewPage = () => {
  const [nameValue, setNameValue] = useState('');
  const [attendance, setAttendance] = useState([])
  const [fromDate, setFromdate] = useState(formattedDate)
  const [toDate, setToDate] = useState(formattedDate)
  const [childname, setChildname ] = useState([])


  const { user } = useUser()

  useEffect(() => {
    display()
  }, [])

  const display = async() => {
      try {
        const response = await selectName(`/displayParentChild?email=${user.email}`)
        const res = response.data
        setChildname(res)
      } catch (error) {
        
      }
  }

  const onFilter = (data, search) =>
  data.filter((item) => {
    
    const searchTerms = search.toLowerCase().split(' ');

    return searchTerms.every((term) => {
      const fullName = `${item.firstName} ${item.middleName} ${item.lastName}`.toLowerCase();
      const section = `${item.course} ${item.year}-${item.section}`.toLowerCase();

      return fullName.includes(term) || section.includes(term);
    });
});

const result = localStorage.getItem("userData")
const response = JSON.parse(result)
const email = response.email


useEffect(() => {
  fetch()
}, [fromDate, toDate])

const fetch = async() => {

  const formattedFromDate = fromDate ? new Date(fromDate).toISOString().split('T')[0] : '';
  const formattedToDate = toDate ? new Date(toDate).toISOString().split('T')[0] : '';

  const result = await fetchAttendance(`/display-attendance?fromDate=${formattedFromDate}&toDate=${formattedToDate}`);

      const filteredAttendance = result.data.filter((record) => {
        const recordDate = new Date(record.createdAt).toISOString().split('T')[0];
        return recordDate >= formattedFromDate && recordDate <= formattedToDate && record.studentNo === nameValue;
      })
    setAttendance(filteredAttendance)

}


const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;

const columns = [
      {
        name: 'No.',
        selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
        sortable: true,
      },
      { 
        name: "Student no.", 
        selector: (row) => row.studentNo, 
        sortable: true 
      },
  {
    name: 'Full Name',
    selector: (row) => row.fullname,
    sortable: true,
  },
  {
    name: 'Section',
    selector: (row) => row.classes,
    sortable: true,
  },
      { 
        name: "Time In", 
        selector: (row) => row.timeIn, 
        sortable: true 
      },
      { 
        name: "Time Out", 
        selector: (row) => row.timeOut, 
        sortable: true 
      },
      { 
        name: "Date", 
        selector: (row) => row.createdAt, 
        sortable: true 
      },
      
    ];

  const data = [
  {
    id: 1,
    studentNumber: '202143',
    firstName: 'juan',
    middleName: 'sample',
    lastName: 'Luna',
    course: 'BSIS',
    year: 4,
    section: 5,
    timeIN: '8:30 am',
    timeOut: '12:30 pm',
    date: "jan 25 2024",
  },
  {
    id: 1,
    studentNumber: '202143',
    firstName: 'juan',
    middleName: 'sample',
    lastName: 'Luna',
    course: 'BSIS',
    year: 4,
    section: 5,
    timeIN: '8:30 am',
    timeOut: '12:30 pm',
    date: "jan 26 2024",
  },  
  {
    id: 1,
    studentNumber: '202143',
    firstName: 'juan',
    middleName: 'sample',
    lastName: 'Luna',
    course: 'BSIS',
    year: 4,
    section: 5,
    timeIN: '8:30 am',
    timeOut: '12:30 pm',
    date: "jan 27 2024",
  },

];
return (
  <div className='h-full w-full bg-[#f3f0f2] p-2'>
    <Paper elevation={1}>
    <div className="h-10 w-full mb-2 flex justify-center items-center">
          <h1 className="text-xl">Attendance</h1>
      </div>  
      <div className='flex justify-center items-center mb-4 gap-4'>
          <TextField
            type='date'
            label='From Date'
            value={fromDate}
            size='small'
            onChange={(e) => setFromdate(e.target.value)}
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
          data={attendance}
          pagination
          onFilter={onFilter}
          defaultSearchValue=""
          children={
            <div className='w-[200px]'>
              <TextField
                select
                label="Names"
                value={nameValue}
                fullWidth
                onChange={e => setNameValue(e.target.value)}
                size="small"
                className="w-full"
                InputProps={{
                  classes: {
                    root: 'h-10', 
                    input: 'h-full'
                  }
                }}
              >
                {childname.map((item, index) => (
                  <MenuItem key={index} value={item.studentno}>
                    {item.fullname}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          }
        />        
    </Paper>

  </div>
)
}

export default ParentAttendanceViewPage