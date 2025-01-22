import react, { useEffect, useState } from "react";


function WidgetList2(){
  const [products,setProducts] = useState([]);
  function getSecondList(){
    fetch('/api/ProductPagination/GetPersonalSequenceCategoryToken', {
      method: 'GET',
      headers: {
        'Accept': 'text/plain'
      }
    })
    .then((res) => res.text())
    .then((token) => {
      fetch('/api/ProductPagination/GetPageByCategory?count=7&categoryId=2', {
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
    getSecondList();
  }, [])
    return(
        <div className="product-list-main-2">
            <label className="text-before-plist-2">
              <div>
                Выбери свой <b className="smartphones">Любимый напиток</b>
              </div>
              <div><a href="#">Посмотреть все &#128073;</a></div>
            </label>
            <ul className="product-list-container-2">
              {products.map((item) => (
                <a href={`/Product/${item.id}`}>
                  <li key={item.id} className="product-list-element-2">
                  <img
                  className="correct-scale-image-second-list"
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

export default WidgetList2;