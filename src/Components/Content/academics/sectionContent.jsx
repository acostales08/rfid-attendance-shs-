import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material'
import { CiEdit } from 'react-icons/ci'
import { MdDelete  } from 'react-icons/md' 
import { fetchData, displaySelectedId } from '../../../utils/api'
import ControlledDataTable from '../../DataTable/DataTable';
import ControlledButton from '../../Button/Buttton'
import ControlledModal from '../../Modal/Modal'
import SectionForm from '../../Form/academics/sectionForm'
import ControlledBackdrop from '../../Backdrop/backdrop'
import {useCrudModal} from '../../../utils/context/crudModalContext'

const SectionContent = (mod) => {
  const [ section, setSection] = useState([])
  const {isOpenModal, closeModal, modalData, openModal, operationType } = useCrudModal()
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await displayData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchDataAsync();
  }, []);

const displayData = async (type) => {
  try {
    const sectionData = await fetchData(type="section")
    setSection(sectionData)    
  } catch (error) {
    console.log("Error fetching data", error);
  }finally{
    setLoading(false)
  }

}

  const handleOpenAddModal = () => {
    openModal("", "Create")
  }
  
  const handleOpenEditModal = async (id) => {
      const selectedData = await displaySelectedId(id)
      openModal(selectedData, 'Edit');
  };

  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  const columns = [
    {
      name: '#',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: 'true'
    },
    {
      name: 'Section',
      selector: (row) => row.name,
      sortable: 'true'
    },
    {
      name: "action",
      center: 'true',
      cell: (row) => (
        <div className="flex gap-2">
          <IconButton color="primary">
            <CiEdit size={20} onClick={() => handleOpenEditModal(row.id)} />
          </IconButton>
        </div>
      ),
    }
  ];

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <>
        <div className='h-full w-full p-2'>
          <div className="py-2">
            <ControlledButton
              variant='contained'
              size='small'
              text='Add'
              onClick={handleOpenAddModal}
            />          
          </div>
          <div className="border border-gray-300 rounded-md">
            <>
            {loading ? <ControlledBackdrop open={loading}/> : (
              <ControlledDataTable
                columns={columns}
                data={section}
                title="Section"
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
            )}
            </>
          </div>
        </div>
        <ControlledModal open={isOpenModal} onClose={closeModal}  title={`${operationType} Section`}>
          <SectionForm onClick={closeModal} displayData={displayData} modalData={modalData}/>
        </ControlledModal>  
      </>
    )}
    </>

)
}

export default SectionContent