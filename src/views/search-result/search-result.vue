<template>
    <div class="search-result">
        <navigation-bar @back="onBack" pageName="商品列表">
            <template v-slot:nav-right>
                <img @click="changeLayout" :src="layoutTypeImg"/>
            </template>
        </navigation-bar>
        <div class="sort-options-wrapper">
            <sort-options @sort="onSort"></sort-options>
        </div>
        <div class="goods-list-wrapper" ref="goodsListWrapper" @scroll="onScroll">
            <goods-list v-if="goodsList.length" :goodsList="goodsList" :layout="layoutTypes[layoutIndex]"></goods-list>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'
    import SortOptions from '@/components/sort-options/sort-options.vue'
    import GoodsList from '@/components/goods-list/goods-list'

    export default {
        data() {
            return {
                layoutTypes: ['row', 'grid', 'waterfall'],
                layoutIndex: 0,
                goodsList: [],
                scrollTopValue: 0
            }
        },
        computed: {
            layoutTypeImg() {
                return require(`@/common/images/${this.layoutTypes[this.layoutIndex]}-type.svg`)
            }
        },
        methods: {
            onScroll(e) {
                this.scrollTopValue = e.target.scrollTop
            },
            onSort(sortType) {
                switch (sortType) {
                    case '0-0':
                        this.goodsList = this.nativeGoodsList
                        break
                    case '0-1':
                        this.goodsList = this.nativeGoodsList.sort((a, b) => {
                            return b.price - a.price
                        })
                        break
                    case '0-2':
                        this.goodsList = this.nativeGoodsList.sort((a, b) => {
                            return a.price - b.price
                        })
                        break
                    case '1-0':
                        this.goodsList = this.nativeGoodsList.sort((a, b) => {
                            return Number(b.isHave) - Number(a.isHave)
                        })
                        break
                    case '2-0':
                        this.goodsList = this.nativeGoodsList.sort((a, b) => {
                            return Number(b.isDirect) - Number(a.isDirect)
                        })
                        break
                }
            },
            changeLayout() {
                if (this.layoutIndex < 2) {
                    this.layoutIndex++
                } else {
                    this.layoutIndex = 0
                }
            },
            onBack() {
                // 返回上一页
                this.$router.back();
            },
            _getGoodsData() {
                this.$http.get('/goods').then(res => {
                    if(res.state == 0){
                        this.nativeGoodsList = this.normalizeGoodsData(res.data.list)
                        this.goodsList = this.nativeGoodsList
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeGoodsData(goodsData) {
                let goodsList = []
                for(let i=0; i<goodsData.length; i++){
                    let goods = {}
                    goods.id = goodsData[i].id
                    goods.isDirect = goodsData[i].isDirect
                    goods.isHave = goodsData[i].isHave
                    goods.pic = goodsData[i].img
                    goods.swiperPics = goodsData[i].swiperImgs
                    goods.detailPics = goodsData[i].detailImgs
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
        created() {
            this._getGoodsData()
        },
        activated() {
            this.$refs.goodsListWrapper.scrollTop = this.scrollTopValue
        },
        components: {
            NavigationBar,
            SortOptions,
            GoodsList
        },
        name: "search-result"
    }
</script>

<style lang="scss" scoped>
    .search-result {
        width: 100%;
        height: 100%;
        position: absolute;
        .sort-options-wrapper {
            position: absolute;
            top: 44px;
            height: 37.5px;
            width: 100%;
            overflow: visible;
            z-index: 100;
            background-color: #fff;
        }
        .goods-list-wrapper {
            position: absolute;
            top: 81.5px;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-y: auto;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
</style>
