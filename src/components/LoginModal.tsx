import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/Auth.context'
import { useHttp } from '../hooks/http.hook'
import MyButton from './UI/MyButton/MyButton'
import MyInput from './UI/MyInput/MyInput'

const LoginModal = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request} = useHttp()
    const [modalStatus, setModalStatus] = useState("login")

    if(error) {
        console.log(error)
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
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {}
    }

    const loginHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        const email = document.getElementById('auth-email') as HTMLInputElement
        const password = document.getElementById('auth-password') as HTMLInputElement
        const value = email.value as string

        const form = {
            email: email.value,
            password: password.value,
        }

        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
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
            <form className='modal-login__form'>
                <h3 className='modal-login__form-title'>Войти</h3>
                <MyInput placeholder="E-mail" type='email' name='email' id='auth-email'></MyInput>
                <MyInput placeholder="Пароль" type='password' name='password' id='auth-password'></MyInput>
                <MyButton style={{marginTop: "20px"}} onClick={loginHandler}>Войти</MyButton>
            </form>
            :
            <form className='modal-login__form'>
                <h3 className='modal-login__form-title'>Регистрация</h3>
                <MyInput placeholder="E-mail" type='email' name='email' id='auth-email'></MyInput>
                <MyInput placeholder="Пароль" type='password' name='password' id='auth-password'></MyInput>
                <MyInput placeholder="Имя" type='text' name='name' id='auth-name'></MyInput>
                <MyInput placeholder="Номер телефона" name='phone' type='tel' id='auth-phone'></MyInput>
                <MyButton style={{marginTop: "20px"}} onClick={registerHandler}>Регистрация</MyButton>
            </form>
        }
        </>
    )
}

export default LoginModal
