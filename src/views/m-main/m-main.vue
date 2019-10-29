<template>
    <div class="m-main">
        <div class="component-wrapper">
            <!-- 动态组件 -->
            <component :is="currentComponent"></component>
        </div>
        <div class="tool-bar-wrapper">
            <tool-bar @changeToolBar="onChangeComponent"></tool-bar>
        </div>
    </div>
</template>

<script>
    import ToolBar from '@/components/tool-bar/tool-bar.vue'
    import Home from './home/home.vue'

    export default {
        data() {
            return {
                currentComponent: 'home'
            }
        },
        methods: {
            onChangeComponent(componentName) {
                this.currentComponent = componentName
            }
        },
        components: {
            ToolBar,
            Home,
            Shopping: () => import('./shopping/shopping.vue'), // 异步组件的引入方式
            My: () => import('./my/my.vue')
        },
        name: "m-main"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .m-main {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $color-background-d;
        .component-wrapper {
            height: 100%;
            flex: auto;
        }
    }
</style>
