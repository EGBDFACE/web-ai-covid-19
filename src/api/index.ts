import axios from 'axios';
import { BASE_URL as baseUrl } from 'src/utils/constant';

axios.interceptors.request.use (config => {
    const token = localStorage.getItem('token');
    config.headers.common['Authorization'] = 'Bearer ' + token;
    return config;
});

export function fetchUploadFile(data: any, that: any, value: any){
    return axios({
        method: 'POST',
        baseURL: baseUrl,
        url: 'uploadFile',
        data: data,
        onUploadProgress: (progressEvent) => {
            that.updateFileList(function(fileItem:any){
                if(fileItem.id == value.id) {
                    fileItem.progress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                }
            })
        }
    })
}

export function fetchGetResult(data: any){
    return axios({
        method: 'POST',
        baseURL: baseUrl,
        url: 'getResult',
        data: data
    })
}

export function fetchLogin(data: any){
    return axios({
        method: 'POST',
        baseURL: baseUrl,
        url: 'signIn',
        data: data
    })
}

export function fetchGetSalt(data: any){
    return axios({
        method: 'POST',
        baseURL: baseUrl,
        url: 'getSalt',
        data: data,
        // timeout: 1000
    })
}