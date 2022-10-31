/*
axios 二次封装

全局配置

响应拦截

请求方法

封装成对象调用的方式

 */
// 引入文件
import axios from 'axios'
import {ElMessage} from "element-plus";
// 全局配置
const service = axios.create({
    baseURL:"http://localhost",
    // baseURL:"projects/",
    timeout:8000
})

//响应拦截
service.interceptors.response.use(res=>{
    // console.log(res);
    return res; //TODO 不做响应拦截
    const {code,data,msg} = res.data
    if (code===200){
        // 请求成功
        ElMessage.success(msg)
        return data
    }else if (code===400){
        //请求失败
        ElMessage.error(msg)
    }
})

// 请求方法
function request(options){
    options.method=options.method || 'get'
    if (options.method.toLowerCase()==='get') options.params = options.data

    return service((options))
}

['get','post','put','delete'].forEach(item=>{
    request[item] = (url,data)=>{
        return request({
            url,
            data,
            method:item
        })
    }
})
// console.log(request)
export default request