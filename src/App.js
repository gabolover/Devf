import { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import Header from './Header';
import './App.css'
import { useContext } from "react";
import { ListContext, ProductsContext, UrlContext } from "./Context";


const Product = (props) => {
  const { name, price, img, id } = props
  let url = `/product/${id}`
  return (

    <div className="card" >
      <img src={img} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Precio: {price}</p>
        <button><Link to={url}>Ver detalles</Link></button>
      </div>
    </div>


  )
}


export const ProductsList = () => {
  const { ListC, setListC } = useContext(ListContext);
  //const [ProductsList, setProductsList] = useState([])
  const { setProductList } = useContext(ProductsContext);


  useEffect(() => {

    let list = [];
    const axios = require('axios');
    axios(`https://ecomerce-master.herokuapp.com/api/v1/item`)
      .then(response => response.data.map(product => {
        let product_name = product.product_name
        let product_id = product._id
        let product_img = product.image
        let product_price = product.price
        if (!product_img) return 0
        return list.push({ product_name: product_name, product_price: product_price, product_img: product_img, product_id: product_id })
      }))
      .then(res => {
        setListC(list.slice(0, 20));
        setProductList(list.slice(0, 20))

      })
    // eslint-disable-next-line
  }, [])


  return (
    <div className="products">
      {ListC.map((product, index) =>
        <Product key={(product.product_name + index)} name={product.product_name} img={product.product_img} price={product.product_price} id={product.product_id} />
      )}
    </div>
  )
}


export default function App() {
  const [ListC, setListC] = useState([])
  const [ProductList, setProductList] = useState([])
  const [url, setUrl] = useState("")
  return (
    <ProductsContext.Provider value={{ ProductList, setProductList }}>
      <UrlContext.Provider value={{ url, setUrl }}>
        <ListContext.Provider value={{ ListC, setListC }}>
          <div className="App">
            <Header />
            <ProductsList />
          </div>
        </ListContext.Provider>
      </UrlContext.Provider>
    </ProductsContext.Provider>



  );
}


