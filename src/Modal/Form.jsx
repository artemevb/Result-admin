import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const notifyError = () => toast.error('Ошибка: неправильный логин или пароль');

    const navigate = useNavigate();

    const handleChangeLogin = (e) => {
        setLogin(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const getToAuth = () => {
        if (login === '' || password === '') {
            notifyError();
            return;
        }

        axios.post('http://213.230.91.55:9000/auth/login', {
            username: login,
            password
        }).then((response) => {
            let token = response.data.data.token;
            console.log("Response of auth", response)
            console.log("Token of auth", token)
            localStorage.setItem('token', token);
            if (token) {
                navigate("/add_blog_cases");
            }
        })
        .catch(function (error) {
            console.error("Error submitting form:", error);
            notifyError();
        });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div className="background-modal p-8 rounded-[41px] shadow-lg w-[650px] h-[481px]">
                <h2 className="text-white text-center text-4xl mb-6">Вход</h2>
                <div>
                    <div className="mb-4 mt-[80px]">
                        <label className="block text-white mb-2" htmlFor="username">Логин</label>
                        <input onChange={handleChangeLogin} className="w-full p-4 button-modal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" type="text" id="username" name="username" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white mb-2" htmlFor="password">Пароль</label>
                        <input onChange={handleChangePassword} className="w-full p-4 button-modal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" type="password" id="password" name="password" />
                    </div>
                    <div className="flex justify-center w-full">
                        <button onClick={getToAuth} className="w-[367px] bg-white text-button-color p-4 rounded-[41px] hover:text-gray-500 text-[20px]">Войти</button>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Form;
