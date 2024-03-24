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

import { imageDb } from '../../../../utils/firebase-config'
import { getDownloadURL, ref as sRef, uploadBytesResumable } 
        from "firebase/storage"

const AddImage = ({ displayData }) => {
  const [file, setFile] = useState(''); 
  const { ToastMessage } = useToastMessege(); 
  const { closeModal, modalData } = useCrudModal();
  const { userData, submitData, setUserData } = useStepper();
  const { user } = useUser();

  const defaultImage = modalData? modalData?.[0].imageurl : ""; 
  const [imgUrl, setImgUrl] = useState(defaultImage)

 

  // const { handleSubmit, formState: { errors } } = useForm();

  const handleClick = (e) => {
    const fileName = e.target.files[0];
    const name = +new Date() + fileName.name;
    console.log("name of pic: " + name);
    const metaData = {
      contentType: fileName.type
    }

    const storageRef = sRef(imageDb, "image/"+name);
    const uploadTask = uploadBytesResumable(storageRef, fileName, metaData);

    uploadTask.on("state-changed", (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      alert("error");
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("downloadURL: " + downloadURL);
        setImgUrl(downloadURL);
      })
    }
    );
  }

  const addLogs = async (message) => {
    const email = user.email;
    try {
      const formData = {
        transaction: message, 
        user: email
      };
      const response = await add('/save-logs', formData); // Changed formdata to formData
      console.log("addlogs: " +response);
    } catch (error) {
      console.error("Error occurred while making request:", error);
    }
  };

  // const saveImageLocally = async (imageData) => {
  //   const img = new Image();
  //   img.src = imageData;
  
  //   img.onload = () => {
  //     const canvas = document.createElement('canvas');
  //     const ctx = canvas.getContext('2d');
  //     canvas.width = img.width;
  //     canvas.height = img.height;
  //     ctx.drawImage(img, 0, 0);
  
  //     canvas.toBlob(async (blob) => {
  //       const formData = new FormData();
  //       formData.append('file', blob, 'uploadedImage.png');
  
  //       try {
  //         const response = await fetch('/your-server-endpoint', {
  //           method: 'POST',
  //           body: formData,
  //         });
  //         if (!response.ok) {
  //           throw new Error('Failed to upload image');
  //         }
  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //       }
  //     }, 'image/png', 1);
  //   };
  // };
  
  console.log("data:" + userData.imageurl);

  const onSubmit = async (e, data) => {
    e.preventDefault();
    if(modalData){
      const formDatas = {
        ...userData,
        imageurl: imgUrl
      };
      setUserData(formDatas);      
      try {
        const response = await updateData('/updateStudentAccount', formDatas);
        console.log("res >> " + response)
        // ToastMessage(
        //   "Updated successfully.",
        //   'top-right',
        //   false,
        //   true,
        //   true,
        //   true,
        //   undefined,
        //   'colored',
        //   'success'
        // );
        addLogs(`A student account has been updated with ID number ${userData.studentNo}`);
        submitData();
        displayData();
        closeModal();
      } catch (error) {
        
      }
    }else{
      console.log("DATA: " + data);
      const formData = {
        ...userData,
        imageurl: imgUrl
      };
      console.log('IMG FORM DATA: ' + formData);
      try {
        const response = await createData('/createStudentAccount', formData);
        console.log(response)
        console.log("201: " + response.data);
        if (response.status == 201) {
          console.log("166: ");
          // ToastMessage(
          //   "Created successfully.",   
          //   'top-right',
          //   false,
          //   true,
          //   true,
          //   true,
          //   undefined,
          //   'colored',
          //   'success'
          // );
          addLogs(`A student account has been created with ID number ${userData.studentNo}`);
          submitData();
          displayData();
          closeModal();   
          alert("Created successfully");
        }    
      } catch (error) {
    }
  };
  }

  return (
    <div className="h-full w-full p-1">
      <form onSubmit={onSubmit}>
        <div className="mb-12 h-full w-full flex justify-center items-center rounded-md">
          <div className="border h-[32vh] w-[32vh] overflow-hidden">
            <img src={imgUrl} alt="Uploaded"  className="border h-[32vh] w-[32vh]"/>
          </div>
        </div>
        <div className="border mb-4 mx-4">
          <div className="flex px-2">
            <input type='file' onChange={handleClick} name='imageurl'/>
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
