import Vue from 'vue'

/*
* 商品价格过滤器
* @param value需要过滤的参数
* */
Vue.filter('priceValue', (value) => {
    if(!value){
        return ''
    }
    let result = parseFloat(value)
    if(Number.isInteger(result)){
        return result
    }
    return result.toFixed(2)
})
