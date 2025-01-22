import react from "react";
import { useState } from "react";

function Filter( ){
    const [state, setState] = useState(false);
    const click = () =>{
      setState(!state)
    }
    return(
        <nav className="fixed-filter">
            <ul className="filter-menu">
              <a href="/category/1" className="filter-element">
               <li>Печеньки</li>
              </a>
              <a href="/category/2" className="filter-element">
               <li>Пончики</li>
              </a>
              <a href="/category/3" className="filter-element">
              <li>Торты </li>
              </a>
              <a className="filter-element" href="/category/4">
              <li>Напитки </li>
              </a>
              <a className="filter-element" href="/category/5">
                <li>Чай</li>
              </a>
              <a className="filter-element" href="/category/allproducts">
              <li>Все продукты</li>
              </a>
            </ul>
          </nav>
    )
}
export default Filter;