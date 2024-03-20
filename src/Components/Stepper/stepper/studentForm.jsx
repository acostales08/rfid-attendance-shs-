import React from 'react';
import CustomStepper from '../../Stepper/Stepper';
import { useStepper } from '../../../utils/context/stepperContext';
import StudentInfoForm from '../../Form/sys-admin-forms/Student-form/studentInfo'
import GuardianInfo from '../../Form/sys-admin-forms/Student-form/guardianInfo'
import AcademicsForm from '../../Form/sys-admin-forms/Student-form/academics'

const StudentForm = ({displayData}) => {

  const { currentStep } = useStepper()
  const steps = ['Student Info', 'Guardians Info', 'Academics'];

  const renderStepContent = (step) => {
    switch (step) {
      case 1 :
        return <StudentInfoForm />;
      case 2:
        return <GuardianInfo />;
      case 3:
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

export default StudentForm;
