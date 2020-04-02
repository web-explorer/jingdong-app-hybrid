<template>
    <div class="shopping">
        <navigation-bar :isShowBack="false" pageName="购物车"></navigation-bar>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        components: {
            NavigationBar
        },
        name: "shopping"
    }
</script>

<style lang="scss" scoped>
    .shopping {
        height: 100%;
    }
</style>
