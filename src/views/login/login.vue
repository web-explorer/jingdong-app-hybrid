<template>
    <div class="login">
        <navigation-bar :navBarStyle="navBarStyle" @back="onBack" pageName="登录"></navigation-bar>
        <div class="login-content">
            <div class="form-group">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <div class="form-group">
                <input v-model="password" type="password" placeholder="密码">
            </div>
        </div>
        <div class="login-footer">
            <div @click="login" class="login-footer-login">
                <span>登录</span>
            </div>
            <div class="login-footer-register" @click="goRegister">注册新用户</div>
        </div>
    </div>
</template>

<script>
    import NavigationBar from '@/components/navigation-bar/navigation-bar.vue'

    export default {
        data() {
            return {
                navBarStyle: {
                    backgroundColor: '#fff'
                },
                username: '',
                password: ''
            }
        },
        methods: {
            goRegister() {
                this.$router.push({
                    name: 'register',
                    params: {
                        jumpType: 1
                    }
                })
            },
            login() {
                if (!this.username) {
                    alert('用户名不能为空！');
                    return
                }
                if (!this.password) {
                    alert('密码不能为空！');
                    return
                }
            },
            onBack() {
                this.$router.back()
            }
        },
        components: {
            NavigationBar
        },
        name: "login"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .login {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #fff;
        &-content {
            .form-group {
                margin-top: 10px;
                padding: 5px;
                border-bottom: 1px solid #e5e5e5;
                input {
                    font-size: $font-size-large;
                    line-height: 24px;
                    border: none;
                    width: 100%;
                }
            }
        }
        &-footer {
            margin-top: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
            &-login {
                width: 80%;
                height: 46px;
                border-radius: 23px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: $font-size-medium-m;
                background-color: #d81e06;
            }
            &-register {
                margin-top: 5px;
                align-self: flex-end;
                margin-right: 5px;
                padding: 5px;
                font-size: $font-size-medium;
                color: $color-text-l;
            }
        }
    }
</style>