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
  console.log(name.fullname)

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


  const onSubmitData = async (data) => {
    try {
      const userStudent = data.rfid;
      const studentInfo = student.find((student) => student.rfidNo === userStudent);
      if (studentInfo) {
        const formData = {
          rfid: userStudent,
        };
        console.log(formData)
        const response = await axios.post('localhost:8181/attendance/v1/api/time-in-time-out', formData)
        const message = response.data;
        setName(message)

        const studentName = message.fullname;
        if (message.result === 1) {
          ToastMessege(
            `rfid not exist sa student table`,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
        } else if (message.result === 2) {
          ToastMessege(
            `Welcome ${studentName}`,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
        } else if (message.result === 3) {
          ToastMessege(
            `${studentName} You can no longer scan an RFID card because you timed in and out today!`,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'warning'
          );
        } else if (message.result === 4) {
          ToastMessege(
            `Welcome ${studentName}`,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
        } else if (message.result === 5) {
          ToastMessege(
            `Bye ${studentName}`,
            'top-right',
            false,
            true,
            true,
            true,
            undefined,
            'colored',
            'success'
          );
        }
        setRfidValue('');
        textFieldRef.current.focus();
      } else {
        console.log('Student not found');
      }
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
                <h3 className='p-4 w-[75%] text-center text-3xl text-gray-600'>{name.fullname}</h3>
                    {name.result === 1 ? (
                       <h3 className='p-4 w-[75%] text-center text-xl text-gray-600'>rfid not exist sa student table</h3>
                     ):name.result === 2 ? (                    
                         <h3 className='p-4 w-[75%] text-center text-xl text-gray-600'>Welcome</h3>
                     ) : name.result === 5 ? (
                       <h3 className='p-4 w-[75%] text-center text-xl text-gray-600'>Bye </h3>
                    ): name.result === 3 ? (
                       <h3 className='p-4 w-[75%] text-center text-xl text-gray-600'>You can no longer scan an RFID card because you timed in and out today!</h3>
                     ) : (<></>)}
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
        <div className=" h-full w-full p-6">
            <div className="border h-[55vh] w-[65vh]">

            </div> 
            <div className="w-full border p-2 flex">
              <h3 className="">Fullname:</h3>
              <h3 className="border rounder-md w-full"></h3>
            </div>
        </div>
      </Paper>
    </div>
  )
}

export default RfidAttendance;
