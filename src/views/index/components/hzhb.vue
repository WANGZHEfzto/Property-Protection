<template>
  <div class="hzhb-container">
    <div class='hzhb-main'>
      <div class='hzhb-title'>
        <div class='gxzx-t' @click="goPage('')">合作伙伴</div>
        <div class='gxzx-b'></div>
        <div class='gxzx-e'>Cooperative Partner</div>
      </div>
      <br style='clear:both'/>
      <div class="hzhb-m">
        <el-carousel indicator-position="none" arrow="" :interval="4000" height="70px">
          <el-carousel-item>
            <div v-for="(img,index) in hbList" :key='index' class="item"><a :href="img.url" target="_blank"><img
              :src="img.src" alt=""/></a></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hzhb',
    props: {

    },
    data() {
      return {
        hbList: [
          {
            src: require('../imgs/logomini.png'),
            url: 'http://www.cetc.com.cn/'
          },
          {
            src: require('../imgs/dkyjy.png'),
            url: 'http://isa.cetc.com.cn/'
          },
          {
            src: require('../imgs/zgc.png'),
            url: 'http://zgcgw.beijing.gov.cn/'
          },
          {
            src: require('../imgs//zgccydj.png'),
            url: 'http://www.z-innoway.com/home'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:18px;
  $fontSizeMini:14px;
  $color1:#4e4e4e;
  $color2:#8a8989;
  .hzhb-container {
    height:auto;
    // background:url('../imgs/hzhb.jpg') no-repeat;
    background-size:cover;
    // background-color: #f6f6f6;
    .hzhb-main{
      width:1200px;
      height:auto;
      margin:0 auto;
      padding:0px 10px 45px 10px;
      position: relative;
      overflow: hidden;
      .hzhb-title{
        text-align: center;
        .gxzx-t{
          font-size: 36px;
          color:#3e3a39;
          &:hover{
            cursor: pointer;
          }
        }
        .gxzx-b{
          margin:15px auto;
          width:80px;
          height: 1px;
          border-bottom: 1px solid #4548af
        }
        .gxzx-e{
          font-size: $fontSize;
          color:#9c9c9c
        }
        &:hover {
          .gxzx-t{
            cursor: pointer;
            color: #4548af;
          }
          .gxzx-e{
            color: #4548af;
          }
        }
      }
      .hzhb-m{
        margin-top:35px;
        .item{
          width: 283px;
          height: 100%;
          float: left;
          background: #fff;
          margin: 0 8px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;

          &:first-child {
            margin-left: 0
          }

          &:last-child {
            margin-right: 0
          }

          img {

          }

          &:hover {
            transition: all .4s linear 0s;
            box-shadow: 0px 0px 8px 3px #d2d2d2;
          }
        }
      }
    }
  }
</style>
