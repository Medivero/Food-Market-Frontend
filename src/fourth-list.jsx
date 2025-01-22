import react, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function WidgetList4(){
  AOS.init();
  const [products, setProducts] = useState([])
  function getFourthList(){
    fetch('/api/ProductPagination/GetPersonalSequenceCategoryToken', {
        method: 'GET',
        headers: {
          'Accept': 'text/plain'
        }
      })
      .then((res) => res.text())
      .then((token) => {
        fetch('/api/ProductPagination/GetPageByCategory?count=5&categoryId=2', {
          method: 'GET',
          headers: {
            'x-pagination-token': `${token}`
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          setProducts(data)
        })
      })
    }
    useEffect(() => {
      getFourthList();
    }, [])
    return(
        <div className="product-list-main-4" data-aos="fade-right">
            <label className="text-before-plist-3">
              <div>
                Не желаете <b className="smartphones">Чаю?</b>
              </div>
              <div><a href="#">Посмотреть все &#128073;</a></div>
            </label>
            <ul className="product-list-container-4">
              {products.map((item) => (
                <a href={`/Product/${item.id}`}>
                  <li className="product-list-element-4">
                  <img
                  className="correct-scale-image-fourth-list"
                  src={item.image}
                  alt={item.name}
                ></img>
                  </li>
                  <article className="text-bottom-second-element">{item.name}</article>
                </a>
              ))}
            </ul>
        </div>
    )
}

export default WidgetList4;