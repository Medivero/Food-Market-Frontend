import React, { useState } from "react";
import Header1 from "../header";

function AboutUs(){
    const [state, setState] = useState(0)
    setTimeout(() => {
        setState(1)
    },1500)
    return(
        <>
        <div className="about-us-bg">
            <header>
                <div className="title-about-us">
                    Добро пожаловать на страницу о нас
                </div>
                <a className="position-back-to-main" href="/">
                    <div className={state ? 'back-to-main-page-color-bg' : 'opacity-back-to-main'}>
                        Вернуться на главную страницу
                    </div>
                </a>
            </header>
            <main>

            </main>
        </div>
        </>
    )
}
export default AboutUs;