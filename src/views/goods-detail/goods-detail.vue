<template>
    <div class="goods-detail">
        <navigation-bar :navBarStyle="navBarStyle" :isShowBack="false">
            <template v-slot:nav-left>
                <img @click="back" src="@/common/images/back-2.svg"/>
            </template>
        </navigation-bar>
        <carrousel v-if="goods && goods.swiperPics" :sliderList="swiperList"></carrousel>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'
    import Carrousel from '@/components/carrousel/carrousel'

    export default {
        data() {
          return {
              goods: null,
              navBarStyle: {
                  position: 'fixed',
                  backgroundColor: 'rgba(255, 255, 255, .0)'
              }
          }
        },
        methods: {
            back() {
                this.$router.back();
            }
        },
        computed: {
            swiperList() {
                return this.goods.swiperPics.map(item => {
                    return {picUrl: item}
                })
            }
        },
        created() {
            this.goods = this.$route.params.goods
        },
        components: {
            NavigationBar,
            Carrousel
        },
        name: "goods-detail"
    }
</script>

<style lang="scss" scoped>
    .goods-detail {
        height: 100%;
    }
</style>
