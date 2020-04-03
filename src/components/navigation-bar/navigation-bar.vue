<template>
    <div class="navigation-bar z-index-max" :style="navBarStyle" :class="{'bottom-line': pageName}">
        <div class="left">
            <!-- 默认状态 -->
            <img @click="$emit('back')" v-if="isShowBack" src="@/common/images/back.svg" alt="">
            <!-- 具名插槽 -->
            <slot name="nav-left"></slot>
        </div>
        <div class="center">
            <!-- 默认状态 -->
            <span v-if="pageName" class="page-title">{{pageName}}</span>
            <!-- 具名插槽 -->
            <slot name="nav-center"></slot>
        </div>
        <div class="right">
            <!-- 具名插槽 -->
            <slot name="nav-right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pageName: {
                type: String,
                default: ''
            },
            isShowBack: {
                type: Boolean,
                default: true
            },
            navBarStyle: {
                type: Object,
                default() {
                    return {
                        backgroundColor: '#fff'
                    }
                }
            }
        },
        name: "navigation-bar"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .navigation-bar {
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left, .right {
            position: relative;
            height: 100%;
            width: 44px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 35px;
                height: 35px;
            }
        }
        .center {
            flex-grow: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .page-title {
                font-size: $font-size-large-l;
            }
        }
    }
    .bottom-line {
        border-bottom: 1px solid #666;
    }
</style>
