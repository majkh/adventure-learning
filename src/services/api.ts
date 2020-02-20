import { authentication } from '@/authentication';
import axios from 'axios'
import { Product } from '@/store/product/types';
import { ProductCategories } from '@/store/filter/types';

export default class ApiProduct {
    private static get(url: string, params?: any): Promise<any> {
        return axios.get(url, {
            params: params,
            // baseURL: 'https://awproject.azurewebsites.net/v1/',
            baseURL: 'https://azuread20200219104755.azurewebsites.net/v1/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': "Bearer " + localStorage.getItem('adal.idtoken')
            }
        })
            .then(response => { return Promise.resolve(response) })
            .catch(err => {
                console.log(err);
                // authentication.signIn(); // TODO: uncomment when authentication is open
                throw err;
            })
    }

    static searchProducts = (params: any): Promise<Array<Product>> => {
        return ApiProduct.get("product/search", params)
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }
    static getProducts = (skip: number, take: number): Promise<Array<Product>> => {
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
    static getCategories = (): Promise<Array<ProductCategories>> => {
        return ApiProduct.get("product/category")
            .then(response => {
                return Promise.resolve(response.data)
            })
            .catch(error => {
                console.log(error);
                return Promise.reject(error);
            });
    }

    static getSingleProduct = (id: number): Promise<Product> => {
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