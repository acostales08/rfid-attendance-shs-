import React, {useState} from 'react'
import backgroundImage from '../assets/richwell.jpg'
import { useUser } from '../utils/context/userContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useToastMessege } from '../utils/context/toastContext';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { 
    ControlledCard, 
    ControlledTextfield, 
    ControlledButton, 
} from '../Components'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import requiredString from '../utils/Schema/formSchema';
import { z } from 'zod';
import { loginApi } from '../utils/api';


const Login = () => {
    const { ToastMessege } = useToastMessege();
    const { setUser } = useUser()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const loginSchema = z.object({
        email: requiredString("email is required").email("invalid email"),
        password: requiredString("password is required")
    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } =useForm({
        resolver: zodResolver(loginSchema)
    })
    
    const onSubmit = async(data, e) => {
        e.preventDefault();
    
        const formData = {
          email: data.email,
          password: data.password,
        };
        try {
            const response = await loginApi('/login', formData)
            const userResponse = response.data
            setUser(userResponse);
            
            if(userResponse === 'invalid'){
                ToastMessege(
                    "User not exist or incorrect password",
                    'top-right',
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    'colored',
                    'error'
                  );
            }else{

                const user = {
                    fullName:  userResponse.fullName,
                    userType: userResponse.userType,
                    email: userResponse.email,
                    studentNo: userResponse.studentNo,
                    employeeId: userResponse.employeeId
                }
                localStorage.setItem('userData', JSON.stringify(user));
                ToastMessege(
                    "Login Successfully",
                    'top-right',
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    'colored',
                    'success'
                  );
            if (userResponse.userType === "superadmin") {
            navigate('/dashboard', { replace: true });
            } else if (userResponse.userType === 'admin') {
            navigate('/dashboard', { replace: true });
            } else if (userResponse.userType === 'student') {
            navigate('/dashboard/student', { replace: true });
            } else if (userResponse.userType === 'parent') {
            navigate('/dashboard/parent', { replace: true });
            } else if (userResponse.userType === 'teacher') {
            navigate('/dashboard/teacher', { replace: true });
            } else {
            navigate('/', { replace: true });
            }                  
            }
        } catch (error) {
            if(error.response.data){
                ToastMessege(
                    "User not exist",
                    'top-right',
                    false,
                    true,
                    true,
                    true,
                    undefined,
                    'colored',
                    'error'
                  );
            }
        } 
      };

  return (
        <main className="constainer mx-auto h-screen w-full bg-[#fceff9] flex justify-center items-center p-4 lg:p-0">
            <ControlledCard
                style={{padding: '0', borderRadius: '20px'}}
                className="h-[75%] lg:w-4/6"
                children = {
                    <div className='lg:flex h-full flex justify-center items-center'>
                        <div className=" sm:hidden md:flex lg:flex justify-center items-center h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                            <div className="bg-[#ffffff] h-full w-full bg-opacity-70 shadow-lg backdrop-blur-5 webkit-backdrop-blur-5 flex justify-center items-center">
                                <img src="logo.png" alt="rci logo" className="opacity-90 w-36" />
                            </div>
                        </div>
                        <div className=" h-full w-full px-4 flex justify-center items-center">
                            <div className="">
                                    <div className="w-full h-16 my-4 mt-0 flex justify-start items-center gap-2">
                                        <img src="logo.png" alt="rci logo" className='w-8 lg:w-10' />
                                        <div className="">
                                            <h1 className="text-[16px] lg:text-2xl font-bold tracking-[0.2rem] text-[#943c84] drop-shadow-lg">Richwell Colleges Inc.</h1>   
                                            <p className=" font-medium text-gray-700 text-[10px] lg:text-sm">Gen. Alejo Santos Rd., San Jose, Plaridel, Bulacan</p>                                     
                                        </div>

                                    </div>
                                <div className="w-full h-fit p-4">
                                <form action="" onSubmit={handleSubmit(onSubmit)}>
                                                <ControlledTextfield
                                                    variant='standard'
                                                    label='Email'
                                                    name='email'
                                                    control={control}
                                                    error={!!errors.email}
                                                    helperText={errors.email?.message}
                                                />
                                                <ControlledTextfield
                                                    fullWidth
                                                    label='Password'
                                                    variant='standard'
                                                    type={showPassword ? 'text' : 'password'}
                                                    name='password'
                                                    error={!!errors.password}
                                                    helperText={errors.password?.message}
                                                    control={control}
                                                    InputProps={{
                                                        endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            <ControlledButton
                                            text='Submit'
                                            type='submit'
                                            style={{backgroundColor: '#943c84', marginTop: '20px'}}
                                            variant='contained'
                                            color='secondary'
                                            fullWidth
                                            />     
                                            <div className="text-[#4d494f] flex justify-center items-center flex-col m-1 lg:m-4">
                                                <p className=""><Link to="/forgotPassword"><span className="font-[6px] text-gray-600">Forgot your password ?</span></Link></p>
                                                <p className=""><Link to="/registration"><span className="font-[6px] text-gray-600">Parent Registration</span></Link></p>
                                            </div>             
                                        </form>  
                                    </div>

                            </div>
                        </div>
                    </div>
                }
            />
        </main>        

  )
}

export default Login