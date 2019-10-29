import Vue from 'vue'
import axios from 'axios'

// axios配置
// 设置axios请求baseUrl
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club'

/*
* 设置拦截器，interceptors请求处理
* 在请求发送出去之前，会进入到这个回调函数
* 在这里，为请求添加上token
* */
axios.interceptors.request.use(config => {
    if(config.params){
        config.params.token = '777551a0-f009-11e9-acd3-7b90f1eac841'
    }else{
        config.params = {
            token: '777551a0-f009-11e9-acd3-7b90f1eac841'
        }
    }
    // 需要return config对象
    return config
})

/*
* 设置拦截器，interceptors响应处理，所有axios的请求响应，都会优先回调到拦截器中，
* 在请求得到响应的情况下，进入第一个回调函数
* 在请求发生错误的情况下，进入第二个回调函数
* */
axios.interceptors.response.use(response => {
    // 统一处理数据，只获取所需要的业务数据，舍弃状态码等与业务无关的数据
    return response.data
}, err => {
    return Promise.reject(err)
})

// 绑定到Vue原型对象上，在组件中：this.$http => axios
Vue.prototype.$http = axios
