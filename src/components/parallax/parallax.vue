<template>
    <div class="parallax" @scroll="onScroll">
        <div class="parallax-slow" :style="{top: slowTop}">
            <slot name="parallax-slow"></slot>
        </div>
        <div class="parallax-normal">
            <slot name="parallax-normal"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scrollTop: 0
            }
        },
        computed: {
            slowTop() {
                return this.scrollTop * 0.5 + 'px'
            }
        },
        methods: {
            onScroll(e) {
                let scrollTop = e.target.scrollTop
                this.scrollTop = scrollTop
                this.$emit('parallaxScroll', scrollTop)
            }
        },
        name: "parallax"
    }
</script>

<style lang="scss" scoped>
    .parallax {
        overflow-y: auto;
        &-slow {
            position: relative;
            z-index: 1;
        }
        &-normal {
            z-index: 2;
        }
    }
</style>