import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import { ToastContext } from '../context/Toast.context'
import { useHttp } from '../hooks/http.hook'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'


const LoginModal = () => {
    const auth = useContext(AuthContext)
    const {loading, error, clearError, request} = useHttp()
    const [modalStatus, setModalStatus] = useState("login")
    const {setToast} = useContext(ToastContext)

    if(error) {
        setToast({id: Date.now(), message: error, type: 'error'})
        clearError()
    }

    const registerHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const email = document.getElementById('auth-email') as HTMLInputElement
        const password = document.getElementById('auth-password') as HTMLInputElement
        const name = document.getElementById('auth-name') as HTMLInputElement
        const phone = document.getElementById('auth-phone') as HTMLInputElement

        const form = {
            email: email.value,
            password: password.value,
            name: name.value,
            phone: phone.value
        }

        try {
            await request('/api/auth/register', 'POST', {...form})
            .then((() => setToast({id: Date.now(), message: 'Регистрация прошла успешно!', type: 'success'})))
            
        } catch (e) {}
    }

    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const email = document.getElementById('auth-email') as HTMLInputElement
        const password = document.getElementById('auth-password') as HTMLInputElement

        const form = {
            email: email.value,
            password: password.value,
        }

        try {
            await request('/api/auth/login', 'POST', {...form})
            .then(response => {
                setToast({id: Date.now(), message: response.message, type: 'success'})
                auth.login(response.token, response.userId)
            })
        } catch (error) {}
    }

    return (
        <>
        <div className='modal-login__radio-nav'>
            <input className='midal-login__radio' type="radio" id='login' name='loginModal' defaultChecked></input>
            <label htmlFor="login" onClick={() => setModalStatus("login")}>Войти</label>
    
            <input className='midal-login__radio' type="radio" id='registr' name='loginModal'></input>
            <label htmlFor="registr" onClick={() => setModalStatus("register")}>Регистрация</label>
        </div>
        {(modalStatus === "login")
            ?
            <LoginForm></LoginForm>
            :
            <RegisterForm></RegisterForm>
        }
        </>
    )
}

export default LoginModal
