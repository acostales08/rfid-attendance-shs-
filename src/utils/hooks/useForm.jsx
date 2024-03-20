import { useState } from 'react'

const useForm = (initialState) => {

    const [formData, setFormData ] = useState(initialState);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const handleAddressChange = (event) => {
        const { name, value } = event.target;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          address: {
            ...prevFormData.address,
            [name]: value
          }
        }));
      };

      const handleCredentialChange = (event) => {
        const { name, value } = event.target;
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          credentials: {
            ...prevFormData.credentials,
            [name]: value
          }
        }));
      };
 
    const resetForm = () => {
        setFormData(initialState);
    };

    return { formData, handleChange, resetForm, setFormData, handleAddressChange, handleCredentialChange };
}

export default useForm