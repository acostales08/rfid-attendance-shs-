import React from 'react';
import CustomStepper from '../../Stepper/Stepper';
import { useStepper } from '../../../utils/context/stepperContext';
import TeacherInfo from '../../Form/sys-admin-forms/Teacher-Form/teachersInfo'
import AcademicsForm from '../../Form/sys-admin-forms/Teacher-Form/academics'

const TearcherForm = ({displayData}) => {

  const { currentStep } = useStepper()
  const steps = ['Teacher Info', 'Select Class'];

  const renderStepContent = (step) => {
    switch (step) {
      case 1 :
        return <TeacherInfo />;
      case 2:
        return <AcademicsForm displayData={displayData}/>;
      default:
        return null;
    }
  };

  return (
    <div>
        <div className="mb-4">
          <CustomStepper steps={steps} activeStep={currentStep -1}/>        
        </div>

      {renderStepContent(currentStep)}
    </div>
        );
        };

export default TearcherForm;
