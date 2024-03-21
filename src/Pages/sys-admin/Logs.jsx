import React, {useState, useEffect} from 'react'
import { Paper } from '@mui/material'
import { ControlledBackdrop, ControlledDataTable } from '../../Components'
import { displayAdmin } from '../../utils/api'
import { useCrudModal } from '../../utils/context/crudModalContext'

const Logs = () => {
    const [loading, setLoading ] = useState(true)
    const [logs, setLogs] = useState([])

    const { openModal } = useCrudModal()
    useEffect(() => {
        fetchdata()
    }, [])

    console.log(logs)
    const fetchdata = async() => {
        try {
            const response = await displayAdmin('/display-logs')    
            setLogs(response.data)        
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
          name: 'Action',
          selector: (row) => row.transaction,
          sortable: true,
          center: true,
          width: '480px',
        },
        {
          name: 'User',
          selector: (row) => row.user,
          sortable: true,
          center: true,
          width: '280px',
        },        {
          name: 'Created',
          selector: (row) => row.created,
          sortable: true,
          center: true,
          width: '280px',
        },
      ];

    return (
        <>
        {loading? <ControlledBackdrop open={loading}/> : (
          <main className='h-full w-full bg-[#f3f0f2] p-2'>
            <Paper elevation={1}>
              <ControlledDataTable
                columns={columns}
                data={logs}
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
          </main>      
        )}
        </>
    
    )
}

export default Logs