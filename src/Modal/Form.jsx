import axios from 'axios';
import React from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleChangeLogin = (e) => {
        setLogin(e.target.value)
        console.log(login)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        console.log(password)
    }

    const getToAuth = () => {
        if (login == '' && password == '') {
            return;
        }

        axios.post('http://213.230.91.55:9000/auth/login', {
            'username': login,
            password
        }).then((response) => {
            let token = response.data.data.token
            localStorage.setItem('token', token);
            if( token ) {
                navigate("/add_blog_cases")
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <div class="background-modal p-8 rounded-[41px] shadow-lg w-[650px] h-[481px]">
                <h2 class="text-white text-center text-4xl mb-6">Вход</h2>
                <div>
                    <div class="mb-4 mt-[80px]">
                        <label class="block text-white mb-2" for="username">Логин</label>
                        <input onChange={handleChangeLogin} class="w-full p-4 button-modal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" type="text" id="username" name="username" />
                    </div>
                    <div class="mb-6">
                        <label class="block text-white mb-2" for="password">Пароль</label>
                        <input onChange={handleChangePassword} class="w-full p-4 button-modal rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300" type="password" id="password" name="password" />
                    </div>
                    <div class="flex justify-center w-full">
                        <button onClick={getToAuth} class="w-[367px] bg-white text-button-color p-4 rounded-[41px] hover:text-gray-500 text-[20px]">Войти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;