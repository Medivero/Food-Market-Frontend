import react from "react";
import video1 from './assets/video1.mp4'
import video2 from './assets/video2.mp4'
import video3 from './assets/video3.mp4'
import './thirdlist.css'
import AOS from "aos";
import "aos/dist/aos.css";

function WidgetList3(){
  AOS.init();
    return(
        <div className="product-list-main-3" data-aos = "fade-right" >
            <label className="text-before-plist-3">
              <div>
                Работа профессионалов
              </div>
              <div><a href="#">Посмотреть все &#128073;</a></div>
            </label>
            <ul className="product-list-container-3">
              <li className="product-list-element-3">
              <video className="video-third-list" autoPlay muted loop>
                 <source src={video1} type="video/mp4" />
                   Ваш браузер не поддерживает видео.
                   </video>
              </li>
              <li className="product-list-element-3">
              <video className="video-third-list" autoPlay muted loop>
                 <source src={video2} type="video/mp4" />
                   Ваш браузер не поддерживает видео.
                   </video>
              </li>
              <li className="product-list-element-3">
              <video className="video-third-list" autoPlay muted loop>
                 <source src={video3} type="video/mp4" />
                   Ваш браузер не поддерживает видео.
                   </video>
              </li>
            </ul>
          </div>
    )
}

export default WidgetList3;