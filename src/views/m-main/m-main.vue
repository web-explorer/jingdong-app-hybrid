<template>
    <div class="m-main">
        <div class="component-wrapper">
            <!-- 动态组件 -->
            <component :is="currentComponent"></component>
        </div>
        <div class="tool-bar-wrapper">
            <tool-bar ref="toolBar" @changeToolBar="onChangeComponent"></tool-bar>
        </div>
    </div>
</template>

<script>
    import ToolBar from '@/components/tool-bar/tool-bar.vue'
    import Home from './home/home.vue'

    export default {
        data() {
            return {
                currentComponent: 'Home'
            }
        },
        methods: {
            onChangeComponent(componentName) {
                this.currentComponent = componentName
            },
            pushFragment() {
                let componentIndex = this.$route.params.componentIndex
                if (componentIndex === undefined) {
                    return
                } else {
                    this.$refs.toolBar.pushFragment(componentIndex)
                }
            }
        },
        activated() {
            this.pushFragment()
        },
        components: {
            ToolBar,
            Home,
            Shopping: () => import(/* webpackChunkName: "shopping" */ './shopping/shopping.vue'), // 异步组件的引入方式
            My: () => import(/* webpackChunkName: "My" */ './my/my.vue')
        },
        name: "m-main"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .m-main {
        width: 100%;
        height: 100%;
        background-color: $color-background-d;
        position: absolute;
        .component-wrapper {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 46px;
            left: 0;
        }
        .tool-bar-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
</style>
