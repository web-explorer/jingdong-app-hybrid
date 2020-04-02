<template>
    <div class="carrousel">
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-for="(slider, index) in sliderList" :key="index">
                <a :href="slider.linkUrl" class="swiper-slide">
                    <img @load="onLoad" :src="slider.picUrl">
                </a>
            </swiper-slide>
            <!-- Add Pagination -->
            <div v-if="hasIndicators" class="swiper-pagination" slot="pagination"></div>
            <!-- Add Arrows -->
            <div v-if="hasControl" class="swiper-button-prev" slot="button-prev"></div>
            <div v-if="hasControl" class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        props: {
            sliderList: {
                type: Array,
                default: []
            },
            interval: {
                type: Number,
                default: 5000
            },
            hasIndicators: {
                type: Boolean,
                default: true
            },
            hasControl: {
                type: Boolean,
                default: false
            },
            paginationType: {
                type: String,
                default: ''
            }
        },
        computed: {
            swiperOption() {
                let opts = {
                    loop: true,
                    autoplay: {
                        delay: this.interval,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        type: this.paginationType ? this.paginationType : 'bullets'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                }
                return opts
            }
        },
        methods: {
            onLoad() {
                if(!this.oneImgLoaded){
                    this.oneImgLoaded = true
                    this.$emit('oneImgLoad')
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        name: "carrousel"
    }
</script>


<style lang="css" scoped>
@import "~swiper/dist/css/swiper.min.css";
/*
当轮播图片的宽度大于.swiper-container的宽度时，需要给轮播图片设置如下样式
*/
.swiper-container>.swiper-wrapper>.swiper-slide>a>img {
    width: 100%;
}
/*
当轮播图片的宽度小于.swiper-container的宽度时，需要手动添加css使.swiper-container的宽度等于轮播图片的宽度
*/

>>> .swiper-pagination-bullet {
    background: rgba(255,255,255,0.5);
    opacity: 1;
}
>>> .swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: rgba(255,255,255,0.8);
}
</style>
