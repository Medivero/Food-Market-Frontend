import React, { useEffect, useState } from "react";
import './productpagestyle.css'

import Footer1 from "../footer";
import MainMenu from "../main-menu";
import { useParams } from "react-router-dom";
import PreLoader from "../preloader";
import getCookie from "../getCookie";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";


function ProductPage(){
  const {id} = useParams();
  const [stars, setStars] = useState(0)
  const [name1,setName] = useState(0)
  const [image1,setImage] = useState(0)
  const [desc1,setDesc] = useState(0)
  const [price1,setPrice] = useState(0)
  const [loading, setLoading] = useState(0)
  const [amount, setAmount] = useState(0)
  const [reviews,setRewies] = useState([])
  const [amountProduct, setAmountProduct] = useState('')
  const changeAmount = async () => {
    try{
      const res = await fetch(`/api/User/GetUserCart/${getCookie('key')}`, {
        method: 'GET'
      })
      const data = await res.json()
      const product = data.find((item) => item.productId == id);
      if(product){
        setAmountProduct('|' + product.amount + 'шт. в корзине')
      }
    } catch{
      console.log('Ошибка')
    }
  }
  const getReviews = async () => {
    try{
      const res = await fetch(`/api/Review/GetProductReviews/${id}`, {
        method: 'GET'
      })
        const data = await res.json()
        data.reverse();
        setRewies(data)
        console.log(data)
    } catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetch(`/api/Product/GetById/${id}`, {
      method: "GET"
    })
    .then((res) => res.json())
    .then((data) =>{
      setName(data.name)
      setDesc(data.description)
      setImage(data.image)
      setPrice(data.price)
      if (data.rating === 'none' || data.rating === 0 || data.rating < 0){
        setStars(<span>Пока нет оценки товара</span>)
      }
      else{
        if (data.rating > 5){
          data.rating = 5
        }
        setStars(Array.from({length: data.rating}, (_, i) => (
          <span className="star">&#9733;</span>
        ))
      )
      getReviews()
      setLoading(1);
    }
  }).then(
    changeAmount(),
  )
    
  },[])
  const ButtonDeleteProductFromCart = async () => {
    const res = await fetch(`/api/User/GetUserCart/${getCookie('key')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    const product = data.find((item) => item.productId == id)
    try {
      await fetch(`/api/ShoppingCart/DeleteById/${product.elementId}`,{
        method: 'DELETE'
      })
      setAmountProduct('');
    } catch (error) {
      console.log(error)
    }
  }
  const ButtonAddCart = async () =>{
    try{
       await fetch('/api/ShoppingCart/AddElement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify({
          userId: getCookie('key'),
          productId: id,
          amount: 1
        })
      })
      setAmount(1)
      changeAmount()
    } catch{
      console.log('Ошибка!')
    }
  }
  const ButtonDecrementAmount = async () =>{
    try {
      const res = await fetch(`/api/User/GetUserCart/${getCookie('key')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      const product = data.find((item) => item.productId == id)
      if (product){
        const idWhatIneed = product.elementId
        if (product.amount < 0 || product.amount === 0){
          setAmountProduct(0)
        }
        else{
          if (product.amount === 1){
            try {
              await fetch(`/api/ShoppingCart/DeleteById/${product.elementId}`, {
                method: 'DELETE'
              })
              changeAmount()
              setAmountProduct('')
            } catch (error) {
              console.log(error)
            }
          }
          else {
            try{
              const needAmount = product.amount-1;
              await fetch('/api/ShoppingCart/UpdateAmount',{
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  elementId: idWhatIneed,
                  amount: needAmount
                })
              }
            )
            changeAmount()
          } catch (error) {
            console.log(error)
          }
        }
        }
    } 
  } catch (error) {
    console.log(error)
  }
}
const PostReview = async (event) => {
  event.preventDefault()
  const formData = new FormData(event.target);
  const reviewMark = formData.get('ReviewMark');
  const reviewtext = formData.get('Review');
  try{
    await fetch('/api/Review/PublishReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: getCookie('key'),
        productId: id,
        setRating: reviewMark,
        reviewContent: reviewtext
      })
    })
    getReviews()
  } catch (error){
    console.log(error)
  }
}
function UserNameReview(name){
  const tempedName = [...name];
  let newName = [];
  for (let i = 0; i < tempedName.length; i++){
    if (tempedName[i] === '@'){
      return newName
    }
    newName.push(tempedName[i])
  }
  return newName
}
  const buttonUpdateAmount = async () => {
    try {
      const res = await fetch(`/api/User/GetUserCart/${getCookie('key')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      const product = data.find((item) => item.productId == id)
      if (product){
        const idWhatIneed = product.elementId
        const needAmount = product.amount+1
        try {
          await fetch('/api/ShoppingCart/UpdateAmount', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              elementId: idWhatIneed,
              amount: needAmount
            })
          })
            changeAmount()
        } catch (error){
          console.log(error)
        }
      }
    } catch{
      console.log(error)
    }
  }
    return (
    <>
    {!loading ? <PreLoader Loaded1={0}/> : <PreLoader Loaded1 ={1}/>}
        <MainMenu></MainMenu>
      <main className="background-product-main">
        <div className="product-box">
          <div className="correct-title-image">
            <img src={image1} alt="Image wasn't found" className="product-image"/>
            <div>
              <div className="product-title">{name1}</div>
            <article className="description-product">
              {desc1}
            </article>
            </div>
          </div>
          <div>
            <article className="rating-box">Рейтинг: {stars}</article>
          </div>
          <div className="buttons-box-productpage">
            <button onClick={amountProduct !== '' ? buttonUpdateAmount : ButtonAddCart} className="button-add-cart">{price1}₽ {amountProduct}</button>
            <button onClick={ButtonDecrementAmount} className={`button-decrement ${amountProduct !== '' ? 'open-button-decrement' : 'nothing'}`}>-1</button>
            <button onClick={ButtonDeleteProductFromCart} className={`button-decrement delete-product-from-cart ${amountProduct !== '' ? 'open-button-decrement' : 'nothing'}`}>Убрать</button>
          </div>
          <div>
            <h1>Отзывы</h1>
            <div className="input-container-for-mark">
              Оставить отзыв
              <form onSubmit={PostReview} className="form-mark-box">
                <div className="box-inputs-review">
                  <input type="text" name="Review" className="input-for-PostReview" required placeholder="Отзыв" />
                  <input type="number" name="ReviewMark" className="input-for-PostReview" required placeholder="Выставите оценку"></input>
                </div>
                <button className="submit-Review" type="submit">Отправить</button>
              </form>
            </div>
            {reviews.map((review) => (
              <div className="mark-product-page-container">
                <div className="name-and-avatar-box-mark">
                  <img className="username-avatar-mark" src={require('../assets/usernameAvatar.jpg')} alt="chelik"></img>
                  <div className="username-mark">{UserNameReview(review.userEmail)}</div>
                </div>
                <div className="mark-and-description-box">
                  <div className="description-box">
                    Отзыв:
                    <br></br>
                    {review.reviewContent}
                  </div>
                  <div>
                    <div className="marks-by-user">{review.setRating}</div>
                  </div>
                <div className="createdAt-review">{review.createdAt.split('T')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer1/>
    </>
    )
}


export default ProductPage;