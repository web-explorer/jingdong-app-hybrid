<template>
    <div class="goods-detail">
        <navigation-bar :navBarStyle="navBarStyle" :isShowBack="false">
            <template v-slot:nav-left>
                <img @click="back" src="@/common/images/back-2.svg"/>
            </template>
        </navigation-bar>
        <div class="goods-detail-body">
            <carrousel v-if="goods && goods.swiperPics" :sliderList="swiperList"></carrousel>
            <div class="goods-detail-body-content">
                <div class="goods-detail-body-content-outline">
                    <p class="goods-detail-body-content-outline-price">￥{{goods.price}}</p>
                    <p class="goods-detail-body-content-outline-name">
                        <direct v-if="goods.isDirect"></direct>
                        {{goods.name}}
                    </p>
                </div>
                <div class="goods-detail-body-content-detail">
                    <div class="goods-detail-body-content-detail-choose">
                        <p class="goods-detail-body-content-detail-choose-mark">已选</p>
                        <p class="goods-detail-body-content-detail-choose-name gt-1-line-hide-text-with-dots">{{goods.name}}</p>
                    </div>
                    <ul class="goods-detail-body-content-detail-supports">
                        <li v-for="support in supports" class="goods-detail-body-content-detail-supports-item">
                            <img class="goods-detail-body-content-detail-supports-item-pic" src="@/common/images/support.svg">
                            <span class="goods-detail-body-content-detail-supports-item-text">{{support}}</span>
                        </li>
                    </ul>
                </div>
                <div class="goods-detail-body-content-detail-pics">
                    <img class="goods-detail-body-content-detail-pics-item" v-for="detailPic in goods.detailPics" :src="detailPic">
                </div>
            </div>
        </div>
        <div class="goods-detail-footer">
            <div class="goods-detail-footer-btn add-cart">加入购物车</div>
            <div class="goods-detail-footer-btn buy-now">立即购买</div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'
    import Carrousel from '@/components/carrousel/carrousel'
    import Direct from '@/components/direct/direct.vue'

    export default {
        data() {
          return {
              goods: null,
              navBarStyle: {
                  position: 'fixed',
                  backgroundColor: 'rgba(255, 255, 255, .0)'
              },
              supports: [
                  '可配送海外',
                  '京东发货&售后',
                  '京准达',
                  '211限时达',
                  '可自提',
                  '不可使用优惠券'
              ]
          }
        },
        methods: {
            back() {
                this.$router.back();
            }
        },
        computed: {
            swiperList() {
                return this.goods.swiperPics.map(item => {
                    return {picUrl: item}
                })
            }
        },
        created() {
            this.goods = this.$route.params.goods
        },
        components: {
            NavigationBar,
            Carrousel,
            Direct
        },
        name: "goods-detail"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .goods-detail {
        height: 100%;
        position: relative;
        &-footer {
            position: absolute;
            width: 100%;
            height: 52px;
            bottom: 0;
            border-top: 1px solid #e5e5e5;
            display: flex;
            flex-direction: row-reverse;
            &-btn {
                width: 112px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: $font-size-medium;
            }
            .add-cart {
                background-color: #d81e06;
                order: 1;
            }
            .buy-now {
                background-color: #b8860b;
            }
        }
        &-body {
            overflow-y: auto;
            background-color: $color-background-d;
            position: absolute;
            top: 0;
            bottom: 52px;
            width: 100%;
            display: flex;
            flex-direction: column;
            &-content {
                &-outline {
                    margin-bottom: 15px;
                    font-size: $font-size-large;
                    line-height: 22px;
                    background-color: #fff;
                    padding: 8px;
                    &-price {
                        color: #d81e06;
                        margin-bottom: 8px;
                        font-weight: 600;
                    }
                    &-name {
                        color: #000;
                        font-weight: 600;
                    }
                }
                &-detail {
                    background-color: #fff;
                    padding: 8px;
                    &-choose {
                        display: flex;
                        align-items: center;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        border-bottom: 1px solid #e5e5e5;
                        &-mark {
                            display: flex;
                            flex-direction: column;
                            font-size: $font-size-medium;
                            color: $color-text-l;
                        }
                        &-name {
                            font-size: $font-size-medium-m;
                            font-weight: 600;
                        }
                    }
                    &-supports {
                        display: flex;
                        flex-wrap: wrap;
                        padding-top: 8px;
                        padding-bottom: 8px;
                        &-item {
                            margin: 6px;
                            display: flex;
                            align-items: center;
                            &-pic {
                                width: 14px;
                                height: 14px;
                            }
                            &-text {
                                margin-left: 3px;
                                color: $color-text-l;
                                font-size: $font-size-medium;
                            }
                        }
                    }
                    &-pics {
                        display: flex;
                        flex-direction: column;
                        &-item {
                            width: 100%;
                        }
                    }
                }
            }
        }
        &-body::-webkit-scrollbar {
            display: none;
        }
    }
</style>
