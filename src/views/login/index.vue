<template>
  <div class="login-container">
    <header-item/>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <p class="login-title">用户登录</p>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="密 码"></el-input>
        <!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
      </el-form-item>
      <el-form-item prop="identify">
        <el-input name="identify"
                  type="text"
                  v-model="loginForm.identify"
                  autoComplete="on"
                  :style="{width:'50%'}"
                  placeholder="验证码"></el-input>
        <div class="verify-box" @click="refreshCode">
          <SIdentify :identify-code="identifyCode" :content-width="108"
                     :content-height="40" @click.native="refreshCode"></SIdentify>
        </div>
      </el-form-item>
      <el-form-item class="btn-login">
        <el-button style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <el-form-item class="btn-register">
        <el-button style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
      <div class="login-footer">
        <input type="checkbox"> &nbsp;保存用户
        <a @click="handleForgetAccount">忘记密码</a>
      </div>
    </el-form>
    <div class="footer">
      <footer-item/>
    </div>
  </div>
</template>

<script>
  import { isvalidUsername } from '@/utils/validate'
  import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
  import { login, refreshIdCode } from '@/api/login'
  import { mapGetters, mapMutations } from 'vuex'
  import SIdentify from '../components/Identify'
  import encryptCookie from '@/utils/encryptCookie'

  export default {
    name: 'login',
    components: {
      FooterItem,
      HeaderItem,
      SIdentify
    },
    mounted() {
      this.refreshCode()
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        // if (!isvalidUsername(value)) {
        //   callback(new Error('请输入正确的用户名'))
        // } else {
        //   callback()
        // }
        callback()
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      const validateIdentify = (rule, value, callback) => {
        if (!this.loginForm.identify) {
          callback(new Error('请输入验证码'))
        } else if (this.identifyCode.toLocaleLowerCase() != this.loginForm.identify.toLocaleLowerCase()) {
          callback(new Error('验证码错误'))
        } else {
          this.loginForm.identifyCode = this.identifyCode
          callback()
        }
      }
      return {
        identifyCode: '',
        loginForm: {
          username: '',
          password: '',
          identify: '',
          identifyCode: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePass }],
          identify: [{ required: true, trigger: 'blur', validator: validateIdentify }]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      refreshCode() {
        refreshIdCode().then(res => {
          this.identifyCode = res.content
        })
      },
      // showPwd() {
      //   if (this.pwdType === 'password') {
      //     this.pwdType = ''
      //   } else {
      //     this.pwdType = 'password'
      //   }
      // },
      ...mapMutations({
        setRegInfo: 'SET_REGINFO'
      }),
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(res => {
              this.loading = false
              this.identifyCode = ''

              var usercontent = {}
              usercontent['username'] = res.username
              usercontent['userid'] = res.userId
              usercontent['isadmin'] = res.isadmin
              usercontent['usertype'] = res.usertype
              usercontent['email'] = res.email
              usercontent['company2c'] = res.company2c
              if (res.concern) {
                usercontent['concern'] = res.concern
              } else {
                usercontent['concern'] = ''
              }
              encryptCookie.setAllKeysCookie(usercontent, 60 * 60 * 24)

              // this.$cookies.set('username', res.username, 60 * 60 * 24)
              // this.$cookies.set('userid', res.userId, 60 * 60 * 24)
              // this.$cookies.set('isadmin', res.isadmin, 60 * 60 * 24)
              // this.$cookies.set('usertype', res.usertype, 60 * 60 * 24)
              // this.$cookies.set('usertype', res.usertype, 60 * 60 * 24)
              // this.$cookies.set('email', res.email, 60 * 60 * 24)
              // this.$cookies.set('company2c', res.company2c, 60 * 60 * 24)
              // if (res.concern) {
              //   this.$cookies.set('concern', res.concern, 60 * 60 * 24)
              // } else {
              //   this.$cookies.set('concern', [], 60 * 60 * 24)
              // }
              if (res.regInfo === '0') {
                this.setRegInfo('0')
                this.$router.push({ path: '/user/usercenter' })
                this.$nextTick(() => {
                  location.href = '/#/user/usercenter'
                  location.reload()
                })
              } else {
                this.$router.push({ path: '/index' })
                this.$nextTick(() => {
                  location.href = '/#/index'
                  location.reload()
                })
              }
            }).catch((ex) => {
              this.loading = false
              this.$message({
                customClass: 'common-messagebox',
                message: ex.errorMessage,
                type: 'error'
              })
              this.refreshCode()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      handleRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      handleForgetAccount() {
        this.$router.push({
          path: `/forget-account`
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-image: url('./bg1.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #00174b;
    .login-form {
      width: 390px;
      height: 404px;
      position: absolute;
      left: 0;
      right: 0;
      top: 82px;
      bottom: 106px;
      margin: auto;
      background-color: #dce1ed;
      border-radius: 5px;
      padding: 28px !important;
      .login-title {
        font-size: 20px;
        color: #0071d3;
        margin-top: 0px;
      }
      .el-form-item {
        background-color: #fff;
        margin-bottom: 28px;
        border: none;
        border-radius: 5px;
        .el-form-item__content {
            line-height: 30px;
          // line-height: initial;
          .el-input {
            height: 40px;
            width: 85%;
            display: inline-block;
            input {
              height: 40px;
              padding: 5px 5px 5px 14px;
              background: transparent;
              border: 0px;
              -webkit-appearance: none;
              &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
                -webkit-text-fill-color: #737779 !important;
              }
            }
            .el-input__inner {
              color: #737779;
              &::placeholder {
                color: #737779;
                font-size: 14px;
              }
            }
          }
        }
      }
      //登录 注册按钮
      .el-button {
        color: #fff;
        font-size: 16px;
        padding: 9px 20px;
      }
      .btn-login .el-button {
        background-color: #0071d3;
      }
      .btn-register {
        margin-bottom: 10px;
        .el-button {
          background-color: #ffa800;
        }
      }
      .login-footer {
        font-size: 12px;
        color: #737779;
        a {
          float: right;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #b0b0b0;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      .svg-icon[data-v-5d4549d3] {
        height: 1.5em;
        width: 1.25em;
      }
    }
    // .show-pwd {
    //   position: absolute;
    //   right: 10px;
    //   top: 7px;
    //   font-size: 16px;
    //   color: $dark_gray;
    //   cursor: pointer;
    //   user-select:none;
    // }
    .footer {
      width: 100%;
      position: absolute;
      bottom: 0
    }

    .verify-box {
      width: 40%;
      float: right;
      height: 40px;
      cursor: pointer;
    }
  }
</style>
