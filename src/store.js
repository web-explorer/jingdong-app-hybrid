import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/*
* vuex作用：
* 1、vuex就是在vue中创建全局变量的一个东西。
* 2、并且我们可以通过一些方法，来改变这些全局变量的值。
* */

/*
* Store:
*   就是new Vuex.Store({})里面的对象，用到的vuex所有核心概念都是在store里面的。
*   在vue的组件中，我们可以直接通过this.$store = Store对象。
* this.$store.state = "state: {}"，
*
* State:
*   vuex中的数据源，所有通过vuex声明的全局变量都会在state里面。（this.$store.state = "state: {}"）
*
* getter:
*   相当于vue中的计算属性，可以用于监听、计算state中数据的变化。
*
* mutation:
*   vuex中去操作数据的方法（vuex中，不推荐直接去为state赋值。this.$store.state.xx = 'xxx'）
*   推荐我们使用mutation来去修改state的值。因为这样它会是一个有迹可循的操作方式。（只能是同步执行的）
*
* action:
*   帮助mutation进行异步操作。
*
* module:
*   将store分为了多个模块，每一个模块都是一个module。
*
* */

export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: []
  },
  mutations: {
    /*
    * 添加商品到购物车数据源
    * */
    addShoppingData(state, goods) {
      let index = state.shoppingDatas.findIndex(item => {
        return item.id == goods.id
      })
      if (index > 0) {
        return
      } else {
        Vue.set(goods, 'choose', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    /*
    * 更改指定的商品数量
    * */
    changeShoppingDataNumber(state, data) {
      state.shoppingDatas[data.index].number = data.number
    },
    /*
    * 更改指定商品的状态
    * */
    changeShoppingDataState(state, data) {
      state.shoppingDatas[data.index].choose = data.choose
    },
    /*
    * 更改所有商品的状态
    * */
    changeAllShoppingDataState(state, choose) {
      state.shoppingDatas.forEach(item => {
        item.choose = choose
      })
    }
  },
  actions: {

  }
})
