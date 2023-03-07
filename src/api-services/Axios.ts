import axios from "axios";


interface CreateProductInterface {
    Product_Code: number,
    Product_title: string,
    Description: string,
    Price: number,
    Quantity: number,
    _id?: string

}
export class ProductService {

    public static ProductList() {
        return axios.get(`${import.meta.env.VITE_URL}/getProducts`)
    }

    public static ProductCreate(payload: CreateProductInterface) {
        return axios.post(`${import.meta.env.VITE_URL}/newProduct`, payload)
    }

    public static ProductUpdate(payload: CreateProductInterface) {
        return axios.post(`${import.meta.env.VITE_URL}/updateProduct`, payload)
    }

    public static ProductDelete(payload: { _id: string }) {
        return axios.post(`${import.meta.env.VITE_URL}/ProductDelete`, payload)
    }

}