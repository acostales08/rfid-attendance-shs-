import React, {useState, useEffect} from 'react'
import { IconButton } from '@mui/material'
import { CiEdit } from 'react-icons/ci'
import { MdDelete  } from 'react-icons/md' 
import ControlledBackdrop from '../../Backdrop/backdrop'
import { fetchData, displaySelectedId } from '../../../utils/api'
import ControlledDataTable from '../../DataTable/DataTable';
import ControlledButton from '../../Button/Buttton'
import ControlledModal from '../../Modal/Modal'
import YearLevelForm from '../../Form/academics/yearLevelForm'
import { useCrudModal } from '../../../utils/context/crudModalContext'

const YearLevelContent = () => {
  const [yearLevel, setYearLevel] = useState([]);
  const {isOpenModal, closeModal, modalData, openModal, operationType } = useCrudModal();
  const [ loading, setLoading ] = useState(true);


  const handleOpenAddModal = () => {
    openModal("","Create")
  }

  const handleOpenEditModal = async(id) => {
    const selectedData = await displaySelectedId(id)
    openModal(selectedData, "Edit")
  }
  
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
      const yearLevelData = await fetchData(type="yearLevel")
      setYearLevel(yearLevelData)      
    } catch (error) {
      console.log("Error fetching data", error);
    }finally{
      setLoading(false);
    }

  }
  
  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  const columns = [
    {
      name: '#',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: 'true'
    },
    {
      name: 'Year Level',
      selector: (row) => row.name,
      sortable: 'true'
    },
    {
      name: "action",
      center: "true",
      cell: (row) => (
        <div className="flex gap-2">
          <IconButton color="primary">
            <CiEdit
              size={20}
              onClick={()=> handleOpenEditModal(row.id)}
            />
          </IconButton>
        </div>
      ),
    }
  ];


  return (
    <>
    {loading? <ControlledBackdrop open={loading} /> : (
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
                data={yearLevel}
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
        <ControlledModal open={isOpenModal} onClose={closeModal}  title={`${operationType} Year Level`}>
          <YearLevelForm 
              onClick={closeModal} 
              displayData={displayData}
              modalData={modalData}
              />
        </ControlledModal>  
      </>
    )}
    </>

)
}

export default YearLevelContent