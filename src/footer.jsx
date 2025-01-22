import react from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AboutUs from "./pages/aboutus";

function Footer1(){
    return(
    <footer className="footer-bg">
    <footer className="footer-main">
        <div className="title-footer first">
            <div className="mega-mart">
            Mediv's shop
            </div>
            <section className="footer-first-column">
                <div className="contact-us">Свяжитесь с нами!</div>
                <div className="whats-app">
                    <div>   
                        Whats App    
                    </div>
                <div>+7 980-750-70-11</div>
                </div>
                <div className="call-us">
                    <div >Позвонить по номеру</div>
                    <div>+7 980-750-70-11</div>
                </div>
            </section>
        </div>
        <div className="title-footer second">
            <section className="footer-second-column">
                <div className="MostPop" >Популярные категории</div>
                <br />
                <ul>
                    <li className="footer-ul">Staples</li>
                    <li className="footer-ul">Beverages</li>
                    <li className="footer-ul">Personal Care</li>
                </ul>
            </section>
        </div>
        <div className="title-footer third">
            <section className="footer-third-column">
                <div className="Customer">Информация</div>
                <br></br>
                <ul>
                    <li className="footer-ul"><a className="giper-color" href="/AboutUs">Про нас</a></li>
                    <li className="footer-ul">Terms & Conditions</li>
                    <li className="footer-ul">FAQ</li>
                </ul>
            </section>
        </div>
    </footer>
        <div className="copyright-box">
            <article className="footer-copyright"> &copy; 2022 All rights reserved. Reliance Retail Ltd.</article>
        </div>
    </footer>   

    )
}

export default Footer1;