import React from 'react'
import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'
import ForgotPasswordStepper from '../Components/Stepper/stepper/forgotPasswordStepper'

const ForgotPassword = () => {
  return (
    <div className="h-screen w-full bg-[#fceff9] flex justify-center items-center">
      <div className="absolute top-0 left-0 m-4">
        <p className=""><Link to="/"><span className="font-[8px] text-gray-600">&larr; Back to login</span></Link></p>
      </div>
      <div className="flex justify-center items-center">
        <Paper elevation={4} style={{
          width: "100%",
        }}>
          <ForgotPasswordStepper/>
        </Paper>
      </div>
    </div>
  )
}

export default ForgotPassword
