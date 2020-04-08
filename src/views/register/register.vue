<template>
    <div class="register">
        <navigation-bar :navBarStyle="navBarStyle" @back="onBack" pageName="注册"></navigation-bar>
        <div class="register-content">
            <div class="form-group">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <div class="form-group">
                <input v-model="password" type="password" placeholder="密码">
            </div>
            <div class="form-group">
                <input v-model="rePassword" type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="register-footer">
            <div @click="register" class="register-footer-register">
                <span>注册</span>
            </div>
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
              password: '',
              rePassword: ''
          }
        },
        methods: {
            register() {
                if (!this.username) {
                    alert('用户名不能为空！');
                    return
                }
                if (!this.password) {
                    alert('密码不能为空！');
                    return
                }
                if (!this.rePassword) {
                    alert('请确认密码！');
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
        name: "register"
    }
</script>

<style lang="scss" scoped>
    @import "./../../common/scss/variable";

    .register {
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
            justify-content: center;
            &-register {
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
        }
    }
</style>