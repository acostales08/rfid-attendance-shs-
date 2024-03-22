import React, { useState, useEffect } from 'react';
import { Paper, IconButton } from '@mui/material';
import { ControlledDataTable, ControlledButton, ControlledModal, ControlledBackdrop, ClassForm } from '../../Components';
import { CiEdit } from "react-icons/ci";
import { useCrudModal } from '../../utils/context/crudModalContext';
import { displayClasses } from '../../utils/api';

const ClassContent = () => {
  const { isOpenModal, openModal, closeModal, operationType, modalData } = useCrudModal();
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    try {
      const res = await displayClasses('/display');
      setSectionData(res.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    openModal(null, "Create Section");
  };

  const handleOpenEditModal = async (id, classes) => {
    const modalData = { id, classes }
    openModal(modalData, "Edit");
  };

  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;

  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      width: "280px",
    },
    { 
      name: "Section", 
      selector: (row) => row.classes, 
      sortable: true,
      center: true,
      width: "250px",
    },
    {
      name: 'Action',
      center: true,
      width: '250px',
      cell: (row) => (
        <div className="flex gap-2">
          <IconButton color="primary">
            <CiEdit size={20} onClick={() => handleOpenEditModal(row.id, row.classes)} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? <ControlledBackdrop open={loading}/> : (
        <main className='h-full w-full bg-[#f3f0f2] p-2'>
          <ControlledButton
            variant='contained'
            size='small'
            text='Create Class'
            onClick={handleOpenAddModal}
            style ={{marginBottom: '10px'}}
          />   
          <Paper elevation={1}>
            <ControlledDataTable
              columns={columns}
              data={sectionData}
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
          <ControlledModal open={isOpenModal} onClose={closeModal}  title={`${operationType}`}>
            <ClassForm displayData={fetchSection}/>
          </ControlledModal>  
        </main>      
      )}
    </>
  );
};

export default ClassContent;
