<template>
  <div class="header-container">
    <div class="header-part1">
      <div class="part1-1" v-if="!isLogin">
        <a href="http://www.bjippc.cn/login.html">登录</a> /
        <a href="http://www.bjippc.cn/register.html">注册</a>
      </div>
      <div class="part1-1" v-if="isLogin">|
        <a href="">注销</a>
        <a href="" class="manager">后台管理</a>
      </div>
      <div class="part1-2">
        <a href="http://www.bjippc.cn/info/infodetails.html?id=INFO3992072f-c272-4014-b5ca-08ebdf736eda" target="_blank">中心介绍</a> &nbsp;|
        <a href="http://www.bjippc.cn/contactus.html">联系我们</a>
      </div>
    </div>
    <div class="header-part2">
      <a href="http://www.bjippc.cn/index.html" class="head_logo">
        <img src="../assets/logo-1.png" alt="">
      </a>
    </div>
    <div class="header-part3">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="#0296eb" text-color="#fff" active-text-color="#fff" menu-trigger="hover">
        <el-menu-item index="index">首页</el-menu-item>
            <el-submenu index="newsA">
              <template slot="title">快速预审</template>
              <el-menu-item index="news">专利申请</el-menu-item>
              <el-menu-item index="etsi">专利确权</el-menu-item>
              <el-menu-item index="etsi">专利权评价报告</el-menu-item>
            </el-submenu>
            <el-submenu index="newsB">
              <template slot="title">快速维权</template>
              <el-menu-item index="qqpd">侵权判定咨询</el-menu-item>
              <el-menu-item index="wqyz">维权援助</el-menu-item>
              <el-menu-item index="jftj">纠纷调解</el-menu-item>
              <el-menu-item index="ywzx">我的业务</el-menu-item>
              <el-menu-item index="zlqqplk_search">专利侵权判例库</el-menu-item>
              <el-menu-item index="admin">管理页面</el-menu-item>
            </el-submenu>
            <el-submenu index="product">
              <template slot="title">综合服务</template>
              <el-menu-item index="patent">自助撰写</el-menu-item>
              <el-menu-item index="patentPortfolio">复审无效库</el-menu-item>
              <el-menu-item index="soft">裁判文书库</el-menu-item>
              <el-menu-item index="product">法律法规库</el-menu-item>
            </el-submenu>
            <el-submenu index="userNav">
              <template slot="title">产业导航</template>
              <el-menu-item index="cgdj">产业专题库</el-menu-item>
              <el-menu-item index="cgpj">专利导航发布</el-menu-item>
              <el-menu-item index="jzpg">专利项目展示</el-menu-item>
            </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '',
        isLogin: false
      }
    },
    computed: {},
    methods: {
      handleSelect(index) {
        this.$router.push({
          path: `/${index}`
        })
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .header-container {
    width:100%;
    height: auto;
    .header-part1{
      width:1200px;
      margin:0 auto;
      line-height: 36px;
      height: 36px;
      font-size: 14px;
      background: #ffffff;
      overflow: hidden;
      .part1-1{
        float: left;
        a{
          color:#333;
          &:hover{
            color:#1677d7;
          }
        }
        .manager{
          margin-left: 10px;
          color:#0066c7;
        }
      }
      .part1-2{
        width: 232px;
        float: right;
        a{
          color:#333;
          line-height: 18px;
          padding-left: 25px;
          width: 82px;
          display: inline-block;
          margin-left: 5px;
          &:hover{
            color:#1677d7;
          }
          &:first-child {
            background: url(../assets/css_sprites.png) -49px -10px;
          }
          &:last-child {
              background: url(../assets/css_sprites.png) -10px -86px;
          }
        }
      }
    }
    .header-part2{
      height: 140px;
      padding-top: 38px;
      background: url(../assets/background.jpg) bottom center no-repeat;
      width: 100%;
      .head_logo{
        width: 650px;
        height: 88px;
        display: block;
        margin-left: 110px;
      }
    }
    .header-part3{
      background-color: #0296eb;
    }
  }
</style>
