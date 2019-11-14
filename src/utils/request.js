import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import router from './../router'
import qs from "qs"
// 创建axios实例

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000, // 请求超时时间,
    // withCredentials: true,
    // changeOrigin: true,
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// request拦截器
service.interceptors.request.use(config => {

    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }

    if (sessionStorage.getItem("token")) {
        config.headers.Authorization = sessionStorage.getItem("token")

    }


    return config
}, error => {

    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {

        /**
         * code为非0是抛错 可结合自己业务进行修改
         */

        const res = response.data

        if (res.code !== 200 && res.code != '200') {

            Message({
                message: `错误码${res.code}${res.msg}`,
                type: 'error',
                duration: 3 * 1000
            })


            return Promise.reject('error')
        } else {



            return res



        }

    },
    error => {

        if (error.response.data.code !== 200) {
            if (error.response.data.code == 401) {
                MessageBox.alert('登录过期，请重新登录', {
                    confirmButtonText: '重新登录',
                    type: 'warning'
                }).then(() => {

                    window.location = '/login';
                    sessionStorage.clear();
                    location.reload()

                })
                return

            } else {
                return Message({
                    message: error.response.data.msg,
                    type: 'error',
                    duration: 3 * 1000
                })
            }


        }


    })

export default service