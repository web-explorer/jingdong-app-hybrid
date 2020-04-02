<template>
    <div :style="{'height': waterfallHeight + 'px'}" class="waterfall" ref="waterfall">
        <div @click="onClickGoods(item)" class="waterfall-item" v-for="(item, index) in goodsList" :key="index" ref="goodsItems" :style="{'width': itemWidth + 'px', 'left': item.left + 'px', 'top': item.top + 'px'}" :class="{show: item.visible}">
            <img class="waterfall-item-img" :src="item.pic">
            <div class="waterfall-item-desc">
                <p class="waterfall-item-desc-name gt-2-line-hide-text-with-dots" :class="{'waterfall-item-desc-grey': !item.isHave}">
                    <!-- 是否为直营 -->
                    <direct v-if="item.isDirect"></direct>
                    <!-- 是否有库存 -->
                    <no-have v-if="!item.isHave"></no-have>
                    {{item.name}}
                </p>
                <div class="waterfall-item-desc-data">
                    <p class="waterfall-item-desc-data-price">￥{{item.price | priceValue}}</p>
                    <p class="waterfall-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
                <div class="waterfall-item-desc-activity">
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
        data() {
            return {
                columns: 2,
                itemMargin: 5,
                waterfallHeight: 0,
                columnHeights: [],
                itemWidth: 0
            }
        },
        methods: {
            onClickGoods(goods) {
                this.$emit('clickGoods', goods);
            },
            waterfall() {
                this.$refs.goodsItems.forEach((item, index) => {
                    let minHeightIndex = 0;
                    for(let i=1; i<this.columnHeights.length; i++){
                        if(this.columnHeights[i] < this.columnHeights[minHeightIndex]){
                            minHeightIndex = i
                        }
                    }
                    this.goodsList[index].left = minHeightIndex * (this.itemWidth + 2 * this.itemMargin) + this.itemMargin
                    this.goodsList[index].top = this.columnHeights[minHeightIndex] + this.itemMargin
                    this.goodsList[index].visible = true
                    this.columnHeights[minHeightIndex] += item.offsetHeight + 2 * this.itemMargin
                })
                let maxHeightIndex = 0;
                for(let i=1; i<this.columnHeights.length; i++){
                    if(this.columnHeights[i] > this.columnHeights[maxHeightIndex]){
                        maxHeightIndex = i;
                    }
                }
                this.waterfallHeight = this.columnHeights[maxHeightIndex]
            }
        },
        mounted() {
            this.itemWidth = Math.floor(this.$refs.waterfall.offsetWidth / this.columns - 2 * this.itemMargin)
            setTimeout(() => {
                this.waterfall()
            }, 20)
        },
        created() {
            for(let i=0; i<this.columns; i++){
                this.columnHeights.push(0)
            }
        },
        components: {
            Direct,
            NoHave
        },
        name: "waterfall"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .waterfall {
        position: relative;
        &-item {
            border-radius: 5px;
            background-color: #fff;
            padding: 10px;
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
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
