import React, { createContext, useContext, useState } from 'react';
import { useStepper } from './stepperContext';

const CrudModalContext = createContext();


const CrudModalProvider = ({ children }) => {

  const { setUserData, setCurrentStep } = useStepper()
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [operationType, setOperationType] = useState(null);

  const [studentcount, setStudentCount] = useState(0)

  const openModal = (data, type) => {
    setIsOpenModal(true);
    setModalData(data);
    setOperationType(type);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setUserData("")
    setCurrentStep(1)
    setTimeout(() => {
        setOperationType(null);
        setModalData(null);
    }, 100);
  };


  return (
    <CrudModalContext.Provider value={{ isOpenModal, modalData, operationType, openModal, closeModal, studentcount, setStudentCount }}>
      {children}
    </CrudModalContext.Provider>
  );
};

const useCrudModal = () => {
  const context = useContext(CrudModalContext);
  if (!context) {
    throw new Error('useCrudModal must be used within a CrudModalProvider');
  }
  return context;
};

export { CrudModalProvider, useCrudModal };
