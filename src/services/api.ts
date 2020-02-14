import { axiosInstance } from '@/main';

export default class ApiProduct {
    static searchProducts = (params: any) => {
        return axiosInstance
            .get("product/search", {
                params: params
            })
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.log(error);
                throw error
            });
    }
}