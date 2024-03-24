import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { ControlledDataTable, ControlledBackdrop} from '../../Components';
import { fetchSection, fetchAccountData } from '../../utils/api';
import { useUser } from '../../utils/context/userContext';

const TeacherInformation = () => {
  const [teacherInfo, setTeacherInfo] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false)

  const { user } = useUser()
console.log(teacherInfo)

  useEffect(() => {
    displayData();
    displayClasses()
  }, []);

  const displayData = async () => {
    try{
      const teacherData = await fetchAccountData('/displayAllTeacher');
      setTeacherInfo(teacherData.data);      
    }catch(error){
      console.log("errorr fetching data", error);
    }finally{
      setLoading(false)
    }
  };

  const displayClasses = async() => {
    const response = await fetchSection(`/displayAcadsTeacher?empId=${user.employeeId}`)
    setClasses(response.data)
  }

  const myProfile = teacherInfo.filter(item => item.employeeId === user.employeeId)


  const NumberedCell = ({ rowIndex }) => <div>{rowIndex}</div>;


  const columns = [
    {
      name: 'No.',
      selector: (row, index) => <NumberedCell rowIndex={index + 1} />,
      sortable: true,
      width: "80px",
    },
    { 
      name: "Section", 
      selector: (row) => row.classes, 
      sortable: true,
      center: true,
      width: "400px",
    }
  ];  

  return (
    <>
    {loading? <ControlledBackdrop open={loading}/> : (
      <div className='h-full w-full bg-[#f3f0f2] p-5'>
        <div className="flex gap-4 justify-center items-center sm:flex-col">
          <div className="h-full w-[40%] sm:w-full">
            <Paper elevation={1} style={{
              display: "flex",
              justifyContent: "center", 
              alignItems: "center", 
              padding: "32px",
              flexDirection: "column"
            }}>
              {myProfile.map((item, index) => (
                <React.Fragment key={index}>
                  <h1 className="text-gray-600 text-2xl pb-8">Profile</h1>
                  <div className="text-1xl text-gray-600 text-[16px] tracking-widest">
                    <p className=" font-serif text-gray-600">Employee Number : <span className='font-normal'>{item.employeeId}</span></p>
                    <p className=" font-serif text-gray-600">Full Name : <span className='font-normal'>{`${item.lastName}, ${item.firstName} ${item.middleName}`}</span></p>
                    <p className=" font-serif text-gray-600">Email Address : <span className='font-normal'>{item.credentials.email}</span></p>
                    <p className=" font-serif text-gray-600">Address : <span className='font-normal'>{`${item.address.street}, ${item.address.barangay}, ${item.address.city}, ${item.address.zip_code}`}</span></p>
                  </div>              
                </React.Fragment>
              ))}
            </Paper>
          </div>
          <div className="">
          <Paper elevation={3}>
            <ControlledDataTable
              columns={columns}
              data={classes}
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
          </div>

        </div>
      </div>      
    )}
    </>

  );
};

export default TeacherInformation;
