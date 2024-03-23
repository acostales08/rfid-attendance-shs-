import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Paper } from '@mui/material';
import { FaPlus } from "react-icons/fa";
import { ControlledButton, ControlledDataTable, ControlledModal, ControlledBackdrop, TeacherAcademic, TearcherForm } from '../../../Components';
import { CiEdit, CiRead } from "react-icons/ci";
import { useCrudModal } from '../../../utils/context/crudModalContext';
import { createData, fetchAccountData } from '../../../utils/api';

const StudentAcc = () => {
  const { isOpenModal, modalData, openModal, closeModal, operationType } = useCrudModal();
  const [teacher, setTeacher] = useState([]);
  const [ loading, setLoading ]= useState(true);

  const handleOpenAddModal = () => {
    openModal(null, 'Create');
  };

  const handleOpenViewModal = async(data) => {

    const teacherinfo = teacher.filter(item => item.employeeId === data)
    
    openModal(teacherinfo, "View");
  };

  // const handleOpenEditModal = (data) => {
  //   openModal(data, "Add");
  // };
  
  const renderForm = (operationType) => {
    switch(operationType){
        case "Create" :
            return <TearcherForm onClick={closeModal} displayData={displayData}/>;
        case "Add" :
            return <TeacherAcademic/>
        case "View" :
          return <TearcherForm onClick={closeModal} displayData={displayData}/>;
        default :
            return null;

    }
  }

  useEffect(() => {
    displayData();
  }, []);

  const displayData = async () => {
    try{
      const teacherData = await fetchAccountData('/displayAllTeacher');
      setTeacher(teacherData.data);      
    }catch(error){
      console.log("errorr fetching data", error);
    }finally{
      setLoading(false)
    }
  };

  const columns = [
    { 
      name: "ID no.", 
      selector: (row) => row.employeeId, 
      sortable: true,
      center: true,
      width: "100px"
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
              onClick={() => handleOpenViewModal(row.employeeId)}
            />
          </IconButton>
          {/* <IconButton color="primary">
            <FaPlus    
              size={18}
              onClick={() => handleOpenEditModal(row.id)}
            />
          </IconButton> */}
        </div>
      ),
    },
  ];

  const teacherData = teacher === "No record" ? [] : teacher;

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
              data={teacherData}
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
        <ControlledModal open={isOpenModal} onClose={closeModal} title={`${operationType} Teacher's Account`}>
            {renderForm(operationType)}
        </ControlledModal>    
      </main>
    )}
    </>
  );
};

export default StudentAcc;
