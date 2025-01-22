import React, { useEffect } from "react";
import { useState } from "react";
import MainMenu from "../main-menu";
import Footer1 from "../footer";
import './category.css';
import PreLoader from "../preloader";
import { useParams } from "react-router-dom";
import HoverCart from "../cartonHover";
function CategoryPage(){
    const [products,setProducts] = useState([])
    const [loaded, setLoaded] = useState(0)
    const {id} = useParams();
    const getCategory = async() => {
        if (id === 'allproducts'){
            const res = await fetch('/api/Product/Index', {
                method: 'GET'
            })
            const data = await res.json();
            setProducts(data)
            setLoaded(1)
        }
        else if (id){
            try{
                const res = await fetch('/api/ProductPagination/GetPersonalSequenceCategoryToken', {
                    method: 'GET',
                    headers: {
                      'Accept': 'text/plain'
                    }
                })
                const token = await res.text()
                const response = await fetch(`/api/ProductPagination/GetPageByCategory?count=6&categoryId=${id}`, {
                    method: 'GET',
                    headers: {
                        'x-pagination-token' : `${token}`
                    }
                })
                const data = await response.json();
                setProducts(data)
                setLoaded(1)
            } catch (error){
                console.log(error)
            }
        }
    }
    function proverkaImeni(name){
        if (name.length > 15){
            return name.slice(0,16)+'.'
        }
        else{
            return name
        }
    }
    useEffect(() => {
        getCategory()
    },[])
    function filterToLower() {
        const newProducts = [...products].sort((a,b) => a.price -b.price);
        setProducts(newProducts)
        
    }
    function filterToHigher(){
        const newProducts = [...products].sort((a,b) => b.price-a.price);
        setProducts(newProducts)
    }
    function filterToAB(){
        const newProducts = [...products].sort((a,b) => a.rating-b.rating);
        setProducts(newProducts);
    }
    function filterToBA(){
        const newProducts = [...products].sort((a,b) => b.rating-a.rating);
        setProducts(newProducts);
    }
    return (
        <>
        <PreLoader Loaded1 ={loaded}></PreLoader>
        <MainMenu></MainMenu>
        <main className="main-category">
            <nav className="filter-category-container">
                <ul className="filter-category-box">
                    <li>
                        <button onClick={filterToLower} className="buttons-to-change-filter-category">По убыванию цены</button>
                    </li>
                    <li>
                        <button onClick={filterToHigher} className="buttons-to-change-filter-category">По возрастанию цены</button>
                    </li>
                    <li>
                        <button onClick={filterToBA} className="buttons-to-change-filter-category">По рейтингу(лучшее)</button>
                    </li>
                    <li>
                        <button onClick={filterToAB} className="buttons-to-change-filter-category">По рейтингу(худшее)</button>
                    </li>
                </ul>
            </nav>
            <ul className="category-container">
                {products.map((item) => (
                    <div key={item.id} className="product-wrapper">
                        <a href={`/product/${item.id}`}>
                        <container className="HoverCartDisplay">
                            <HoverCart productId = {item.id}></HoverCart>
                        </container>
                        <li className="category-element-product">
                            <img src={item.image} className="image-category">
                            </img>
                            <div className="text-container-categoryPage">
                                <div>{proverkaImeni(item.name)}</div>
                                <div className="price-box-categoryPage">{item.price+ '₽'}</div>
                            </div>
                        </li>
                        </a>
                    </div>
                ))}
                
            </ul>
        </main>
        <Footer1></Footer1>
        </>
    )
}

export default CategoryPage;