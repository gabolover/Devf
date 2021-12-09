
import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { ListContext, ProductsContext, UrlContext } from "./Context";
import { useEffect } from 'react';


export default function Header(props) {
    const { setListC } = useContext(ListContext)
    const { ProductList } = useContext(ProductsContext)
    const [link, setLink] = useState("")
    const { url, setUrl } = useContext(UrlContext)




    useEffect(() => {
        document.getElementById("input")
            .addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.key === 'Enter') {
                    document.getElementById("search").click();
                }
            });
        setUrl(url)


    }, [url])

    const search = () => {

        let name = document.getElementById("input").value;
        let u = `/resultados/${name}`
        let list = []
        ProductList.forEach(product => {
            if (product.product_name.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1) list.push(product)


        })
        setListC([...list])
        setLink(name)
        setUrl(u)



    }

    const home = () => {
        setListC(ProductList)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link onClick={home} className="navbar-brand" to="/">Ecomerce</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">

                                <Link onClick={home} className="nav-link active" to="/">HOME</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="$">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="$">Sign</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <input id="input" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button id="search" onClick={search} className="btn btn-outline-success" >Search</button>
                            <Link to={url}>hola</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}
