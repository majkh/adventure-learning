import { authentication } from '@/authentication';
import axios from 'axios'

export default class ApiProduct {
    private static get(url: string, params?: any) {
        return axios.get(url, {
            params: params,
            baseURL: 'https://awproject.azurewebsites.net/v1/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': localStorage.getItem('adal.idtoken')
            }
        })
            .then(response => { return Promise.resolve(response) })
            .catch(err => {
                console.log(err);
                // authentication.signIn(); // TODO: uncomment when authentication is open
                throw err;
            })
    }

    static searchProducts = (params: any) => {
        return ApiProduct.get("product/search", params)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }
    static getProducts = (skip: number, take: number) => {
        return ApiProduct.get("product")
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
        return ApiProduct.get("product/category")
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    static getSingleProduct = (id: number) => {
        return ApiProduct.get(`product/${id}`)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }
}