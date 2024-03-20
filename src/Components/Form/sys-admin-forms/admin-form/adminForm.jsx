import React from 'react'
import { Stack } from '@mui/material';
import requiredString from '../../../../utils/Schema/formSchema'
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ControlledTextField from '../../../TextFielld/TextField';
import ControlledButton from '../../../Button/Buttton';
import { add } from '../../../../utils/api';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';

const AdminForm = ({display}) => {

    const {closeModal} = useCrudModal()
    const { ToastMessege } = useToastMessege();
    const adminSchema = z.object({
        email: requiredString("email is required"),
        password: requiredString("password is required")
    })

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(adminSchema)
    })

    const onSubmit = async(data) => {
        const formData = {
            email: data.email,
            password: data.password,
            userType: "admin"
        }
        console.log(formData)
        try {
            const response = await add(`/create`, formData)
            const res = response.status
            if(res === 201){
              ToastMessege(
                "Added Successfully",
                'top-right',
                false,
                true,
                true,
                true,
                undefined,
                'colored',
                'success'
              );
              display()
              closeModal()              
            }else{
              ToastMessege(
                "Error adding admin account",
                'top-right',
                false,
                true,
                true,
                true,
                undefined,
                'colored',
                'danger'
              );
            }

        } catch (error) {
            console.error("error adding admin acc")
        }
    }

  return (
    <div className="h-full w-full p-1">
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
      <ControlledTextField
          name="email"
          label="Email"
          size="medium"
          control={control}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <ControlledTextField
          name="password"
          label="Password"
          size="medium"
          control={control}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Stack>

      <div className="flex my-5 justify-end gap-4">
        <ControlledButton
          text="Submit"
          variant="contained"
          size="small"
          type="submit"
          color="primary"
        />
        <ControlledButton
          text="Cancel"
          variant="outlined"
          size="small"
          color="primary"
          onClick={closeModal}
        />
      </div>
    </form>
  </div>     
  )
}

export default AdminForm