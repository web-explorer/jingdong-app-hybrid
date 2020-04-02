<template>
    <div class="sort-options">
        <ul class="outer">
            <li class="outer-item" v-for="(option, index) in sortOptions" :key="index" :class="{'active': outerIndex == index}" @click="changOuter(index)">
                <span class="title">{{option.items[option.innerIndex].title}}</span>
                <span v-if="option.items.length > 1" class="caret" :class="{up: innerShow}"></span>
            </li>
        </ul>
        <div class="inner-wrapper" v-show="innerShow && sortOptions[outerIndex].items.length > 1">
            <ul class="inner">
                <li class="inner-item" v-for="(option, index) in sortOptions[outerIndex].items" :key="index" @click="changeInner(index)">
                    <span class="title">{{option.title}}</span>
                    <img v-if="sortOptions[outerIndex].innerIndex == index" src="./../../common/images/options-select.svg">
                </li>
            </ul>
            <div class="inner-bg"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sortOptions: [
                    {
                        innerIndex: 0,
                        items: [
                            {id: '0-0', title: '默认'},
                            {id: '0-1', title: '价格由高到低'},
                            {id: '0-2', title: '价格由低到高'}
                        ]
                    },
                    {
                        innerIndex: 0,
                        items: [
                            {id: '1-0', title: '有货优先'}
                        ]
                    },
                    {
                        innerIndex: 0,
                        items: [
                            {id: '2-0', title: '直营优先'}
                        ]
                    }
                ],
                outerIndex: 0,
                innerShow: false
            }
        },
        methods: {
            changOuter(index) {
                if (this.outerIndex == index) {
                    if (this.sortOptions[index].length != 1) {
                        this.innerShow = !this.innerShow
                    }
                } else {
                    this.outerIndex = index
                    this.$emit('sort', this.sortOptions[this.outerIndex].items[this.sortOptions[this.outerIndex].innerIndex].id)
                }
            },
            changeInner(index) {
                if (this.sortOptions[this.outerIndex].innerIndex != index) {
                    this.sortOptions[this.outerIndex].innerIndex = index
                }
                this.innerShow = false
                this.$emit('sort', this.sortOptions[this.outerIndex].items[this.sortOptions[this.outerIndex].innerIndex].id)
            }
        },
        name: "sort-options"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .caret {
        display: inline-block;
        width: 0;
        height: 0;
        border: 7px solid #f00;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom: none;
        transition: all .3s;
        margin-left: 5px;
    }
    .caret.up {
        transform: rotate(180deg);
    }
    .outer {
        height: 37.5px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #666;
        z-index: 100;
        &-item {
            padding: 0 10px;
            font-size: $font-size-medium;
            display: flex;
            align-items: center;
        }
        &-item.active {
            color: #f00;
        }
    }
    .inner-wrapper {
        background-color: #fff;
        .inner {
            &-item {
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    font-size: $font-size-medium;
                }
                img {
                    width: 18px;
                    height: 18px;
                }
            }
            &-item + .inner-item {
                border-top: 1px solid #666;
            }
        }
        .inner-bg {
            position: fixed;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, .4);
            z-index: 99;
        }
    }
</style>
