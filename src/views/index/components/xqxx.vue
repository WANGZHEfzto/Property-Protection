<template>
  <div class="xqxx-container">
    <div class='xqxx-main'>
      <div class='xqxx-title'>
        <div class='gxzx-t' @click="goPage('')">需求信息</div>
        <div class='gxzx-b'></div>
        <div class='gxzx-e'>Requirement Information</div>
      </div>
      <div class="xqxx-m">
        <div class="clc" v-for="(item,index) in demandList" :key="index">
          <div class="t-title no-wrap">{{item.jsmc}}</div>
          <div class="detail-content">
            <div class="detail">
              <div class="detail-c no-wrap">需求人/公司：{{item.xqr}}</div>
              <div class="detail-c no-wrap">需求类别：{{item.xqlb}}</div>
              <div class="detail-c no-wrap">技术领域：{{item.jsly}}</div>
            </div>
            <div class="url">
              <a @click="goDemand(item)">查看详情 ></a>
            </div>
          </div>
        </div>
      </div>
      <br style='clear:both'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xqxx',
    props: {

    },
    data() {
      return {
        demandList: [
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
          },
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
          },
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
          },
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
          },
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
          },
          {
            jsmc: '需求专利详情',
            xqr: 'XXXXXXXXXXXXXXXXXXXXXXXXXXX公司',
            xqlb: '专利',
            jsly: 'XXXXXXX领域'
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
  .xqxx-container {
    height:auto;
    // background:url('../imgs/xqxx.jpg') no-repeat;
    background-size:cover;
    // background-color: #f6f6f6;
    .xqxx-main{
      width:1200px;
      height:auto;
      margin:0 auto;
      padding:0px 0px 45px 0px;
      position: relative;
      overflow: hidden;
      .xqxx-title{
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
      .xqxx-m{
        width:100%;
        margin-top:20px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .clc {
          // float: left;
          margin-top:20px;
          margin-left:20px;
          &:first-child,&:nth-child(4) {
            margin-left: 0
          }

          &:last-child {
            margin-right: 0
          }

          width: 386px;
          background-color: #fff;
          padding: 20px 25px;

          .t-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-bottom: 5px;
            font-weight: bold;
            line-height: 36px;
          }

          .detail-content {
            .detail {
              // width: 185px;
            }
          }

          .detail-c {
            line-height: 32px;
            font-size: 12px;
            // width: 185px;
          }

          .url {
            // width: 110px;
            line-height: 32px;
            padding-top: 10px;
            padding-left: 10px;

            a {
              padding: 5px 20px;
              border: 1px solid #0071d3;
              border-radius: 30px;
              color: #0071d3;
              font-size: 14px;
            }
          }

          &:hover {
            transition: all .4s linear 0s;
            background-color: #0071d3;
            box-shadow: 0px 0px 8px 3px #d2d2d2;
            color: #fff;

            a {
              background-color: white;
            }
          }
        }
      }
    }
  }
</style>
