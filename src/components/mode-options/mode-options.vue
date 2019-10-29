<template>
    <div class="mode-options">
        <a v-for="(modeOption, index) in modeOptions" :key="index" :href="modeOption.linkUrl" class="mode-options-item">
            <img class="mode-options-item-img" :src="modeOption.imgUrl">
            <p class="mode-options-item-title">{{modeOption.title}}</p>
        </a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                modeOptions: [
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/jingDongChaoShi.png'),
                        title: '京东超市'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/haiTunQuanQiu.png'),
                        title: '海屯全球'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/jingDongFuShi.png'),
                        title: '京东服饰'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/jingDongShengXian.png'),
                        title: '京东生鲜'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/jingDongDaoJia.png'),
                        title: '京东到家'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/chongZhiJiaoFei.png'),
                        title: '充值缴费'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/jingDongPinGou.png'),
                        title: '9.9元拼'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/lingJuan.png'),
                        title: '领劵'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/zhuanQian.png'),
                        title: '赚钱'
                    },
                    {
                        linkUrl: 'javascript:;',
                        imgUrl: require('@/common/images/quanBu.png'),
                        title: '全部'
                    }
                ]
            }
        },
        name: "mode-options"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .mode-options {
        display: flex;
        flex-wrap: wrap;
        padding-top: 5px;
        padding-bottom: 5px;
        background-color: #fff;
        &-item {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 5px;
            padding-bottom: 5px;
            &-img {
                width: 40px;
                height: 40px;
            }
            &-title {
                margin-top: 5px;
                font-size: $font-size-small;
            }
        }
    }
</style>
