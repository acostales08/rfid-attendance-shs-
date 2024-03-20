import React, {useEffect,forwardRef} from 'react';
import DataTable from 'react-data-table-component';

const Print = forwardRef(({ startDate, endDate, attendance, ref }) => {

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
      selector: (row) => `${row.course} ${row.yearLevel}-${row.section}`,
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
    <div ref={ref}  className="print-container">
      <div className="header">
        <img src="logo.png" alt="rci logo" className="logo" />
        <div className="title">
          <h1>RICHWELL COLLEGES INCORPORATED</h1>
          <p>Gen. Alejo Santos Rd., San Jose, Plaridel, Bulacan</p>
        </div>
      </div>
      <div className="date-range">
        <p>Attendance</p>
        <div className="date">
          <p>From: {startDate}</p>
          <p>To: {endDate}</p>
        </div>
      </div>
      <div className="attendance-table">
        <DataTable columns={columns} data={attendance} />
      </div>
    </div>
  );
});

export default Print;
