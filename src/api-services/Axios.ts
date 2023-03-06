import axios from "axios";


interface CreateJobInterface {
    Product_Code: number,
    Product_title: string,
    Description: string,
    Price: number,
    Quantity: number,

}
export class JobsService {



    public static ProductList() {
        return axios.get(import.meta.env.VITE_URL)
    }

    public static ProductCreate(payload: CreateJobInterface) {
        return axios.post(import.meta.env.VITE_URL, payload)
    }

}