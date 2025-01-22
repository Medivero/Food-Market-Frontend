import react from "react";

function Header1(){
    return (
        <>
            <header className="header-info">
          <label className="header-position">
            <article className="header-text">
              Добро пожаловать на Mediv's shop
            </article>
            <article className="header-text">
              <a href="#" className="dt">Доставка 24/7</a>
              <> | </> 
              <a href="#" className="tyo"> Отследить ваш заказ </a>
              <> | </>
              <a href="#" className="ao"> Все заказы</a>
            </article>
          </label>
        </header>
        
        </>
    )
}




export default Header1;