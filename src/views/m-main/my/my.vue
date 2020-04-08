<template>
    <div class="my">
        <navigation-bar :navBarStyle="navBarStyle" :isShowBack="false" pageName="我的"></navigation-bar>
        <div class="my-content">
            <div class="my-content-header">
                <img class="my-content-header-img" src="@/common/images/avater.png">
                <p @click="goLogin" class="my-content-header-text">登录/注册</p>
            </div>
            <ul class="my-content-functions">
                <li v-for="item in functions" class="my-content-functions-item">
                    <p class="my-content-functions-item-text">{{item}}</p>
                    <img class="my-content-functions-item-icon" src="@/common/images/right-arrow.svg">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        data() {
            return {
                navBarStyle: {
                    backgroundColor: '#fff'
                },
                functions: [
                    '全部订单',
                    '我的预约',
                    '应用推荐',
                    '用户福利'
                ]
            }
        },
        methods: {
            goLogin() {
                this.$router.push({
                    name: 'login',
                    params: {
                        jumpType: 1
                    }
                })
            }
        },
        components: {
            NavigationBar
        },
        name: "my"
    }
</script>

<style lang="scss" scoped>
    @import "./../../../common/scss/variable";

    .my {
        height: 100%;
        background-color: $color-background-d;
        &-content {
            margin-top: 10px;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
            background-color: #fff;
            &-header {
                padding: 10px;
                display: flex;
                align-items: center;
                &-img {
                    width: 52px;
                    height: 52px;
                    margin-right: 10px;
                }
                &-text {
                    font-size: $font-size-medium-m;
                }
            }
            &-functions {
                &-item {
                    padding: 15px 10px;
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid #e5e5e5;
                    &-text {
                        font-size: $font-size-medium;
                    }
                    &-icon {
                        width: 16px;
                        height: 16px;
                    }
                }
            }
        }
    }
</style>
