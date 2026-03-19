import { getProducts } from "@/services";
import { useEffect, useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts().then((data) => setProducts(data))
    }, [])
    return products
}