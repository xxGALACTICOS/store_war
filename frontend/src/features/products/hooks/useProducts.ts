import { getProducts } from "@/services";
import { useEffect, useState } from "react";

export const useProducts = <T>(category: string, subCategory: string) => {
    const [products, setProducts] = useState<T[]>([]);
    useEffect(() => {
        getProducts(category, subCategory).then((data) => setProducts(data))
    }, [category, subCategory])
    return products
}