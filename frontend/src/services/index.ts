const BASE_URL = 'http://localhost:4000'
export const getProducts = async () => {
    const res = await fetch(`${BASE_URL}/products/hamdy`)
    const data = await res.json()
    return data
}
