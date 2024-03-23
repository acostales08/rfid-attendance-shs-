import React,{useState, useEffect} from 'react'

import { IconButton, Paper } from '@mui/material';
import { fetchAccountData } from '../../../utils/api';

import { ControlledDataTable, ParentForm, ControlledModal, ControlledBackdrop } from '../../../Components';
import { CiEdit, CiRead   } from "react-icons/ci";
import { useCrudModal } from '../../../utils/context/crudModalContext';



const ParentAcc = () => {

  const { isOpenModal, modalData, openModal, closeModal } = useCrudModal();

  const [ parentData, setParentData ] = useState([]);
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    displayData()
  }, [])

  const displayData = async() => {
    try {
      const parents = await fetchAccountData('/displayAllParent');
      setParentData(parents.data);      
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false)
    }

  }


  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      width: "80px",
    },
    { 
      name: "Full Name", 
      selector: (row) => `${row.lastName}, ${row.firstName} ${row.middleName}`, 
      sortable: true,
      center: true,

    },
    { 
      name: "Phone Number", 
      selector: (row) => row.phoneNumber, 
      sortable: true 
    },
    { 
      name: "Email", 
      selector: (row) => row.credentials.email, 
      sortable: true 
    },
];

const parents = parentData === "No record" ? [] : parentData;
  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <main className='h-full w-full bg-[#f3f0f2] p-2'>
        <Paper elevation={1}>
          <ControlledDataTable
            columns={columns}
            data={parents}
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
      <ControlledModal open={isOpenModal} onClose={closeModal}  title={`${modalData} Parent Account`}>
        <ParentForm onClick={closeModal}/>
      </ControlledModal>  
      </main>      
    )}
    </>

)}

export default ParentAcc