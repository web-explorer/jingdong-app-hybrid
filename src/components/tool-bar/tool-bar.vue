<template>
    <div class="tool-bar">
        <div class="tool-bar-item" v-for="(item, index) in toolBarData" :key="index" @click="onChangeToolBar(item, index)">
            <img class="tool-bar-item-img" :src="index == selectItemIndex ? item.hIcon : item.nIcon">
            <p class="tool-bar-item-name" :class="index == selectItemIndex ? 'tool-bar-item-name-h' : ''">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                toolBarData: [
                    {
                        nIcon: require('@/common/images/home-n.svg'),
                        hIcon: require('@/common/images/home-h.svg'),
                        name: '首页',
                        componentName: 'Home'
                    },
                    {
                        nIcon: require('@/common/images/shopping-n.svg'),
                        hIcon: require('@/common/images/shopping-h.svg'),
                        name: '购物车',
                        componentName: 'Shopping'
                    },
                    {
                        nIcon: require('@/common/images/my-n.svg'),
                        hIcon: require('@/common/images/my-h.svg'),
                        name: '我的',
                        componentName: 'My'
                    }
                ],
                selectItemIndex: 0
            }
        },
        methods: {
            onChangeToolBar(item, index) {
                if(this.selectItemIndex == index){
                    return
                }
                this.selectItemIndex = index
                this.$emit('changeToolBar', item.componentName)
            },
            pushFragment(index) {
                this.onChangeToolBar(this.toolBarData[index], index)
            }
        },
        name: "tool-bar"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .tool-bar {
        height: 46px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
        border-top: 1px solid #e5e5e5;

        &-item {
            padding: 4px 12px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-img {
                width: 22px;
                height: 22px;
            }

            &-name {
                font-size: $font-size-medium;
                margin-top: 5px;
            }
        }
    }
</style>
