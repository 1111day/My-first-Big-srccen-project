import axios from "axios";
import { BASE_URL,TIMEOUT} from './config'

class Request{
    instance: any;
    constructor( baseURL: string, timeout = 10000 ){
        //创建实例
        //this.instance = axios.create({ base_url,timeout });
        this.instance = axios.create({
            baseURL,
            timeout,
        })
        this.instance.interceptors.request.use(
            function(config: any){
                //请求拦截时的代码操作
                    return config
            },
            function(err: any){
                return Promise.reject(err)
            }
        )
        this.instance.interceptors.response.use(
            function(response: { data: { data: any; }; }){
                //响应拦截时的代码操作
                return response.data.data
            },
            function(err: any){
                return Promise.reject(err)
            }
        )
    }
    request(config: any){
        return new Promise((resolve,reject)=>{
            this.instance.request(config).then((res: unknown)=>{
                resolve(res)
            }).catch((err: any)=>{
                reject(err)
            })
        })
    }

    get(config: any){
        return this.request({...config,methods:'get'})
    }
    post(config: any){
        return this.request({...config,methods:'post'})
    }
}


export default new Request(BASE_URL,TIMEOUT)
