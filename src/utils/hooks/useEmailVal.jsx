import React, { useState, useEffect } from 'react'
import { fetchAccountData } from '../api'

const useEmailVal = () => {
    const [allEmail, setAllEmail] = useState([])

    useEffect(() => {
        fetchEmails();
    },[])

    const fetchEmails = async() => {
        try {
            const response = fetchAccountData('/email-exist')
            setAllEmail(response)
        } catch (error) {
            console.error("Error", error)
        }
    } 
  return {allEmail}
}

export default useEmailVal