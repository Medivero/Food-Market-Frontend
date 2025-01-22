import react, { useEffect } from "react";
import { use } from "react";
import { useState } from "react";
import './list-styles.css'
function WidgetList1(){
  const [products, setProducts] = useState([]); 

  function fetchProducts() {
    try {
      fetch('/api/ProductPagination/GetPersonalSequenceToken', {
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
      })
      .then((res) => res.text())
      .then((token) => {
        fetch("/api/ProductPagination/GetPage?count=6", {
          method: 'GET',
          headers: {
            'x-pagination-token' : `${token}`
          }
        }).then((resp) => resp.json())
        .then((data)=> {
          setProducts(data); 
        })
      })
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

    return(
        <div className="product-list-main">
            <label className="text-before-plist">
            <div>Вкуснейшие <b className="smartphones">Печеньки</b></div>
            <div><a href="#">Посмотреть все &#128073;</a></div>
            </label>
            <ul className="product-list-container">
        {products.map((product) => (
            <a href={`/Product/${product.id}`}>
          <li key={product.id} className="product-list-element">
              <div className="product-top-element">
                <span className="price-number-for-list">{product.price}р.</span>
                <img
                  className="correct-scale-image"
                  src={product.image}
                  alt={product.name}
                ></img>
              <div className="product-bottom-element">
                <p>{product.name} </p>
              </div>
              </div>
          </li>
            </a>
        ))}
      </ul>
          </div>
    )
}

export default WidgetList1;