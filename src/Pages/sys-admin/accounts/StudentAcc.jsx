import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Paper } from '@mui/material';
import { FaPlus } from "react-icons/fa";
import { 
  ControlledButton, 
  ControlledDataTable, 
  StudentForm, 
  AddImage, 
  ControlledModal, 
  ControlledBackdrop 
} from '../../../Components';
import { CiRead } from "react-icons/ci";
import { useCrudModal } from '../../../utils/context/crudModalContext';
import { createData, fetchAccountData } from '../../../utils/api';

const StudentAcc = () => {
  const { isOpenModal, openModal, closeModal, operationType } = useCrudModal();
  const [ student, setStudent ] = useState([]);
  const [ loading, setLoading ] = useState(true)

  const handleOpenAddModal = () => {
    openModal(null, "Create Student Account")
  };

  const handleOpenEditModal = (data) => {
    openModal(data, 'Add new academic records');
  };


  const handleOpenViewModal = async(data) => {
    const stuData = student.filter(item => item.studentNo === data)
    openModal(stuData, 'View & Edit student information');
  };


  const renderForm = (operationType) => {
    switch(operationType){
        case "Create Student Account":
           return <StudentForm onClick={closeModal} displayData={displayData}/>;
        case "Add new academic records":
           return <AddImage/>;
        case "View & Edit student information":
           return <StudentForm onClick={closeModal} displayData={displayData}/>;
        default:
           return null;
    }
}


  useEffect(() => {
    displayData();

  }, []);
  
  const displayData = async () => {
    try{
      const studentData = await fetchAccountData('/displayAllStudent');
      setStudent(studentData.data);     
       
    }catch(error){
      console.log("error fetching data", error);
    }finally{
      setLoading(false)
    }

  };

  const columns = [
    { 
      name: "ID no.", 
      selector: (row) => row.studentNo, 
      sortable: true,
      center: true,
      width: "100px"
    },
    { 
      name: "Rfid no.", 
      selector: (row) => row.rfidNo, 
      sortable: true,
      center: true,
      width: "120px"
    },
    { 
      name: "Full Name", 
      selector: (row) => `${row.lastName}, ${row.firstName} ${row.middleName}`, 
      sortable: true,
      center: true,
      width: "200px",
    },
    { 
      name: "Address", 
      selector: (row) => `${row.address.barangay} ${row.address.city} ${row.address.zip_code}`, 
      sortable: true,
      center: true,
      width: "250px",
    },
    { 
      name: "Email", 
      selector: (row) => row.credentials.email, 
      sortable: true,
      center: true,
      width: "250px",
    },
    {
      name: "action",
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <IconButton color="success">
            <CiRead
              size={20}
              onClick={() => handleOpenViewModal(row.studentNo)}
            />
          </IconButton>
          {/* <IconButton color="primary">
            <FaPlus    
              size={18}
              onClick={() => handleOpenEditModal(row.studentNo)}
            />
          </IconButton> */}
        </div>
      ),
    },
  ];
  const studentData = student === "No record" ? [] : student;

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <main className='h-full w-full bg-[#f3f0f2] p-2'>      
        <div className="py-2">
          <ControlledButton
            variant='contained'
            size='small'
            text='Create account'
            onClick={handleOpenAddModal}
            style ={{marginBottom: '10px'}}
          />          
        <Paper elevation={1}>
          <ControlledDataTable
            columns={columns}
            data={studentData}
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
        <ControlledModal open={isOpenModal} onClose={closeModal} title={`${operationType}`}>
          {renderForm(operationType)}
        </ControlledModal>           
      </main>  
    )}
    </>
  )}

export default StudentAcc;
