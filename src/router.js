import Vue from 'vue'
import Router from 'vue-router'
import MMain from '@/views/m-main/m-main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'm-main',
      component: MMain
    },
    {
      path: '/searchResult',
      name: 'search-result',
      component: () => import(/* webpackChunkName: "search-result" */ '@/views/search-result/search-result.vue')
    },
    {
      path: '/goodsDetail',
      name: 'goods-detail',
      component: () => import(/* webpackChunkName: "goods-detail" */ '@/views/goods-detail/goods-detail.vue')
    }
  ]
})
