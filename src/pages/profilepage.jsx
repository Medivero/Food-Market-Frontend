import React, { useState } from "react";
import './profilepagecss.css';
import Footer1 from "../footer";
import MainMenu from "../main-menu";
import PreLoader from "../preloader";
import getCookie from "../getCookie";

function ProfilePage(){
   const [nickname, setNickname] = useState(0)
   const [address, setAddress] = useState(0)
   const [email, setEmail] = useState(0)
   const [Loading, setLoading] = useState(0)
    const url = `/api/User/GetById/${getCookie('key')}`
    fetch(url, {
      method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => {
      setNickname(data.login)
      setAddress(data.address)
      setEmail(data.email)
      setLoading(1)
    })
    function quitProfile(){
      document.cookie = 'key' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    function changeProfileAddress(event){
      event.preventDefault()
      const formData = new FormData(event.target)
      const newAdress = formData.get('address');
      fetch('/api/User/UpdateUserInfo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getCookie('key'),
          login: nickname,
          address: newAdress,
          email: email
        })
      })
      .then(() =>{
        setAddress(newAdress)
      })
    }
    function changeProfileEmail(event){
      event.preventDefault()
      const formData = new FormData(event.target)
      const newEmail = formData.get('email');
      fetch('/api/User/UpdateUserInfo', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          userId: getCookie('key'),
          login: nickname,
          address: address,
          email: newEmail
        })
      })
      .then(() =>{
        setEmail(newEmail)
      })
    }
    return (
        <>
        {!Loading ? <PreLoader Loaded1={0}/> : <PreLoader Loaded1={1}/>}
        <MainMenu/>
        <main className="profile-main-container">
          <div className="title-profile-info">Информация о профиле</div>
            <div className="profile-container">
              <div className="profile-element">
                Имя профиля: {nickname}
              </div>
              <div className="profile-box">
                <div className="profile-element">
                  Адрес: {address}
                </div>
                <form onSubmit={changeProfileAddress} className="form-change-profile">
                   <button type="submit" className="button-change-profile">Отправить</button>
                   <input placeholder="Пишите тут..." name="address" className={`input-change-profile`} type="text"></input>
                </form>
              </div>
              <div className="profile-box">
                <div className="profile-element">
                  Email: {email}
                </div>
                <form onSubmit={changeProfileEmail} className="form-change-profile">
                   <button type="submit" className="button-change-profile">Отправить</button>
                   <input placeholder="Пишите тут..." name="email" className={`input-change-profile`} type="email"></input>
                </form>
              </div>
              <a onClick={quitProfile} href="/" className="quitprofile">Выйти из профиля</a>
            </div>
        </main>
        <Footer1/>
        </>
    )
}

export default ProfilePage;