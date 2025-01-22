import React, { useState } from "react";
import './sliderstyles.css'
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';


function SliderMain(){
    return (
        <>
        <div className="silder-main-container">
            <div className="moving-text-container">
                <div className="moving-text moving-right">Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop Mediv's shop</div>
                <div className="moving-text moving-left">Чай | Напитки | Кондитерские изделия | Торты | Печенья | Пончики | Еда | Сладости</div>
            </div>
            </div>
        </>
    )
}

export default SliderMain;