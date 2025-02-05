import React, { createContext, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useState } from "react";
import getCookie from "./getCookie";
import MainMenu from "./main-menu";


export const StateOfCart = () => {
    if (document.cookie !== ''){
        return true;
    }
    else {
        return false;
    }
}
function Signmenu({updateStateOfCart}){
    const [nickname, setNickname] = useState('Войти/Рег.');
    const [state, setState] = useState(0)
    const [profileLink, setLink] = useState('#')
    const [status1, setStatus] = useState(0)
    const [swap,setSwap] = useState(0)
    
    const swapClick = () =>{
        if (nickname == 'Войти/Рег.'){
            setSwap(!swap)
        }
    }
    const click = () =>{
        if (nickname == 'Войти/Рег.'){
            setState(!state)
            if (swap == 1){
                setSwap(!swap)
            }
        }
    }
    useEffect(() => {
        provekraId();
    },[])
    async function getNewPerson(event){
        event.preventDefault()

        const formData = new FormData(event.target); 
        const regLogin = formData.get('reglogin'); 
        const regPassword = formData.get('regpass'); 
        const regEmail = formData.get('regemail');
        const regaddress = formData.get('regaddress')

        const registrationInfo ={
            login: regLogin,
            password: regPassword,
            email: regEmail,
            address: regaddress,
        }
        fetch('/api/User/RegisterUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(registrationInfo)
        })
        window.location.reload();
    }
    async function provekraId(){
        if (document.cookie !== ''){
            await fetch(`/api/User/GetById/${getCookie('key')}`, {
                method: 'GET'
            }).then((resp) => resp.json())
            .then((data1) => {
                setNickname(data1.login)
                setLink('/Profile')
                updateStateOfCart();
            })
        }
    }
    async function logInPerson(event) {
        event.preventDefault()
        
        const formData1 = new FormData(event.target);
        const logInlogin = formData1.get('logIn');
        const loginpass = formData1.get('passWord');
        const loginInfo = {
            login: logInlogin,
            password: loginpass
        }
        const res = await fetch(`/api/User/Login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(loginInfo)
            
        })
        if (res.status === 400 || res.status === 404){
            setStatus('Не удалось войти')
        }
        else{
            const data = await res.json()
            if (res.status === 200){
                setState(0)
                document.cookie = 'key=' + data.id;
                setStatus('Вход успешен!')
                provekraId()
                StateOfCart()
            }
        }
    }
    
    return(
        <>
        <button onClick={click} className={`other-space ${state ? 'space-exist' : 'space-not-exist'}`}></button>
        <div className={
            `status-login ${status1 === 'Вход успешен!' ? 'status-login-open' : ''} ${status1 === 'Не удалось войти' ? 'status-login-uncorrect' : ''}`
        }>{status1}</div>
        
            <div className="sign-in">
                <div onClick={click}><a href={profileLink}>{nickname}</a></div>
            </div>
            <div className="positionoflogin">
            <div className={`registr-menu ${state ? 'rg-menu-open' : 'rg-menu-close'}`}>
                <div>Добро пожаловать!</div>
                    <form onSubmit={logInPerson} id="login-box" className="submit-container">
                        <input type="text" name="logIn" id="login" placeholder="Логин" className="rg-login" required></input>
                        <input type='password' name="passWord" id="password" placeholder="Пароль" className="rg-password" required></input>
                        <button className="rg-button-submit" type="submit">Войти</button>
                    </form>
                <button onClick={swapClick} className="rg-button">Регистрация</button>
                <div className={`registration-menu ${swap ? 'registration-menu-open' : 'registration-menu-close'}`}>
                    <form onSubmit={getNewPerson} id="registration" className="submit-container-reg">
                        Регистрация
                        <input className="input-reg-element" type="text" name="reglogin" placeholder="Введите логин" required/>
                        <input className="input-reg-element" type="password" name="regpass" placeholder="Введите пароль" required/>
                        <input className="input-reg-element" type="email" name="regemail" placeholder="Укаже эл.почту" required></input>
                        <input className="input-reg-element" type="text" name="regaddress" placeholder="Укажите адрес"></input>
                        <button className="button-reg-element" type="submit">Зарегестрироваться</button>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}

export default Signmenu;
