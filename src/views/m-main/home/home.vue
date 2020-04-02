<template>
    <div class="home" @scroll="onScroll">
        <navigation-bar :navBarStyle="navBarStyle" :isShowBack="false">
            <!-- 左侧插槽 -->
            <template v-slot:nav-left>
                <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
            </template>
            <!-- 中间插槽 -->
            <template v-slot:nav-center>
                <search :icon="navBarCurrentSlotStyle.search.icon" :hintColor="navBarCurrentSlotStyle.search.hintColor" :bgColor="navBarCurrentSlotStyle.search.bgColor"></search>
            </template>
            <!-- 右侧插槽 -->
            <template v-slot:nav-right>
                <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
            </template>
        </navigation-bar>
        <!-- 这里的v-if指令作用主要是：在恰当的时机(sliderList.length不为0)实例化Swiper -->
        <carrousel v-if="sliderList.length" :sliderList="sliderList" :interval="carouselInterval"></carrousel>
        <activity>
            <div class="activity-520">
                <img class="activity-520-img" v-for="(img, index) in activity520ImgList" :key="index" :src="img.url">
            </div>
        </activity>
        <mode-options></mode-options>
        <div class="seconds-wrapper">
            <seconds :secondsGoodsList="secondsGoodsList"></seconds>
        </div>
        <div class="activity-wrapper">
            <activity>
                <div class="activity-pin-gou-jie">
                    <img class="activity-pin-gou-jie-img" src="../../../common/images/pinGouJie.gif">
                </div>
            </activity>
        </div>
        <goods-list v-if="goodsList.length" :goodsList="goodsList" layout="waterfall"></goods-list>
    </div>
</template>

<script>
    import Carrousel from '@/components/carrousel/carrousel'
    import Activity from '@/components/activity/activity'
    import ModeOptions from '@/components/mode-options/mode-options'
    import Seconds from '@/components/seconds/seconds'
    import GoodsList from '@/components/goods-list/goods-list'
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'
    import Search from '@/components/search/search.vue'

    export default {
        data() {
            return {
                secondsGoodsList: [],
                activity520ImgList: [],
                sliderList:[],
                carouselInterval: 4000,
                goodsList: [],
                navBarSlotStyle: {
                    normal: {
                        leftIcon: require('@/common/images/more-white.svg'),
                        search: {
                            bgColor: '#fff',
                            hintColor: '#999',
                            icon: require('@/common/images/search.svg')
                        },
                        rightIcon: require('@/common/images/message-white.svg')
                    },
                    highlight: {
                        leftIcon: require('@/common/images/more.svg'),
                        search: {
                            bgColor: '#d7d7d7',
                            hintColor: '#fff',
                            icon: require('@/common/images/search-white.svg')
                        },
                        rightIcon: require('@/common/images/message.svg')
                    }
                },
                navBarCurrentSlotStyle: {},
                navBarStyle: {
                    position: 'fixed',
                    backgroundColor: 'rgba(255, 255, 255, .0)'
                },
                scrollTopValue: -1,
                ANCHOR_SCROLL_TOP: 160
            }
        },
        methods: {
            onScroll(e) {
                this.scrollTopValue = e.target.scrollTop
                if(this.scrollTopValue >= this.ANCHOR_SCROLL_TOP){
                    this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
                    this.navBarStyle.backgroundColor = `rgba(255, 255, 255, 1)`
                }
                else {
                    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
                    let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
                    this.navBarStyle.backgroundColor = `rgba(255, 255, 255, ${opacity})`
                }
            },
            _getHomeData() {
                this._getSliderList()
                this._getActivity520ImgsData()
                this._getSecondsData()
                this._getGoodsData()
            },
            _getSecondsData() {
                this.$http.get('/seconds').then(res => {
                    if(res.state == 0){
                        this.secondsGoodsList = this.normalizeSecondsData(res.data.list)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeSecondsData(secondsData) {
                let secondsList = []
                for(let i=0; i<secondsData.length; i++){
                    let seconds = {}
                    seconds.linkUrl = 'javascript:;'
                    seconds.imgUrl = secondsData[i].icon
                    seconds.salePrice = secondsData[i].price
                    seconds.normalPrice = secondsData[i].oldPrice
                    secondsList.push(seconds)
                }
                return secondsList
            },
            _getActivity520ImgsData() {
                this.$http.get('/activitys').then(res => {
                    if(res.state == 0){
                        this.activity520ImgList = this.normalizeActivity520ImgData(res.data.list)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeActivity520ImgData(Activity520ImgsData) {
                let activity520ImgList = []
                for(let i=0; i<Activity520ImgsData.length; i++){
                    let activity520Img = {}
                    activity520Img.url = Activity520ImgsData[i].icon
                    activity520ImgList.push(activity520Img)
                }
                return activity520ImgList
            },
            _getSliderList() {
                this.$http.get('/swiper').then(res => {
                    if(res.state == 0){
                        this.sliderList = this.normalizeSliderData(res.data.list)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeSliderData(sliderData) {
                let sliderList = []
                for(let i=0; i<sliderData.length; i++){
                    let slider = {}
                    slider.picUrl = sliderData[i].icon
                    slider.linkUrl = 'javascript:;'
                    sliderList.push(slider)
                }
                return sliderList
            },
            _getGoodsData() {
                this.$http.get('/goods').then(res => {
                    if(res.state == 0){
                        this.goodsList = this.normalizeGoodsData(res.data.list)
                    }else{
                        alert(res.msg)
                    }
                })
            },
            normalizeGoodsData(goodsData) {
                let goodsList = []
                for(let i=0; i<goodsData.length; i++){
                    let goods = {}
                    goods.isDirect = goodsData[i].isDirect
                    goods.isHave = goodsData[i].isHave
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
        created() {
            this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
            this._getHomeData()
        },
        components: {
            Carrousel,
            Activity,
            ModeOptions,
            Seconds,
            GoodsList,
            NavigationBar,
            Search
        },
        name: "home"
    }
</script>

<style lang="scss" scoped>
    .home {
        height: 100%;
        overflow-y: auto;
        .activity-520 {
            display: flex;
            &-img {
                width: 33.3%;
                flex: auto;
            }
        }
        .seconds-wrapper {
            margin-top: 5px;
        }
        .activity-wrapper {
            margin-top: 5px;
            .activity-pin-gou-jie {
                &-img {
                    width: 100%;
                }
            }
        }
        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
