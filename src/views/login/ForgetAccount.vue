<template>
  <div class="demoIndex forgetAccount-container calendar-list-container">
    <header-item/>
    <div class="forgetAccount-form">
      <p class="forgetAccount-title">找回密码！</p>
      <el-form ref="forgetAccountForm" :model="forgetAccountForm" label-width="100px" :rules="forgetAccountRules">
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="forgetAccountForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="mailpassword" class="chkEmail">
          <el-input v-model="forgetAccountForm.mailpassword"></el-input>
          <el-button @click.prevent="getVerifyCode()" :loading="verifyLoading">{{verifyLoading?'获取中':'获取验证码'}}</el-button>
        </el-form-item>
        <el-form-item label="重置密码" prop="password1">
          <el-input type="password" v-model="forgetAccountForm.password1"></el-input>
          <!-- <span>请输入6位以上英文、数字或特殊字符组合</span> -->
        </el-form-item>
        <el-form-item label="再次输入" prop="password2">
          <el-input type="password" v-model="forgetAccountForm.password2"></el-input>
        </el-form-item>
        <div class="forgetAccount-button">
          <el-button @click="regConfirm" size="medium" :loading="confirmLoading">确认</el-button>
        </div>

      </el-form>
    </div>
    <footer-item/>
  </div>
</template>

<script>
  import { getVerifyCode, submitForgetPwdConfirm } from '@/api/register'
  import HeaderItem from '../components/HeaderItem'
  import FooterItem from '../components/FooterItem'

  export default {
    name: 'forget-account',
    components: {
      HeaderItem,
      FooterItem
    },
    data() {
      //   var accountPass = (rule, value, callback) => {
      //     if (value === '') {
      //       callback(new Error('用户名不能为空'))
      //     } else if (!/[0-9a-zA-Z]+/.test(value)) {
      //       callback(new Error('用户名必须是字母或字母与数字组合'))
      //     } else {
      //       callback()
      //     }
      //   }
      var mailPass = (rule, value, callback) => {
        if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          callback(new Error('请按格式正确填写邮箱'))
        } else {
          callback()
        }
      }
      var password1Pass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          this.$refs.forgetAccountForm.validateField('password2')
          callback()
        }
      }
      var password2Pass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.forgetAccountForm.password1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        confirmLoading: false,
        verifyLoading: false,
        forgetAccountForm: {
          account: '',
          mail: '',
          mailpassword: '',
          password1: '',
          password2: ''
        },
        agree: false,
        forgetAccountRules: {
          //   account: [
          //     { required: true, validator: accountPass, trigger: 'change' }
          //   ],
          mail: [
            { required: true, validator: mailPass, trigger: 'change' }
          ],
          mailpassword: [
            { required: true, message: '请输入邮箱验证码', trigger: 'change' }
          ],
          password1: [
            { required: true, validator: password1Pass, trigger: 'change' }
          ],
          password2: [
            { required: true, validator: password2Pass, trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      getVerifyCode: function() {
        this.verifyLoading = true
        getVerifyCode(this.forgetAccountForm.mail, 'forgetpwd').then(res => {
          this.verifyLoading = false
          this.$message({
            customClass: 'common-messagebox',
            message: '验证码已发送至您邮箱',
            type: 'success'
          })
        }).catch(ex => {
          this.verifyLoading = false
          this.$message({
            customClass: 'common-messagebox',
            message: ex.errorMessage,
            type: 'error'
          })
        })
      },
      goRules: function() {

      },
      clearForm: function() {
        this.forgetAccountForm = {
          account: '',
          mail: '',
          mailpassword: '',
          password1: '',
          password2: '',
          phone: ''
        }
      },
      regConfirm: function() {
        this.$refs['forgetAccountForm'].validate((valid) => {
          if (!valid) return
          else {
            this.confirmLoading = true
            submitForgetPwdConfirm(this.forgetAccountForm).then(res => {
              this.confirmLoading = false
              const userid = res.content
              this.$message({
                customClass: 'common-messagebox',
                message: '密码修改成功',
                type: 'success'
              })
              // this.$router.push({ path: '/forgetAccount-success', query: { userid: userid }})
              this.$router.push({ path: '/login', query: { userid: userid }})
            }).catch((e) => {
              this.confirmLoading = false
              this.$message({
                customClass: 'common-messagebox',
                message: e.errorMessage,
                type: 'error'
              })
              // this.clearForm();
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .forgetAccount-container {
    width: 100%;
    height: 100%;
    background-image: url('../register/reg-bg.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
    .forgetAccount-form {
      width: 860px;
      height: 485px;
      margin: 60px auto;
      float: none;
      background-color: #fff;
      .forgetAccount-title {
        font-size: 24px;
        margin-bottom: 50px;
        margin-top: 0;
        padding: 45px 0px 0px 50px;
      }
      .el-form {
        .el-button {
          padding: 12px 19px;
          background-color: #ffa800;
          color: #fff;
          border: none;
        }
        .el-form-item__content > span {
          margin-left: 40px;
          color: red;
          font-size: 12px;
        }
        .el-form-item {
          width: 500px;
          margin-left: auto;
          margin-right: auto;
          .el-form-item__label {
            text-align: left;
            font-size: 14px;
            line-height: 40px;
          }
          .el-input {
            width: 400px;
          }
          .el-form-item__error {
            top: 10px;
            left: 420px;
            color: red;
            width: 150px;
          }
        }

        .forgetAccount-button {
          width: 200px;
          margin-left: auto;
          margin-right: auto;
          button {
            width: 200px;
            background-color: #0071d3;
            color: #fff;
            border-radius: 5px;
            font-size: 18px;
            padding: 10px 50px;
          }
        }
      }
      .chkEmail .el-input {
        width: 286px !important;
      }
    }
  }

</style>
