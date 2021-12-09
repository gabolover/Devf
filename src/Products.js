import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import Header from './Header';
import { useContext } from "react";
import { ListContext, ProductsContext } from "./Context";
import { ProductsList } from './App'
export default function Products() {

    const [ProductList, setProductList] = useState([])
    const [ListC, setListC] = useState([])
    return (
        <ProductsContext.Provider value={{ ProductList, setProductList }}>
            <ListContext.Provider value={{ ListC, setListC }}>
                <div>
                    <Header />
                    <ProductDetail />
                </div>
            </ListContext.Provider>
        </ProductsContext.Provider>
    )
}

const ProductDetail = () => {
    const { setListC } = useContext(ListContext)
    const { setProductList } = useContext(ProductsContext);
    const [nombre, setNombre] = useState("")
    const [precio, setPrecio] = useState("")
    const [imagen, setImagen] = useState("")
    const [descripcion, setDescripcion] = useState("")



    let params = useParams()

    useEffect(() => {

        const axios = require('axios');
        axios(`https://ecomerce-master.herokuapp.com/api/v1/item/${params.id}`)
            .then(response => {
                let product = response.data
                let product_name = product.product_name
                let product_img = product.image
                let product_price = product.price
                let product_description = product.description
                setNombre(product_name)
                setPrecio(product_price)
                setImagen(product_img)
                setDescripcion(product_description)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps

        let list = [];

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
                (list.slice(0, 20));
                setProductList(list.slice(0, 20));
                setListC(list.slice(0, 20));

            })


    }, [])

    return (
        <div className="product_ind">
            <div className="card" >
                <p>{nombre}</p>
                <img className="images" src={imagen} alt={nombre} />
                <p>Precio: {precio}</p>
                <p>{descripcion}</p>
                <button>Comprar</button>
            </div>
        </div>



    )
}
