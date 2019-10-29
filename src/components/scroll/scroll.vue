<template>
    <div class="scroll" ref="scroll">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props: {
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: []
            }
        },
        methods: {
            initScroll(){
                if(!this.$refs.scroll){
                    return
                }
                this.bScroll = new BScroll(this.$refs.scroll, {
                    click: this.click
                })
            },
            refresh() {
                this.bScroll && this.bScroll.refresh();
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
        },
        mounted() {
            setTimeout(() => {
                this.initScroll()
            }, 20);
        },
        name: "scroll"
    }
</script>

<style scoped>

</style>
