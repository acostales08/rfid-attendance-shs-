import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { postAttendance } from '../utils/api';
import useCount from '../utils/hooks/useCount';
import { ControlledCard, ControlledBackdrop } from '../Components';
import { useToastMessege } from '../utils/context/toastContext';

const RfidAttendance = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [ loading, setLoading ] = useState(true)
  const [rfidValue, setRfidValue] = useState('');
  const [name, setName] = useState('')
  const textFieldRef = useRef(null);

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
        const response = await postAttendance('/time-in-time-out', formData);
        const message = response.data;
        setName(message)

        // const studentName = message.fullname;
        // if (message.result === 1) {
        //   ToastMessege(
        //     `rfid not exist sa student table`,
        //     'top-right',
        //     false,
        //     true,
        //     true,
        //     true,
        //     undefined,
        //     'colored',
        //     'success'
        //   );
        // } else if (message.result === 2) {
        //   ToastMessege(
        //     `Welcome ${studentName}`,
        //     'top-right',
        //     false,
        //     true,
        //     true,
        //     true,
        //     undefined,
        //     'colored',
        //     'success'
        //   );
        // } else if (message.result === 3) {
        //   ToastMessege(
        //     `${studentName} You can no longer scan an RFID card because you timed in and out today!`,
        //     'top-right',
        //     false,
        //     true,
        //     true,
        //     true,
        //     undefined,
        //     'colored',
        //     'warning'
        //   );
        // } else if (message.result === 4) {
        //   ToastMessege(
        //     `Welcome ${studentName}`,
        //     'top-right',
        //     false,
        //     true,
        //     true,
        //     true,
        //     undefined,
        //     'colored',
        //     'success'
        //   );
        // } else if (message.result === 5) {
        //   ToastMessege(
        //     `Bye ${studentName}`,
        //     'top-right',
        //     false,
        //     true,
        //     true,
        //     true,
        //     undefined,
        //     'colored',
        //     'success'
        //   );
        // }
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
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
    <main className='mx-auto h-screen w-full flex justify-center items-start bg-[#fceff9]'>
      <ControlledCard
        style={{ padding: '0', marginTop: '32px', borderRadius: '20px' }}
        className="h-[95%] w-[95%]"
        children={
          <>
          <div className="">
              <div className="flex flex-col  w-full sm:p-1 md:p-5 lg:p-10">
                <div className="w-full h-full p-4 flex justify-center items-center gap-2">
                  <img src="logo.png" alt="rci logo" className='sm:w-10 md:w-12 lg:w-16 h-18' />
                  <div className="">
                    <div className="">
                      <h1 className="sm:text-[16px] md:text-[30px] lg:text-[40px] font-bold sm:tracking-[0.4px] md:tracking-[0.6px] lg:tracking-[1px] text-[#943c84] drop-shadow-lg">RICHWELL COLLEGES INCORPORATED</h1>
                    </div>
                    <div className=" mt-[-12px] sm:mt-[-8px]">
                      <p className="font-medium text-gray-700 sm:text-[10px] md:text-[15px] lg:text-[20px] sm:tracking-[1px] md:tracking-[4.5px] lg:tracking-[6.1px]">Gen. Alejo Santos Rd., San Jose, Plaridel, bulacan</p>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full flex lg:justify-center items-center flex-col">
                  <h1 className="text-[32px] sm:text-[20px] font-bold tracking-[1rem] text-gray-600 drop-shadow-lg">Attendance</h1>
                  <p className='text-3xl sm:text-xl pt-5 text-gray-600 tracking-wider sm:tracking-normal'>{currentDateTime}</p>
                  <p className="text-2xl sm:text-xl pt-5 text-gray-600 tracking-wider">Please scan your rfid for attendance</p>
                </div>
                <div className="flex justify-center items-center h-full w-full p-5 flex-col">
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
                  <div className="w-[40%]">
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
              </div>
              <div className="">

              </div>            
          </div>

          </>
        } />
    </main>
    )}    
    </>


  );
};

export default RfidAttendance;
