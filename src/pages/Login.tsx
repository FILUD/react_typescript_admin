import { Button, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReqLogin } from '../services/AuthSv';
import { useCookies } from 'react-cookie';
import React from 'react';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    const [messageLogin, contextHolder] = message.useMessage();

    const navigateHome = () => {
        navigate('/dashboard');
    };

    const handleLogin = async (email: string, password: string) => {
        if (!email || !password) return;
        try {
            const response = await ReqLogin(email, password);
            const token = response.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            console.log(response);
            messageLogin.open({
                type: 'success',
                content: 'Login successfully!'
            });

            setCookie('userInfo', token, {
                path: '/',
                maxAge: 36000,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production'
            });

            if (response) {
                
                setTimeout(() => {
                    navigateHome();
                }, 1500);
            }
        } catch (error: any) {
            messageLogin.open({
                type: 'error',
                content: 'Login failed!'
            });
        }
    };

    return (
        <main className='h-[100vh] bg-slate-200 w-full flex justify-center items-center'>
            {contextHolder}
            <div className='bg-custom_bg w-[500px] rounded-[22px] pb-20'>
                <p className='text-center text-[24px] py-10 font-bold'>Login</p>
                <div className='flex flex-col gap-10 px-10'>
                    <span>
                        <p>Email</p>
                        <Input size='large' placeholder='Email' />
                    </span>
                    <span>
                        <p>Password</p>
                        <Input.Password size='large' placeholder='Password' />
                    </span>
                    <span className='flex justify-center'>
                        <Button
                            onClick={() => handleLogin('ticwoc3@gmail.com', '12345678')}
                            className='w-[150px]'
                            size='large'
                        >
                            Login
                        </Button>
                    </span>
                </div>
            </div>
        </main>
    );
}

export default Login;