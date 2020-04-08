<template>
    <div class="buy">
        <navigation-bar @back="onBack" :pageName="pageName" :navBarStyle="navBarStyle"></navigation-bar>
        <div class="buy-content">
            <img :src="goods.img" class="buy-content-img">
            <div class="buy-content-desc">
                <p class="buy-content-desc-name">{{goods.name}}</p>
                <p class="buy-content-desc-price">￥{{goods.price}}</p>
            </div>
        </div>
        <ul class="buy-payment">
            <li v-for="(pay, index) in payments" class="buy-payment-item" @click="choosePayment(index)">
                <img class="buy-payment-item-img" :src="pay.icon">
                <div class="buy-payment-item-desc">
                    <p class="buy-payment-item-desc-name">{{pay.name}}</p>
                    <p class="buy-payment-item-desc-desc">{{pay.desc}}</p>
                </div>
                <div :class="paymentIndex == index ? 'choose' : 'not-choose'" class="buy-payment-item-choose"></div>
            </li>
        </ul>
        <div class="buy-footer">
            <div class="buy-footer-commit">
                <span>立即购买</span>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        data() {
            return {
                pageName: '立即购买',
                navBarStyle: {
                    position: 'fixed',
                    backgroundColor: '#fff'
                },
                goods: {},
                payments: [
                    {id: 'alipay', name: '支付宝支付', desc: '数亿用户都在用，安全可信托', icon: require('@/common/images/alipay.svg')},
                    {id: 'weichat', name: '微信支付', desc: '亿万用户选择，更快更安全', icon: require('@/common/images/weichat.png')}
                ],
                paymentIndex: 0
            }
        },
        methods: {
            onBack() {
                this.$router.back()
            },
            choosePayment(index) {
              if (this.paymentIndex != index) {
                  this.paymentIndex = index
              }
            },
            getGoodsDetail() {
                this.$http.get('/goodsDetail', {
                    params: {
                        goodsId: this.$route.query.id
                    }
                }).then(res => {
                    this.goods = res.data.goodsData
                })
            }
        },
        created() {
            this.getGoodsDetail()
        },
        components: {
            NavigationBar
        },
        name: "buy"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .buy {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: $color-background-d;
        &-content {
            background-color: #fff;
            margin-top: 54px;
            padding: 5px;
            display: flex;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            &-img {
                width: 100px;
                height: 100px;
            }
            &-desc {
                margin-left: 5px;
                flex: auto;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                &-name {
                    font-size: $font-size-medium;
                }
                &-price {
                    font-size: $font-size-medium;
                    color: $color-text-price;
                }
            }
        }
        &-payment {
            margin-top: 10px;
            background-color: #fff;
            &-item {
                padding: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid $color-background-d;
                &-img {
                    width: 32px;
                    height: 32px;
                }
                &-desc {
                    margin-left: 5px;
                    font-size: $font-size-medium;
                    flex: auto;
                    align-self: stretch;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    &-name {

                    }
                    &-desc {
                        color: $color-text-l;
                        font-size: $font-size-small;
                    }
                }
                &-choose {
                    width: 16px;
                    height: 16px;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                &-choose.choose {
                    background-image: url("./../../common/images/check.svg");
                }
                &-choose.not-choose {
                    background-image: url("./../../common/images/no-check.svg");
                }
            }

        }
        &-footer {
            position: absolute;
            width: 100%;
            bottom: 40px;
            &-commit {
                margin: 0 auto;
                width: 80%;
                height: 46px;
                background-color: #d81e06;
                height: 46px;
                border-radius: 23px;
                font-size: $font-size-medium-m;
                color: #fff;
                font-weight: bold;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>