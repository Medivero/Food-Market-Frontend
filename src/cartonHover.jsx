import react, { use, useEffect, useState } from "react";
import './cartonHover.css'


function HoverCart(idProduct){
    const [stars, setStars] = useState(0)
    const [productInfo, setProductInfo] = useState([]);
    useEffect(() => {
        try {
            fetch(`/api/Product/GetById/${idProduct.productId}`, {
                method: 'GET'
            })
            .then((res) => res.json())
            .then((data) => {
                setProductInfo(data)
                if (data.rating === 'none' || data.rating === 0 || data.rating < 0){
                    setStars(<span>Пока нет оценки товара</span>)
                  }
                  else{
                    if (data.rating > 5){
                      data.rating = 5
                    }
                    setStars(Array.from({length: data.rating}, (_, i) => (
                      <span className="stars-for-Hover">&#9733;</span>
                    ))
                  )}
            })
        } catch (error){
            console.log(error)
        }
    },[])
    return(
        <>
        <div className="hoverCart-container">
            <img className="imageforHoverCart" src={productInfo.image} alt={productInfo.name} />
            <span className="HoverCartBorder">{productInfo.name}</span>
            <article className="HoverCartBorder">{productInfo.description}</article>
            <span className="HoverCartBorder HoverCartPrice">{productInfo.price}₽</span>
            <span >{stars}</span>
        </div>
        </>
    )
}

export default HoverCart;