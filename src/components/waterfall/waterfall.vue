<template>
    <div :style="{'height': waterfallHeight + 'px'}" class="waterfall" ref="waterfall">
        <div class="waterfall-item" v-for="(item, index) in goodsList" :key="index" ref="goodsItems" :style="{'width': itemWidth + 'px', 'left': item.left + 'px', 'top': item.top + 'px'}" :class="{show: item.visible}">
            <img class="waterfall-item-img" :src="item.pic">
            <div class="waterfall-item-desc">
                <p class="waterfall-item-desc-name gt-2-line-hide-text-with-dots">
                    <!-- 是否为直营 -->
                    <!-- 是否有库存 -->
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
    export default {
        data() {
            return {
                goodsList: [],
                columns: 2,
                itemMargin: 5,
                waterfallHeight: 0,
                columnHeights: [],
                itemWidth: 0
            }
        },
        methods: {
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
            },
            _getGoodsData() {
                this.$http.get('/goods').then(res => {
                    if(res.state == 0){
                        this.goodsList = this.normalizeGoodsData(res.data.list)
                        this.p = setInterval(() => {
                            if(this.$refs.goodsItems && this.$refs.goodsItems.length){
                                let allGoodsItemHasHeight = true
                                for(let i=0; i<this.$refs.goodsItems.length; i++){
                                    if(!this.$refs.goodsItems[i].offsetHeight){
                                        allGoodsItemHasHeight = false
                                        break
                                    }
                                }
                                if(allGoodsItemHasHeight){
                                    this.waterfall()
                                    clearInterval(this.p)
                                }
                            }
                        }, 20)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeGoodsData(goodsData) {
                let goodsList = []
                for(let i=0; i<goodsData.length; i++){
                    let goods = {}
                    goods.pic = goodsData[i].img
                    goods.name = goodsData[i].name
                    goods.price = goodsData[i].price
                    goods.volume = goodsData[i].volume
                    goods.visible = false
                    let tmpNum = Math.random();
                    if(tmpNum >= 0 && tmpNum < 0.25){
                        goods.selfRun = true
                        goods.vipSpecialOffer = true
                    }else if(tmpNum >= 0.25 && tmpNum < 0.5){
                        goods.selfRun = true
                        goods.vipSpecialOffer = false
                    }else if(tmpNum >= 0.5 && tmpNum < 0.75){
                        goods.selfRun = false
                        goods.vipSpecialOffer = true
                    }else{
                        goods.selfRun = false
                        goods.vipSpecialOffer = false
                    }
                    goodsList.push(goods)
                }
                return goodsList
            }
        },
        mounted() {
            this.itemWidth = Math.floor(this.$refs.waterfall.offsetWidth / this.columns - 2 * this.itemMargin)
        },
        created() {
            for(let i=0; i<this.columns; i++){
                this.columnHeights.push(0)
            }
            this._getGoodsData()
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
            &-img {
                width: 3.5rem;
                height: 3.5rem;
            }
            &-desc {
                margin-top: 10px;
                font-size: $font-size-medium;
                &-name {
                    font-weight: 500;
                }
                &-data {
                    margin-top: 8px;
                    display: flex;
                    justify-content: space-between;
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
