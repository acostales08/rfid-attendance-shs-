import React, {useState, useEffect} from 'react'
import { CiEdit, CiRead } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { ImSwitch } from "react-icons/im";
import { useToastMessege } from '../../../utils/context/toastContext';
import { Paper, IconButton } from '@mui/material'
import { useCrudModal } from '../../../utils/context/crudModalContext'
import { ControlledButton, ControlledDataTable, ControlledModal, AnnouncementContent } from '../../../Components'
import AnnouncementForm from '../../../Components/Form/sys-admin-forms/Announcement-form'
import { fetchAnnouncement, Announcement } from '../../../utils/api'
import DeleteMessage from '../../../Components/Form/sys-admin-forms/DeleteMessage';


const AnnouncementPage = () => {
  const [announcement, setAnnouncement] = useState([])
  const { ToastMessege } = useToastMessege();

  const { openModal, isOpenModal, closeModal, modalData, operationType } = useCrudModal()

  const  handleOpenAddModal = () => {
    openModal(null, 'Create');
  }

  const handleOpenEditModal = (id) => {
    const announcementId = announcement.find(item => item.id === id)
    openModal(announcementId, "Update")
  }

  const handleDeleteModal = (id) => {
    openModal(id, "Delete")
  }

  const handleViewModal = (id) => {
    const announcementId = announcement.find(item => item.id === id)
    openModal(announcementId, "View")
  }

  const handleCilck = async(id) => {
    const  aid = announcement.find(item => item.id === id)
    const data = {
      id: aid.id
    }
    if(aid.activated === 1){
      const response = await Announcement('/deactivate', data)
      if(response.data === "deactivated"){
        ToastMessege(
          "Deactivated Successfully",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );
        fetchData()        
      }

    }else{
      const response = await Announcement('/activate', data)
      if(response.data === "activated"){
        ToastMessege(
          "Activated Successfully",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );
        fetchData()        
      }
    }

  }

  const renderForm = (operationType) => {
    switch(operationType){
        case "Create":
          return <AnnouncementForm fetchData={fetchData}/>
        case "Update":
          return <AnnouncementForm fetchData={fetchData}/>
        case "Delete":
          return <DeleteMessage fetchData={fetchData}/>
        case "View":
          return <AnnouncementContent title={modalData.date} body={modalData.body}/>
        default:
           return null;
    }
}
  useEffect(() => {
    fetchData()
  }, [])
   const fetchData = async() => {
    try {
      const response = await fetchAnnouncement('/display')
      setAnnouncement(response.data)
    } catch (error) {
      
    }
  }   


const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;

const column = [
  {
    name: '#',
    selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
    sortable: true,
    width: '100px',
  },
  {
    name: 'Title',
    selector: (row) => row.date,
    sortable: true,
    center: true,
    width: '150px',
  },
  {
    name: 'Announcement',
    selector: (row) => row.body,
    sortable: true,
    center: true,
    width: '480px',
  },
  {
    name: 'Status',
    center: true,
    width: '150px',
    cell: (row) => (
      <>
      {row.activated === 1? (
        <div className="bg-green-400 rounded-full">
          <p className="text-[10px] py-[1px] px-4">active</p>
        </div>        
      ) : (
        <div className="bg-red-300 rounded-full">
        <p className="text-[10px] py-[1px] px-2">not active</p>
      </div>    
      )}
      </>
    ),
  },
  {
    name: 'Action',
    center: true,
    width: '250px',
    cell: (row) => (
      <div className="flex">
        <IconButton color="success">
          <CiRead
            size={20}
            onClick={() => handleViewModal(row.id)}
          />
        </IconButton>
        <IconButton color="primary">
          <CiEdit 
          size={20} 
          onClick={() => handleOpenEditModal(row.id)}
          />
        </IconButton>
        <IconButton color="error">
            <MdDelete 
            size={20} 
            onClick={() => handleDeleteModal(row.id)} 
            />
        </IconButton>
        <IconButton color={row.activated === 1? "success" : "error"}>
            <ImSwitch 
              size={20}
              onClick={() => handleCilck(row.id)}
            />
        </IconButton>
      </div>
    ),
  },
];

  return (
    <div className='h-screen w-full bg-[#f3f0f2] p-1'>
      <div className=" py-2">
        <ControlledButton
          variant="contained"
          size="small"
          text="Create"
          onClick={handleOpenAddModal}
        />
      </div>
      <div className="">
        <Paper elevation={2}>
          <ControlledDataTable
            columns={column}
            data={announcement}
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
        <ControlledModal open={isOpenModal} onClose={closeModal} title={`${operationType} Announcement`}>
          {renderForm(operationType)}
        </ControlledModal>   
      </div>
    </div>
  )
}

export default AnnouncementPage