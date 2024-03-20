import React, {useState} from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'; 
import { Menu, MenuItem } from '@mui/material'; 
import { FaBars } from 'react-icons/fa';
import ControlledTypography from '../Typography/Typography';
import { dashboardContext } from '../Layout/DashboardLayout/DashboardLayout';
import { useUser } from '../../utils/context/userContext';
import { MdMoreVert } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar({name}) {
  const [anchorEl, setAnchorEl] = useState(false)
  const {setOpen, open} = useContext(dashboardContext)
  const { user, setUser } = useUser()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("userData")
    window.location.href = '/';
  };

  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor: '#FFFF', color: '#787878'}}>
          <Toolbar style={{display: 'flex', justifyContent:'space-between'}}>
              <IconButton
                onClick={() => setOpen(!open)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FaBars size={20}  className='cursor-pointer'/>
              </IconButton>     
              <div className="flex gap-2">
                <ControlledTypography
                text='Welcome'
                />
                <ControlledTypography
                text={name}
                />   
                <div className="mt-[-7px] m-0">
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MdMoreVert size={25} />
                </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: '20rem',
                        width: '9rem',
                      },
                    }}
                  >
                    <MenuItem onClick={handleLogout}>
                    <IoIosLogOut size={20} />
                    Logout
                    </MenuItem>
                  </Menu>                  
                </div>
              
              </div>         

          </Toolbar>
        </AppBar>
      </Box>      
 
  );
}
