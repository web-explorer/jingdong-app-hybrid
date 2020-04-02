<template>
    <span class="direct">直营</span>
</template>

<script>
    export default {
        name: "direct"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .direct {
        padding: 2px 4px;
        font-size: $font-size-small;
        color: #fff;
        background-color: $color-text-price;
        border-radius: 2px;
        margin-right: 2px;
    }
</style>
