import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './utils/privateRoute';
import { DashboardLayout } from './Components';
import { ToastContainer } from 'react-toastify';
import { ToastProvider } from './utils/context/toastContext';
import { CrudModalProvider } from './utils/context/crudModalContext';
import { UserTypeProvider, useUser } from './utils/context/userContext';
import { protectedRoutesConfig } from './Constant/route';
import { StepperProvider } from './utils/context/stepperContext';
import {
  Login,
  ForgotPassword,
  RfidAttendance,
  ParentRegistrationForm,
} from './Pages';

const App = () => {
  const { user } = useUser();

  const userType = user.userType || null;
  return (
    <Router>
      <StepperProvider>
        <CrudModalProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/registration' element={<ParentRegistrationForm/>}/>
              <Route path="/attendance" element={<RfidAttendance />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="dashboard" element={<DashboardLayout />}>
                  {protectedRoutesConfig.map(({ path, component, allowedRoles }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute user={userType} allowedRoles={allowedRoles}>
                          {React.createElement(component)}
                        </ProtectedRoute>
                      }
                    />
                  ))}
              </Route>
              </Routes>          
            <ToastContainer />
          </ToastProvider>
        </CrudModalProvider>
      </StepperProvider>
    </Router>
  );
};



const AppWrapper = () => {
  return (
    <UserTypeProvider>
      <App />
    </UserTypeProvider>
  );
};

export default AppWrapper; 
 