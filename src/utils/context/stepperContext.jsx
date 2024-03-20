import React, {createContext, useContext, useState} from 'react'

export const StepperContext = createContext()

const StepperProvider = ({children}) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [userData, setUserData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    const isFinalStep = () => currentStep === 3

    const handleNext = () => {
      setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  }
    const handleBack = () => {
      setCurrentStep((prevCurrentStep) => prevCurrentStep - 1)
    }
  
  
    const submitData = async () => {
      setFinalData(finalData => [...finalData, userData]);
      setUserData("")
      setCurrentStep(1);

    }

    const value = {
        userData,
        setUserData,
        currentStep,
        setCurrentStep,
        finalData,
        setFinalData,
        handleNext,
        handleBack,
        isFinalStep,
        submitData,
        teacherData,
        setTeacherData

    }
  return (
    <StepperContext.Provider value={value}>
        {children}
    </StepperContext.Provider>
  )
}

const useStepper = () => {
    const Context = useContext(StepperContext)
    
    if(!Context) {
        throw new Error("useStepper must be used inside stepperProvider")
    }
    return Context
}

export {StepperProvider, useStepper}
