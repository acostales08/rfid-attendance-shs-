import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../../../utils/context/userContext';
import { add, createData, updateData } from '../../../../utils/api';
import ControlledButton from '../../../Button/Buttton'; 
import { useStepper } from '../../../../utils/context/stepperContext';
import { useCrudModal } from '../../../../utils/context/crudModalContext';
import { useToastMessege } from '../../../../utils/context/toastContext';
import requiredString from '../../../../utils/Schema/formSchema';
import ControlledTextField from '../../../TextFielld/TextField';

const AddImage = ({ displayData }) => {
  const [file, setFile] = useState(null); 
  const { ToastMessage } = useToastMessege(); 
  const { closeModal, modalData } = useCrudModal();
  const { userData, submitData, setUserData } = useStepper();
  const { user } = useUser();

  const imgSchema = z.object({
    image: requiredString('Please select an image'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(imgSchema),
  });

  const addLogs = async (message) => {
    const email = user.email;
    try {
      const formData = {
        transaction: message, 
        user: email
      };
      const response = await add('/save-logs', formData); // Changed formdata to formData
      console.log(response);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFile(reader.result);
      saveImageLocally(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const saveImageLocally = async (imageData) => {
    const img = new Image();
    img.src = imageData;
  
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
  
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob, 'uploadedImage.png');
  
        try {
          const response = await fetch('/your-server-endpoint', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }, 'image/png', 1);
    };
  };
  

  const onSubmit = async (data) => {

    if(modalData){
      const formDatas = {
        ...userData,
        image: data.image
      };
      setUserData(formDatas);      
      try {
        const response = await updateData('/updateStudentAccount', formDatas);
        console.log(response)
        ToastMessage(
          "Updated successfully.",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );
        addLogs(`A student account has been updated with ID number ${userData.studentNo}`);
        submitData();
        displayData();
        closeModal();
      } catch (error) {
        
      }
    }else{
      const formData = {
        ...userData,
        image: data.image
      };
      try {
        const response = await createData('/createStudentAccount', formData);
        console.log(response)
        ToastMessage(
          "Created successfully.",
          'top-right',
          false,
          true,
          true,
          true,
          undefined,
          'colored',
          'success'
        );
        addLogs(`A student account has been created with ID number ${userData.studentNo}`);
        submitData();
        displayData();
        closeModal();        
      } catch (error) {
    }
  };
  }

  return (
    <div className="h-full w-full p-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-12 h-full w-full flex justify-center items-center rounded-md">
          <div className="border h-[32vh] w-[32vh] p-4">
            <img src={file} alt="Uploaded" />
          </div>
        </div>
        <div className="border mb-4 mx-4">
          <div className="flex px-2">
            <ControlledTextField control={control} type='file' onChange={handleChange} name='image'/>
          </div>
        </div>
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
  );
};

export default AddImage;
