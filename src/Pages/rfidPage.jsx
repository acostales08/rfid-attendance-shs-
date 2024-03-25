import React, { useState, useEffect, useRef } from 'react';
import { TextField, Paper } from '@mui/material';
import { postAttendance } from '../utils/api';
import useCount from '../utils/hooks/useCount';
import { ControlledCard, ControlledBackdrop } from '../Components';
import { useToastMessege } from '../utils/context/toastContext';
import axios from 'axios';

const RfidAttendance = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [ loading, setLoading ] = useState(true)
  const [rfidValue, setRfidValue] = useState('');
  const [name, setName] = useState('')
  const textFieldRef = useRef(null);

  const { ToastMessege } = useToastMessege();

  const { student } = useCount();
  console.log(student.data)

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };

      const formattedDateTime = now.toLocaleString('en-US', options);
      setCurrentDateTime(formattedDateTime);
      setLoading(false)
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(name?.imgUrl)

  const onSubmitData = async (data) => {
    try {
        const formData = {
          rfid: data.rfid
        }
        const response = await postAttendance('/time-in-time-out', formData)
        const message = response.data;
        setName(message)
        setRfidValue('');
        textFieldRef.current.focus();
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <div className='h-screen w-full bg-[#fceff9] p-4 font-sans flex gap-4  justify-center items-center'>
      <Paper elevation={5}>
        <div className=" h-full w-full flex p-4 pt-4 items-start">
            <div className="flex justify-center items-center gap-2 w-full border flex-col">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="rci-logo" className='w-[50px] h-[50px]' />
                <div className=" font-sans p-2">
                  <h3 className="text-[#943c84] drop-shadow-lg tracking-[1px] text-[30px] font-bold">RICHWELL COLLEGES INCORPORATED</h3>     
                  <p className="font-medium text-gray-600 tracking-[4.4px] mt-[-11px]">Gen. Alejo Santos Rd., San Jose, Plaridel, bulacan</p>           
                </div>                
              </div>
              <div className="border w-full">
                <h1 className="text-[32px] text-center font-bold tracking-[1rem] text-gray-600 drop-shadow-lg">Attendance</h1>
                <p className='text-xl sm:text-xl pt-5 text-gray-600 tracking-wider text-center'>{currentDateTime}</p>
                <p className="text-xl sm:text-xl pt-5 text-gray-600 tracking-wider text-center">Please scan your rfid for attendance</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); onSubmitData({ rfid: e.target.rfid.value }); }}>
                    <TextField
                      type="text"
                      name='rfid'
                      value={rfidValue}
                      onChange={(e) => setRfidValue(e.target.value)}
                      style={{ opacity: 0 }}
                      autoFocus
                      autoComplete='false'
                      inputRef={textFieldRef}
                    />
                  </form>
            </div>
        </div>
      </Paper>
      <Paper elevation={3}>
        <div className=" h-full w-full p-5">
            <div className="border h-[55vh] w-[80vh] overflow-hidden">
                <div className="flex justify-center items-end">
                  <img src={name?.imgUrl} alt="" className='h-[55vh] w-[80vh]' />
                </div>
            </div> 
            <div className="w-full h-fit border flex justify-center items-center">
            {name.result === 1 ? (
                       <h3 className='p-4 w-[75%] text-center text-[20px] text-gray-600'>rfid not exist sa student table</h3>
                     ):name.result === 2 ? (                    
                         <h3 className='p-4 w-[75%] text-center text-[20px] text-gray-600'>Welcome</h3>
                     ) : name.result === 5 ? (
                       <h3 className='p-4 w-[75%] text-center text-[20px] text-gray-600'>Bye </h3>
                    ): name.result === 3 ? (
                       <h3 className='p-4 w-[75%] text-center text-[12px] text-gray-600 '>You can no longer scan an RFID card because you timed in and out today!</h3>
                     ) : (<></>)}
            </div>
            <div className="w-full border p-6 pl-2 flex gap-3 text-xl ">
              <h3 className="">Fullname:</h3>
              <h3 className="border rounder-md w-full p-1">{name.fullname}</h3>
            </div>
        </div>
      </Paper>
    </div>
  )
}

export default RfidAttendance;
