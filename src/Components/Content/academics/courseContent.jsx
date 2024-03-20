import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { fetchData, displaySelectedId } from '../../../utils/api'
import ControlledDataTable from '../../DataTable/DataTable';
import ControlledButton from '../../Button/Buttton';
import ControlledModal from '../../Modal/Modal';
import CourseForm from '../../Form/academics/courseForm';
import { useCrudModal } from '../../../utils/context/crudModalContext';
import ControlledBackdrop from '../../Backdrop/backdrop';

const CourseContent = () => {
  const [course, setCourse] = useState([]);
  const { isOpenModal, modalData, operationType, openModal, closeModal } = useCrudModal();
  const [ loading, setLoading ] = useState(true);

  const handleOpenAddModal = () => {
    openModal(null, "Create")
  };

  const handleOpenEditModal = async (id) => {
    const selectedData = await displaySelectedId(id);
    openModal(selectedData, "Edit")

  };

  const handleOpenViewModal = (data) => {
    openModal('View', data);
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await displayData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setLoading(false)
      }
    };
  
    fetchDataAsync();
  }, []);

  const displayData = async (type) => {
    try{
      const courseData = await fetchData(type || 'course');
      setCourse(courseData);      
    }catch(error){
      console.log("Error fetching data", error);
    }finally{
      setLoading(false);
    }

  };

  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;

  const columns = [
    {
      name: '#',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      width: '100px',
    },
    {
      name: 'Strand code',
      selector: (row) => row.courseCode,
      sortable: true,
      center: true,
      width: '280px',
    },
    {
      name: 'Strands',
      selector: (row) => row.name,
      sortable: true,
      center: true,
      width: '380px',
    },
    {
      name: 'Action',
      center: true,
      width: '250px',
      cell: (row) => (
        <div className="flex gap-2">
          <IconButton color="primary">
            <CiEdit size={20} onClick={() => handleOpenEditModal(row.id)} />
          </IconButton>
        </div>
      ),
    },
  ];


  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <>
        <div className="h-full w-full p-2">
          <div className="py-2">
            <ControlledButton
              variant="contained"
              size="small"
              text="Add"
              onClick={handleOpenAddModal}
            />
          </div>
          <div className="border border-gray-300 rounded-md">
            <>
            {loading ? <ControlledBackdrop open={loading}/> : (
              <ControlledDataTable
                columns={columns}
                data={course}
                pagination
                title="Strands"
                onFilter={(data, search) =>
                  data.filter((item) =>
                    Object.values(item).some((value) =>
                      String(value).toLowerCase().includes(search.toLowerCase())
                    )
                  )
                }
                defaultSearchValue=""
              />            
            )}
            </>
          </div>
        </div>
        <ControlledModal open={isOpenModal} onClose={closeModal} title={` ${operationType} Strands`}>
        <CourseForm
            onClick={closeModal}
            displayData={displayData}
            modalData={modalData}
          />
        </ControlledModal>      
      </>
    )}

    </>
  );
};

export default CourseContent;
