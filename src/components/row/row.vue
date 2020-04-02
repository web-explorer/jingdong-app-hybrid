<template>
    <div class="row">
        <div @click="onClickGoods(item)" class="row-item" v-for="(item, index) in goodsList" :key="index">
            <img class="row-item-img" :src="item.pic">
            <div class="row-item-desc">
                <p class="row-item-desc-name gt-2-line-hide-text-with-dots" :class="{'grid-item-desc-grey': !item.isHave}">
                    <!-- 是否为直营 -->
                    <direct v-if="item.isDirect"></direct>
                    <!-- 是否有库存 -->
                    <no-have v-if="!item.isHave"></no-have>
                    {{item.name}}
                </p>
                <div class="row-item-desc-data">
                    <p class="row-item-desc-data-price">￥{{item.price | priceValue}}</p>
                    <p class="row-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
                <div class="row-item-desc-activity">
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
                default: []
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
        name: "row"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .row {
        &-item {
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: center;
            height: 147.25px;
            padding: 8px;
            &-img {
                width: 131.25px;
                height: 131.25px;
                flex-shrink: 0;
            }
            &-desc {
                font-size: $font-size-medium;
                height: 131.25px;
                margin-left: 8px;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                &-name {
                    font-weight: 500;
                    line-height: 20px;
                }
                &-grey {
                    color: $color-text-l;
                }
                &-data {
                    display: flex;
                    justify-content: space-between;
                    &-price {
                        color: #f00;
                        font-size: $font-size-medium-m;
                    }
                }
                &-activity {
                    min-height: 25px;
                    display: flex;
                    .activity + .activity {
                        margin-left: 8px;
                    }
                }
            }
        }
    }
</style>
