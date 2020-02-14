import { axiosInstance } from '@/main';

export default class ApiProduct {
    static searchProducts = (params: any) => {
        return axiosInstance
            .get("product/search", {
                params: params
            })
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }
    static getProducts = (skip: number, take: number) => {
        return axiosInstance
            .get("product")
            .then(response => {
                console.log(response)
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error)
                return Promise.reject(error);
            });
    }
    static getCategories = () => {
        return axiosInstance
            .get("product/category")
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    static getSingleProduct = (id: number) => {
        return axiosInstance.get(`product/${id}`)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }
}