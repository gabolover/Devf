import { createContext } from "react";


export const ListContext = createContext({
    ListC: [],
    setListC: () => { },

});

export const ProductsContext = createContext({
    ProductList: [],
    setProductList: () => { }
});


export const UrlContext = createContext({
    url: "",
    setUrl: () => { }
});



