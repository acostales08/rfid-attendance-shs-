import React, {useState, useEffect} from 'react'
import { Paper } from '@mui/material'
import { useCrudModal } from '../../../utils/context/crudModalContext'
import AdminForm from '../../../Components/Form/sys-admin-forms/admin-form/adminForm'
import { ControlledDataTable, ControlledModal, ControlledButton, ControlledBackdrop  } from '../../../Components'
import { displayAdmin } from '../../../utils/api'

const AdminAcc = () => {
    const [loading, setLoading ] = useState(true)
    const [admin, setadmin] = useState([])
    const { isOpenModal, modalData, openModal, closeModal, operationType } = useCrudModal();

    useEffect(() => {
        fetchdata()
    }, [])

    const fetchdata = async() => {
        try {
            const response = await displayAdmin('/display')    
            setadmin(response.data)        
        } catch (error) {
            console.error("error fetching")
        }finally{
            setLoading(false)
        }
    }

    const handleOpenAddModal = () => {
        openModal(null, "Create Admin Account")
      };

      const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;
      const columns = [
        {
          name: '#',
          selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
          sortable: true,
          width: '200px',
        },
        {
          name: 'Email',
          selector: (row) => row.email,
          sortable: true,
          center: true,
          width: '280px',
        },
        {
          name: 'password',
          selector: (row) => row.password,
          sortable: true,
          center: true,
          width: '380px',
        },
      ];

    return (
        <>
        {loading? <ControlledBackdrop open={loading}/> : (
          <main className='h-full w-full bg-[#f3f0f2] p-2'>
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
                data={admin}
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
            <AdminForm display={fetchdata}/>
          </ControlledModal>  
          </main>      
        )}
        </>
    
    )
}

export default AdminAcc