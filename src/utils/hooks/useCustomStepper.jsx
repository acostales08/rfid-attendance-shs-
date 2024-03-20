import { useState } from 'react';

const useCustomStepper = (initialActiveStep = 0, totalSteps = []) => {
  const [formData, setFormData] =useState({})
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  const isLastStep = () => activeStep === totalSteps.length - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => Math.min(prevActiveStep + 1, totalSteps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleReset = () => {
    setActiveStep(initialActiveStep);
  };

  return {
    activeStep,
    isLastStep,
    handleNext,
    handleBack,
    handleReset,
    formData,
    setFormData
  };
};

export default useCustomStepper;
