<template>
    <div class="seconds">
        <div class="seconds-header">
            <p class="seconds-header-title">京东秒杀</p>
        </div>
        <div class="seconds-content">
            <a class="seconds-content-item" v-for="(item, index) in secondsGoodsList" :key="index">
                <img class="seconds-content-item-img" :src="item.imgUrl">
                <p class="seconds-content-item-sale-price">￥{{item.salePrice | priceValue}}</p>
                <p class="seconds-content-item-normal-price">￥{{item.normalPrice | priceValue}}</p>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            secondsGoodsList: {
                type: Array,
                default: []
            }
        },
        name: "seconds"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .seconds {
        background-color: $color-background-l;
        border-radius: 5px;
        padding-top: 5px;
        padding-bottom: 5px;
        &-header {
            display: flex;
            padding: 5px;
            &-title {
                font-size: $font-size-medium;
                color: $color-text-d;
            }
        }
        &-content {
            display: flex;
            padding-top: 5px;
            padding-bottom: 5px;
            overflow-x: auto;
            &-item {
                width: 25%;
                flex: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                &-img {
                    width: 60px;
                    height: 60px;
                }
                &-sale-price {
                    margin-top: 5px;
                    font-size: $font-size-large;
                    color: #d81e06;
                }
                &-normal-price {
                    margin-top: 5px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                    text-decoration: line-through;
                }
            }
        }
        /* 去除横向滚动条 */
        &-content::-webkit-scrollbar {
            display: none;
        }
    }
</style>
