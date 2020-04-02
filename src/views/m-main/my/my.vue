<template>
    <div class="my">
        <navigation-bar :isShowBack="false" pageName="我的"></navigation-bar>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        components: {
            NavigationBar
        },
        name: "my"
    }
</script>

<style lang="scss" scoped>
    .my {
        height: 100%;
    }
</style>
