import axios from 'axios'
const BASE_URL = 'http://localhost:6969'
export const getProducts = async () => {
    const res = await axios.get(`${BASE_URL}/api/v1/products`)
    return res.data
}
