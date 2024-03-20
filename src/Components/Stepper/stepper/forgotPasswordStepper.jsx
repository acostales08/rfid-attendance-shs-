import React from 'react'
import { Link } from 'react-router-dom'
import { Paper } from '@mui/material'
import ControlledTypography from '../../Typography/Typography'
import { useStepper } from '../../../utils/context/stepperContext'
import FirstStep from '../../Form/forgotPasswordStepper/firstStep'
import SecondStep from '../../Form/forgotPasswordStepper/secondStep'
import ThirdStep from '../../Form/forgotPasswordStepper/thirdStep'
import CustomStepper from '../Stepper'

const ForgotPasswordStepper = () => {

  const { currentStep } = useStepper();
  
  const steps = ['Input Email', 'Input Code', 'Change Password'];

  const renderForgotPassword = (step) => {
    switch(step){
      case 1 :
        return <FirstStep/>
      case 2 :
        return <SecondStep/>
      case 3 :
        return <ThirdStep/>
    }
  }
  return (
    <div>
      <div className="flex justify-center items-center w-full flex-col px-4 lg:px-16">
          <div className="mb-6 mt-5">
              <ControlledTypography
                variant="h5"
                text="Forgot Password"
              />                
          </div>
          <div className="mb-16 w-full">
            <CustomStepper steps={steps} activeStep={currentStep -1}/>                
          </div>
          <div className=" mb-6 h-[30vh] w-full ">
          {renderForgotPassword(currentStep)}          
          </div>            
      </div>
    </div>
  )
}

export default ForgotPasswordStepper