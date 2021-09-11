import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class RequestTest{
  request: AxiosInstance;
  constructor(){
    this.request = axios.create({
      baseURL: 'http://localhost:3333/',
      responseType: 'json'
    })
  }

  async get(url: string, config?: AxiosRequestConfig){
    let response: any;
    await this.request.get(url).then(res => {
      response =  res.data;
    }).catch(error => {
      if(error.response){
        response = error.response.data;
      }
    })

    return response;
  }

  async head(url: string, config?: AxiosRequestConfig){
    let response: any;
    await this.request.head(url).then(res => {
      response =  res.data;
    }).catch(error => {
      if(error.response){
        response = error.response.data;
      }
    })

    return response;
  }

  async post(url: string, object: any, config?: AxiosRequestConfig){
    let response: any;

    await this.request.post(url, object)
    .then(res => {
      response =  res.data;

    }).catch(error => {
      if(error.response){
        response = error.response.data;
      }

    })

    return response;
  }
}

