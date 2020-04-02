<template>
    <div class="search" :style="{backgroundColor: bgColor}">
        <img class="search-icon" :src="icon" alt="">
        <input :style="{color: hintColor}" type="text" class="search-hint" value="大前端开发，混合京东商城系统">
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: String,
                default: require('@/common/images/search.svg')
            },
            hintColor: {
                type: String,
                default: '#999'
            },
            bgColor: {
                type: String,
                default: '#fff'
            }
        },
        name: "search"
    }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable";

    .search {
        height: 30px;
        border-radius: 22px;
        display: flex;
        align-items: center;
        padding: 0 15px;
        &-icon {
            width: $font-size-large;
            height: $font-size-large;
        }
        &-hint {
            margin-left: 5px;
            width: 180px;
            font-size: $font-size-small;
            border: none;
            background-color: transparent;
        }
    }
</style>
