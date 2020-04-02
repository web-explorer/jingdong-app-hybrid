<template>
    <div class="grid">
        <div @click="onClickGoods(item)" class="grid-item" v-for="(item, index) in goodsList" :key="index">
            <img class="grid-item-img" :src="item.pic">
            <div class="grid-item-desc">
                <p class="grid-item-desc-name gt-2-line-hide-text-with-dots" :class="{'grid-item-desc-grey': !item.isHave}">
                    <!-- 是否为直营 -->
                    <direct v-if="item.isDirect"></direct>
                    <!-- 是否有库存 -->
                    <no-have v-if="!item.isHave"></no-have>
                    {{item.name}}
                </p>
                <div class="grid-item-desc-data">
                    <p class="grid-item-desc-data-price">￥{{item.price | priceValue}}</p>
                    <p class="grid-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
                <div class="grid-item-desc-activity">
                    <span class="activity self-run" v-if="item.selfRun">京东自营</span>
                    <span class="activity vip-special-offer" v-if="item.vipSpecialOffer">会员特价</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Direct from '@/components/direct/direct.vue'
    import NoHave from '@/components/no-have/no-have.vue'

    export default {
        props: {
            goodsList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            onClickGoods(goods) {
                this.$emit('clickGoods', goods);
            }
        },
        components: {
            Direct,
            NoHave
        },
        name: "grid"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .grid {
        display: flex;
        flex-wrap: wrap;
        &-item {
            border-radius: 5px;
            background-color: #fff;
            padding: 10px;
            margin: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 177px;
            height: 286.2px;
            &-img {
                width: 131.25px;
                height: 131.25px;
            }
            &-desc {
                margin-top: 10px;
                font-size: $font-size-medium;
                &-name {
                    font-weight: 500;
                    line-height: 20px;
                }
                &-grey {
                    color: $color-text-l;
                }
                &-data {
                    margin-top: 8px;
                    display: flex;
                    justify-content: space-between;
                    &-price {
                        color: #f00;
                        font-size: $font-size-medium-m;
                    }
                }
                &-activity {
                    margin-top: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    .activity + .activity {
                        margin-top: 8px;
                    }
                }
            }
        }
    }
</style>
