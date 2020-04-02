<template>
    <div class="goods-list">
        <waterfall @clickGoods="goGoodsDetail" v-if="layout == 'waterfall'" :goodsList="goodsList"></waterfall>
        <row @clickGoods="goGoodsDetail" v-if="layout == 'row'" :goodsList="goodsList"></row>
        <grid @clickGoods="goGoodsDetail" v-if="layout == 'grid'" :goodsList="goodsList"></grid>
    </div>
</template>

<script>
    import Waterfall from './../waterfall/waterfall'
    import Row from './../row/row'
    import Grid from './../grid/grid'

    export default {
        props: {
            layout: {
                type: String,
                default: 'row'
            },
            goodsList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            goGoodsDetail(goods) {
                if (!goods.isHave) {
                    alert('该商品无库存');
                    return;
                }
                this.$router.push({
                   name: 'goods-detail',
                   params: {
                       goods
                   }
                });
            }
        },
        components: {
            Waterfall,
            Row,
            Grid
        },
        name: "goods-list"
    }
</script>

<style lang="scss" scoped>
    .goods-list {
        background-color: #f5f5f5;
    }
</style>
