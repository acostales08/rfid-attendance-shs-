import React, {useEffect} from 'react';
import DataTable from 'react-data-table-component';

export const ComponentToPrint = React.forwardRef((props, ref) => {

  const { startDate, endDate, attendance } = props

  const fetchdata = attendance.filter(item => item.createdAt >= startDate && item.createdAt <= endDate);

  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      center: true,
      width: '60px',
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
      width: '160px',
    },
    {
      name: 'Section',
      selector: (row) => row.classes,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Time In',
      selector: (row) => row.timeIn,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Time Out',
      selector: (row) => row.timeOut,
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Date',
      selector: (row) => row.createdAt,
      sortable: true,
      center: true,
      width: '100px',
    },
  ];
  

  return (
    <div ref={ref} className='p-10'>
      <div className="flex justify-center items-center gap-2">
        <img src="/logo.png" alt="rci logo" className="logo w-10 "/>
        <div className="title">
          <h1 className='text-[#943c84] drop-shadow-lg '>RICHWELL COLLEGES INCORPORATED</h1>
          <p className='text-[12px] tracking-wide'>Gen. Alejo Santos Rd., San Jose, Plaridel, Bulacan</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>Attendance</p>
        <div className="flex text-[12px]">
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
        </div>
      </div>
      <div className="attendance-table">
        <DataTable columns={columns} data={fetchdata} />
      </div>
    </div>
  );
});

