import React, { useEffect, useState } from "react";
import Filter from "./filter-menu";
import Signmenu from "./signmenu";
import Header1 from "./header";
import getCookie from "./getCookie";
import ProverkaIdCookie from "./utilits/proverkaIDcookie";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Name } from "ajv";
import { StateOfCart } from "./signmenu";


function MainMenu(){
  const [linkToCart, SetLinkToCart] = useState('');
  const [linkToProduct, setLinkToProduct] = useState('#');
  const [products,setProducts] = useState([])
  const [search,setSearch] = useState(0);
  const [cartText, setCartText] = useState('Корзина');
  const [cartLength, setCartLength] = useState('')
  const CheckId = () => {
    if (StateOfCart() == false){
      SetLinkToCart('#')
      setCartText('Нужно войти!')
    }
    else if (StateOfCart() == true){
      setCartText('Корзина')
      SetLinkToCart('/Cart')
    }
  }
  function dotsClick(){
    setSearch(0)
  }
  
  function getCart(){
      fetch(`/api/User/GetUserCart/${getCookie('key')}`,{
        method: 'GET'
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.length == 0 ){
            setCartLength('')
          }
          else{
            setCartLength(data.length);
          }
        })
  }
  getCart();
  async function Poisk(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const poiskUnit = formData.get('poisk-input')
    console.log(poiskUnit)
    if (poiskUnit.length === 0){
      setProducts([
        {
          name: 'Ничего нет!'
        }
      ])
    }
    else{
    try{
    const res = await fetch(`http://194.58.34.224:14342/api/Product/SearchbyKeyword/${poiskUnit}`, {
        method: 'GET'
      })
      console.log(poiskUnit)
      const data = await res.json()
      if (data.length == 0){
        setProducts([
          {
            name: 'Ничего нет!'
          }
        ])
        setLinkToProduct('#')
      }
      else{
        setProducts(data)
        setLinkToProduct(1)
      }
      setSearch(1)
    } catch (error){
      setProducts([
        {
          name: 'Произошла ошибка'
        }
      ])
      setLinkToProduct('#')
    }
  }
    }
    return (
        <>
        <div className="position-menu">
        <Header1/>
          <nav>
            <ul className="main-menu">
              <li>
                <a className="title-menu" href="/"><div>
                  <span className="span-title-element">M</span>
                  <span className="span-title-element">e</span>
                  <span className="span-title-element">d</span>
                  <span className="span-title-element">i</span>
                  <span className="span-title-element">v</span>
                  <span className="span-title-element">'</span>
                  <span className="span-title-element">s</span>
                  <span className="span-title-element"> </span>
                  <span className="span-title-element">S</span>
                  <span className="span-title-element">h</span>
                  <span className="span-title-element">o</span>
                  <span className="span-title-element">p</span>
                  </div></a>
              </li>
              <li>
                <div className="search-info">
                  <form onSubmit={Poisk} id="poisk" className="search-info-input">
                    <button type="submit" className="find"></button>
                    <input type="text" name="poisk-input" placeholder="Поиск..." className="search-info-input"></input>
                  </form>
                  <div onClick={dotsClick} className="dots"></div>
                </div>
                  <div className={`box-search-result ${search ? 'box-result-open' : 'box-result-close'}`}>
                    {products.map((item) => (
                      <a href={linkToProduct !== '#' ? `/product/${item.id}` : '#'}>
                        <div className="text-result-search">{item.name}</div>
                      </a>
                    ))}
                  </div>
              </li>
              <li className="sign-cart">
                <Signmenu updateStateOfCart={CheckId}/>
                <div className="cart">
                <span className={cartLength == '' ? 'nothing' : 'cartLength'}>{cartLength}</span>
                  <a onClick={CheckId} href={linkToCart}>{cartText}</a>
                </div>
              </li>
            </ul>
          </nav>
          <Filter/>
      </div>
      <div className="empty-box">
      </div>
        </>
    )
}
export const StateOfC = () => {
  return MainMenu()
}
export default MainMenu;