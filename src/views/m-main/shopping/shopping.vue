<template>
    <div class="shopping">
        <navigation-bar :isShowBack="false" pageName="购物车" :navBarStyle="navBarStyle"></navigation-bar>
        <div class="shopping-content">
            <ul class="shopping-content-list">
                <li v-for="(goods, index) in goodsList" class="shopping-content-list-item">
                    <div @click="changeOneState(goods, index)" :class="goods.choose ? 'choose' : 'not-choose'" class="shopping-content-list-item-choose"></div>
                    <img class="shopping-content-list-item-img" :src="goods.img">
                    <div class="shopping-content-list-item-desc">
                        <p class="shopping-content-list-item-desc-name gt-2-line-hide-text-with-dots">{{goods.name}}</p>
                        <div class="shopping-content-list-item-desc-price-num">
                            <p class="shopping-content-list-item-desc-price-num-price">￥{{goods.price}}</p>
                            <p class="shopping-content-list-item-desc-price-num-num">
                                <span @click="minusGoodsNum(goods, index)" :class="goods.number == 1 ? 'disabled' : ''" class="shopping-content-list-item-desc-price-num-num-minus">-</span>
                                <input v-model="goods.number" disabled type="text" class="shopping-content-list-item-desc-price-num-num-val">
                                <span @click="addGoodsNum(goods, index)" class="shopping-content-list-item-desc-price-num-num-add">+</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="shopping-content-total">
                <div class="shopping-content-total-left">
                    <div @click="changeAllState" :class="allChoose ? 'choose' : 'not-choose'" class="shopping-content-total-left-choose"></div>
                    <p class="shopping-content-total-left-text">全选</p>
                </div>
                <div class="shopping-content-total-center">
                    合计：<span class="shopping-content-total-center-money">￥{{totalMoney}}</span>
                </div>
                <div class="shopping-content-total-right">
                    <span>去结算（{{totalNum}}）</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        data() {
            return {
                navBarStyle: {
                    position: 'fixed',
                    backgroundColor: '#fff'
                },
                goodsList: this.$store.state.shoppingDatas,
                allChoose: false
            }
        },
        computed: {
            totalMoney() {
                let total = 0
                this.goodsList.forEach(item => {
                    if (item.choose) {
                        total += item.price * item.number
                    }
                })
                return total
            },
            totalNum() {
                let num = 0
                this.goodsList.forEach(item => {
                    if (item.choose) {
                        num += item.number
                    }
                })
                return num
            }
        },
        methods: {
            addGoodsNum(goods, index) {
                this.$store.commit('changeShoppingDataNumber', {index, number: Number(goods.number) + 1})
            },
            minusGoodsNum(goods, index) {
                if (goods.number == 1) {
                    return
                } else {
                    this.$store.commit('changeShoppingDataNumber', {index, number: goods.number - 1})
                }
            },
            changeOneState(goods, index) {
                this.$store.commit('changeShoppingDataState', {index, choose: !goods.choose})
                let allChoose = true
                for (let i=0; i<this.goodsList.length; i++) {
                    allChoose = allChoose && this.goodsList[i].choose
                    if (!allChoose) {
                        break
                    }
                }
                this.allChoose = allChoose
            },
            changeAllState() {
                this.$store.commit('changeAllShoppingDataState', !this.allChoose)
                let allChoose = true
                for (let i=0; i<this.goodsList.length; i++) {
                    allChoose = allChoose && this.goodsList[i].choose
                    if (!allChoose) {
                        break
                    }
                }
                this.allChoose = allChoose
            }
        },
        created() {
            if (!this.goodsList.length) {
                return
            }
            let allChoose = true
            for (let i=0; i<this.goodsList.length; i++) {
                allChoose = allChoose && this.goodsList[i].choose
                if (!allChoose) {
                    break
                }
            }
            this.allChoose = allChoose
        },
        components: {
            NavigationBar
        },
        name: "shopping"
    }
</script>

<style lang="scss" scoped>
    @import "./../../../common/scss/variable";

    .shopping {
        height: 100%;
        background-color: $color-background-d;
        &-content {
            position: absolute;
            top: 44px;
            left: 0;
            right: 0;
            bottom: 0;
            &-list {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 56px;
                background-color: #fff;
                overflow-y: auto;
                &-list::-webkit-scrollbar {
                    display: none;
                }
                &-item {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid $color-background-d;
                    &-choose {
                        width: 16px;
                        height: 16px;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        background-position: center;
                        flex-shrink: 0;
                        margin-right: 5px;
                    }
                    &-choose.choose {
                        background-image: url("./../../../common/images/check.svg");
                    }
                    &-choose.not-choose {
                        background-image: url("./../../../common/images/no-check.svg");
                    }
                    &-img {
                        width: 100px;
                        height: 100px;
                        flex-shrink: 0;
                        margin-right: 5px;
                    }
                    &-desc {
                        align-self: stretch;
                        flex: auto;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        &-name {
                            font-size: $font-size-medium;
                            line-height: $font-size-medium-m;
                        }
                        &-price-num {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            &-price {
                                font-size: $font-size-medium;
                                color: #d81e06;
                            }
                            &-num {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                &-minus {
                                    width: 16px;
                                    height: 16px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: $font-size-large;
                                }
                                &-minus.disabled {
                                    opacity: .5;
                                }
                                &-val {
                                    width: 40px;
                                    height: 20px;
                                    text-align: center;
                                    line-height: 20px;
                                    padding: 0;
                                    font-size: $font-size-medium;
                                    border: none;
                                    background-color: $color-background-d;
                                }
                                &-add {
                                    width: 30px;
                                    height: 30px;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    font-size: $font-size-large;
                                }
                            }
                        }
                    }
                }
            }
            &-total {
                height: 56px;
                position: absolute;
                width: 100%;
                bottom: 0;
                display: flex;
                justify-content: space-between;
                padding-left: 10px;
                align-items: center;
                background-color: #fff;
                &-left {
                    display: flex;
                    align-items: center;
                    &-choose {
                        width: 16px;
                        height: 16px;
                        background-size: 100%;
                        background-repeat: no-repeat;
                        background-position: center;
                        margin-right: 5px;
                    }
                    &-choose.choose {
                        background-image: url("./../../../common/images/check.svg");
                    }
                    &-choose.not-choose {
                        background-image: url("./../../../common/images/no-check.svg");
                    }
                    &-text {
                        font-size: $font-size-medium;
                    }
                }
                &-center {
                    font-size: $font-size-medium-m;
                    &-money {
                        font-size: $font-size-medium;
                        font-weight: bold;
                    }
                }
                &-right {
                    width: 120px;
                    align-self: stretch;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #d81e06;
                    color: #fff;
                    font-weight: bold;
                    font-size: $font-size-medium-m;
                }
            }
        }
    }
</style>
