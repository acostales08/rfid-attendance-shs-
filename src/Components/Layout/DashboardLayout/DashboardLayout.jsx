import React, {useState, createContext} from 'react'
import SideBar from '../../SideBar/SideBar'
import ButtonAppBar from '../../AppBar/AppBar'
import { Outlet } from 'react-router-dom'
import { useUser } from '../../../utils/context/userContext'

export const dashboardContext = createContext({})

const DasboardLayout = () => {
  const [open, setOpen] = useState(false)
  const { user } = useUser()  
  const username = user.fullName? user.fullName : "Administrator"

  return (
      <dashboardContext.Provider value={{open, setOpen}}>
        <main className="flex bg-[#f3f0f2] ">
            <div className="hidden sm:hidden md:flex lg:flex overflow-auto ">
              <SideBar/>
            </div>
            <div className="flex-1 overflow-auto h-screen">
                <ButtonAppBar name={username}/>    
                  <Outlet/>                     
            </div>
        </main>
      </dashboardContext.Provider>      

  )
}

export default DasboardLayout