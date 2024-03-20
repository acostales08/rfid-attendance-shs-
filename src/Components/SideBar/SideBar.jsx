import React, {useContext, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useUser } from '../../utils/context/userContext';
import { SidebarData, StudentSidebarData, ParentSidebarData, TeacherSidebarData, SupAdminSidebarData } from '../../Constant/Path'

import { Drawer } from '@mui/material'
import { dashboardContext } from '../Layout/DashboardLayout/DashboardLayout'


const SideBar = () => {

    const { user } = useUser()
    const { open, setOpen } = useContext(dashboardContext);
    const location = useLocation();
    const [manageAccountOpen, setManageAccountOpen] = useState(false);

    const toggleManageAccount = () => {
        setManageAccountOpen(!manageAccountOpen);
    };
    
    const onClose = () => {
        setOpen(!open)
    }

    const userType = user.userType || null

    const getSidebarData = () => {
        let username = '';
        let data = [];
    
        switch (userType) {
            case 'superadmin':
                username = 'Administrator';
                data = SupAdminSidebarData;
                break;
            case 'admin':
                username = 'Administrator';
                data = SidebarData;
                break;
            case 'student':
                username = 'Student';
                data = StudentSidebarData;
                break;
            case 'parent':
                username = 'Parent';
                data = ParentSidebarData;
                break;
            case 'teacher':
                username = 'Teacher';
                data = TeacherSidebarData;
                break;
            default:
            return null;

        }
    
        return { username, data };
    };

    const { username, data: sidebarData } = getSidebarData();
  return (
      <>
        <aside className={`${open ? 'w-16 overflow-hidden' : 'w-64'} h-screen bg-[#381d38] text-[#F5C85F] flex flex-col justify-between duration-700 overflow-hidden b-10 `}>
                <div className="h-[65px] px-4 border-b border-gray-600 flex justify-start items-center gap-2">
                    <img className={`${open ? 'w-[25px] py-2' : 'w-[25px]'}`} src="\logo.png" alt="logo"/>
                    <p className={`${open ? 'opacity-0 transition-opacity duration-400 ml-8 fixed' : 'opacity-100 transition-opacity duration-1000 fixed ml-8'} text-[20px] leading-8`}>Richwell Colleges Inc.</p>
                </div>
                <div className=" h-16 w-64 border-b border-gray-600 flex justify-center items-center text-[#eee5d0]">
                    <h3 className={`${open ? 'opacity-0' : ' opacity-100 transition-opacity duration-1000 text-center tracking-widest text-[24px]'}`}>{username}</h3>
                </div> 
                <div className="h-full w-full overflow-hidden">
                    <ul className="mt-10 px-2 text-[15px] font-normal text-[#eee5d0] leading-loose">
                        {sidebarData.map(({ id, title, path, img, subLinks }) => (
                            <li key={id} className="relative">
                                {title === 'Manage Accounts' && (
                                    <>
                                        <Link
                                            to={path}
                                            className={`flex justify-start items-center py-2 rounded-md ${manageAccountOpen ? 'bg-[#662366] hover:text-white shadow-xl' : 'hover:bg-[#491d49] hover:text-white shadow-xl'}`}
                                            onClick={toggleManageAccount}
                                        >
                                            {img}
                                        <span className={`${open ? 'opacity-0 transition-opacity duration-400 fixed ml-10' : 'opacity-1000 transition-opacity duration-[1300ms] fixed ml-10 flex justify-between items-center'}`}>{title} <IoIosArrowBack className={`${manageAccountOpen ? 'ml-12 -rotate-90 duration-500' : 'ml-12 duration-500' }`}/> </span>
                                        </Link>
                                        {manageAccountOpen && subLinks.length > 0 && (
                                            <ul>
                                                {subLinks.map((sublink, subIndex) => (
                                                    <Link to={sublink.path} key={subIndex}
                                                        className={`flex justify-start items-center py-1 rounded-md ${location.pathname === sublink.path ? 'bg-[#4e214e] hover:text-white' : 'hover:bg-[#491d49] hover:text-white'}`}>
                                                            {sublink.img} 
                                                            <span className={`${open ? 'opacity-0 transition-opacity duration-400 fixed ml-10' : 'opacity-1000 transition-opacity duration-[1000ms] fixed ml-10'}`}>{sublink.title}</span>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                )}
                                {title !== 'Manage Accounts' && (
                                    <Link
                                        to={path}
                                        className={`flex justify-start items-center py-2 rounded-md ${location.pathname === path ? 'bg-[#662366] hover:text-white shadow-xl' : 'hover:bg-[#491d49] hover:text-white '}`}
                                    >
                                        {img}
                                        <span className={`${open ? 'opacity-0 transition-opacity duration-400 fixed ml-10' : 'opacity-1000 transition-opacity duration-[1300ms] fixed ml-10'}`}>{title}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${open ? 'opacity-0' : ' opacity-100 transition-opacity duration-1000 h-12 flex justify-center items-center'}`}>
                    <span className='text-[#eee5d0] text-[14px]'>&copy; {new Date().getFullYear()} RCI. All Rights Reserved.</span>
                </div>
                <Drawer open={open} onClose={onClose} className='hidden sm:flex'>
                    <div className="h-full w-64 bg-[#381d38] text-[#F5C85F] flex flex-col justify-between duration-700 overflow-hidden">
                    <div className="h-[65px] px-4 border-b border-gray-600 flex justify-start items-center gap-2">
                        <img className='w-[25px] py-2' src="\logo.png" alt="logo"/>
                        <p className= 'fixed ml-8 text-[20px] leading-8'>Richwell Colleges Inc.</p>
                    </div>
                        <div className="h-full w-full overflow-auto">
                        <div className=" h-16 w-64 border-b border-gray-600 flex justify-center items-center text-[#eee5d0]">
                            <h3 className= 'text-center tracking-widest text-[24px]'>{username}</h3>
                        </div>
                            <ul className="mt-10 px-2 text-[15px] font-normal text-[#eee5d0] leading-loose">
                                {sidebarData.map(({ id, title, path, img, subLinks }) => (
                                    <li key={id} className="relative">
                                        {title === 'Manage Accounts' && (
                                            <div>
                                                <Link
                                                    to={path}
                                                    className={`flex justify-start items-center py-2 rounded-md ${manageAccountOpen ? 'bg-[#662366] hover:text-white shadow-xl' : 'hover:bg-[#491d49] hover:text-white shadow-xl'}`}
                                                    onClick={toggleManageAccount}
                                                >
                                                    {img}
                                                    {title}
                                                </Link>
                                                {manageAccountOpen && subLinks.length > 0 && (
                                                    <ul className='opacity-1000 transition-opacity duration-[1300ms] w-full absolute top-full left-0 bg-[#412141] text-[#eee5d0] rounded-md shadow-md mt-2'>
                                                        {subLinks.map((sublink, subIndex) => (
                                                            <Link to={sublink.path} key={subIndex}>
                                                                <li className={`flex justify-start items-center py-1 rounded-md ${location.pathname === sublink.path ? 'bg-[#5c1f5c] hover:text-white' : 'hover:bg-[#491d49] hover:text-white'}`}>
                                                                    {sublink.img}
                                                                    {sublink.title}
                                                                </li>
                                                            </Link>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                        {title !== 'Manage Accounts' && (
                                            <Link
                                                to={path}
                                                className={`flex justify-start items-center py-2 rounded-md ${location.pathname === path ? 'bg-[#662366] hover:text-white shadow-xl' : 'hover:bg-[#491d49] hover:text-white '}`}
                                            >
                                                {img}
                                                {title}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${open ?' opacity-100 transition-opacity duration-1000 h-12 flex justify-center items-center' :  'opacity-0' }`}>
                            <span className='text-[#eee5d0] text-[14px]'>&copy; {new Date().getFullYear()} RCI. All Rights Reserved.</span>
                        </div>
                    </div>
                </Drawer>
        </aside>
      </>
    
  )
}

export default SideBar