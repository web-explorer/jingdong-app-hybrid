<template>
    <span class="no-have">缺货</span>
</template>

<script>
    export default {
        name: "no-have"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .no-have {
        padding: 2px 4px;
        font-size: $font-size-small;
        color: #fff;
        background-color: $color-text-l;
        border-radius: 2px;
        margin-right: 2px;
    }
</style>
