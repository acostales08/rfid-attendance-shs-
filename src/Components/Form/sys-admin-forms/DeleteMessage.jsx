import React from 'react'
import ControlledButton from '../../Button/Buttton'
import { useCrudModal } from '../../../utils/context/crudModalContext'
import { Announcement } from '../../../utils/api'
import { useToastMessege } from '../../../utils/context/toastContext'

const DeleteMessage = ({fetchData}) => {
    const { closeModal, modalData } = useCrudModal()
    const { ToastMessege } = useToastMessege();

    const handleSubmit = async() => {
        const data = {
            id: modalData
        }

        try {
            const response = await Announcement('/delete', data)
            if(response.data === "deleted"){
                ToastMessege(
                    "Successfully Deleted",
                    'top-right',
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    'colored',
                    'warning'
                );
                closeModal()
                fetchData()                  
            }
  
        } catch (error) {  
        }

    }

    return (
        <div className='h-full w-full p-1'>
            <div className="">
                <h1 className="text-3xl font-bold">Are sure you want to delete this?</h1>
            </div>
            <div className="flex my-5 justify-end gap-4">
                <ControlledButton
                    text='Delete'
                    variant='contained'
                    size='small'
                    onClick={handleSubmit}
                    color='error'
                />
                <ControlledButton
                    text='Cancel'
                    variant='outlined'
                    size='small'
                    color='primary'
                    onClick={closeModal}
                />
            </div>
        </div>
      )
}

export default DeleteMessage