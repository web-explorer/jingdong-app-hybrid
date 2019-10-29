<template>
    <div class="home">
        <!-- 这里的v-if指令作用主要是：再恰当的时机(sliderList.length不为0)实例化Swiper -->
        <carrousel v-if="sliderList.length" @oneImgLoad="onOneImgLoad" :sliderList="sliderList" :interval="carouselInterval"></carrousel>
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
        <waterfall></waterfall>
    </div>
</template>

<script>
    import Carrousel from '@/components/carrousel/carrousel'
    import Activity from '@/components/activity/activity'
    import ModeOptions from '@/components/mode-options/mode-options'
    import Seconds from '@/components/seconds/seconds'
    import Waterfall from '@/components/waterfall/waterfall'

    export default {
        data() {
            return {
                secondsGoodsList: [],
                activity520ImgList: [],
                sliderList:[],
                carouselInterval: 4000
            }
        },
        methods: {
            _getHomeData() {
                this._getSliderList()
                this._getActivity520ImgsData()
                this._getSecondsData()
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
            onOneImgLoad() {

            }
        },
        created() {
            this._getHomeData()
        },
        components: {
            Carrousel,
            Activity,
            ModeOptions,
            Seconds,
            Waterfall
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
    }
    .home::-webkit-scrollbar {
        display: none;
    }
</style>
