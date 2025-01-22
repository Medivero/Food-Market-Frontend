import React, { useEffect, useState } from "react";
import Footer1 from "../footer";
import './cartpagestyles.css'
import MainMenu from "../main-menu";
import PreLoader from "../preloader";
import getCookie from "../getCookie";

function CartPage(){
  const [price1, setPrice] = useState(0);
  const [state, setState] = useState(0)
  const [address, setAddress] = useState('none')
  const handleclick = () => {
    setState(!state)
  }
  const [cart, setCart] = useState([])
  function getCartUser() {
    try{
      fetch(`http://194.58.34.224:14342/api/User/GetUserCart/${getCookie('key')}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then ((res) => res.json())
      .then((data) => {
        setCart(data)
        console.log(data)
        let timedPrice = 0;
        data.forEach((item) => {
          timedPrice = timedPrice + item.unitPrice*item.amount
          setPrice(timedPrice)
        })
      })
      .then(
        setTimeout(() => {
          setLoading(1)
        }, 200)
      )
    } catch(error){
      console.log(error);
      return(error)
    }
  }
  function deleteCart(idProduct) {
    fetch(`http://194.58.34.224:14342/api/ShoppingCart/DeleteById/${idProduct}`,{
      method: 'DELETE'
    }).then(() => {
        getCartUser()
        window.location.reload();
    })
  }
  const defaultValue = []
  const [category, setCategory] = useState(defaultValue)
  const [Loading, setLoading] = useState(0)
  const getApiDataUser = async () => {
    const res = await fetch(`/api/User/GetById/${getCookie('key')}`)
    const data = await res.json()
    setAddress(data.address)
  }
  const DecrementAmountButton = async (idProduct,productAmount) => {
    await fetch('/api/ShoppingCart/UpdateAmount', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        elementId: idProduct,
        amount: productAmount-1
      })
    })
    getCartUser()
  }
  const IncrementAmountButton = async (idProduct,productAmount) => {
    await fetch('/api/ShoppingCart/UpdateAmount', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        elementId: idProduct,
        amount: productAmount+1
      })
    })
    getCartUser()
  }
  useEffect(()=>{
    getApiDataUser()
    getCartUser();
  }, [])
    return(
        <>
        {!Loading ? <PreLoader Loaded1 = {0}></PreLoader> : <PreLoader Loaded1 = {1}/>}
        <MainMenu/>
      <main className="main-cart-bg">
        <div className={`oplata-menu ${state ? 'oplata-menu-open' : 'oplata-menu-close'}`}>
          <form action="">
            <legend className="address-box">
              Адрес:
              <input className="address-box" type="text" defaultValue={address}/>
              Нажмите чтобы изменить
            </legend>
          </form>
          <div>
            Сумма: {price1}
          </div>
          <div>Способ оплаты: </div>
          <button>Оплатить</button>
        </div>
        <div className="cart-text-cart">Корзина</div>
        <div className="cart-box-container">
            <section className="cart-box-cart">
                <div>
                    { cart.map((item) => (
                    <div key={item.id} className="product-box-from-cart">
                      <a href={`Product/${item.productId}`}> 
                        <img src={item.image} className="image-cart-product"></img>
                      </a>
                      <div>{item.name}</div>
                      <div className="buttons-and-amount-box">
                        <div>{item.amount} шт.</div>
                        <button className="change-amount-cart-button plus-amount" onClick={() => IncrementAmountButton(item.elementId,item.amount)}>+</button>
                        <button className="change-amount-cart-button minus-amount" onClick={() => DecrementAmountButton(item.elementId,item.amount)}>-</button>
                      </div>
                      <div className="price-box-product-box">
                        <div>Цена за все: {item.unitPrice*item.amount}₽</div>
                        <div>Цена за штуку: {item.unitPrice}₽</div>
                      </div>
                      <div className="id-product-cart">Id товара: {item.productId}</div>
                      <button onClick={() => deleteCart(item.elementId)} className="cart-item-delete">Убрать</button>
                    </div>
                  ))}
                </div>
                <div>
                  {category.email}
                </div>
            </section>
            <div className="cart-payment-box">
              <div className="oplata-title">
                Корзина
              </div>
              <div>
                <div className="price-list">
                {cart.map((item) => (
                  <div>{item.name}: <br></br>{item.unitPrice}₽ х {item.amount}шт. = {item.amount*item.unitPrice}₽</div>
                ))}
                </div>
              </div>
              <div className="button-oplata-box">
                Общая сумма: {price1}₽
                <button onClick={handleclick} className="button-oplata">
                  Перейти к оплате
                </button>
              </div>
            </div>
        </div>
      </main>
      <Footer1/>
        </>
    )


}

export default CartPage;