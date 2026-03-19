import axios from 'axios'
const BASE_URL = 'http://localhost:6969'
export const getProducts = async (category: string, subCategory: string) => {
    const res = await axios.get(`${BASE_URL}/api/v1/products/products?category=${category}&subCategory=${subCategory}`)
    return res.data
}
