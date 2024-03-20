import React from 'react'
import { Paper } from '@mui/material'

const DashboardCard = ({total, text}) => {

  return (
    <>
        <Paper elevation={3}>
          <div className="flex flex-col h-full w-full py-4 text-[#7c6278]">
            <div className="h-[80%] w-full font-sans font-semibold flex justify-center items-center text-2xl lg:text-3xl">
              {total}              
            </div>
            <div className="h-[20%] w-full text-[10px] lg:text-[14px] flex justify-center items-center text-center">
              {text}              
            </div>
          </div>
        </Paper>
    </>
  )
}

export default DashboardCard