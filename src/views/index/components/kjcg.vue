<template>
  <div class="kjcg-container">
    <div class='kjcg-main'>
      <div class='kjcg-title'>
        <div class='gxzx-t' @click="goPage('')">科技成果</div>
        <div class='gxzx-b'></div>
        <div class='gxzx-e'>Scientific and Technological Achievements</div>
      </div>
      <div class="floor02-tabs eltabs" v-loading="loading">
        <el-tabs v-model="activeName1" @tab-click="getProduct">
          <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab, i) in tabs" :key="i">
            <div class="tab">
              <div class="tab-1" v-for="(item,index) in searchList" :key="index">
                <img :src="item.src" alt="" v-if='item.src'>
                <img src="../imgs/default.png" alt="" v-if="!item.src">
                <div>
                  <div class="t-title no-wrap" @click="goProduct(item)">{{item.title}}</div>
                  <p>申请号：{{item.sqh}}</p>
                  <p>申请人：{{item.sqr}}</p>
                  <p>申请日期：{{item.sqd}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <br style='clear:both'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'kjcg',
    props: {

    },
    data() {
      return {
        loading: false,
        activeName1: '专利信息',
        tabs: [
          { label: '专利信息', name: '专利信息' },
          { label: '软著信息', name: '软著信息' },
          { label: '科技成果信息', name: '科技成果信息' },
          { label: '专利组合信息', name: '专利组合信息' }
        ],
        searchList: [
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/1.png')
          },
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/2.png')
          },
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/3.png')
          },
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/4.png')
          },
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/2.png')
          },
          {
            title: '一种新型雨伞',
            sqh: '12345567',
            sqr: 'XXXXXXXXXXXXXXXXXXXXX公司',
            sqd: '2019-07-01',
            src: require('../imgs/3.png')
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      getProduct() {},
      goProduct() {}
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:18px;
  $fontSizeMini:14px;
  $color1:#4e4e4e;
  $color2:#8a8989;
  .kjcg-container {
    height:auto;
    // background:url('../imgs/kjcg.jpg') no-repeat;
    background-size:cover;
    // background-color: #f6f6f6;
    .kjcg-main{
      width:1200px;
      height:auto;
      margin:0 auto;
      padding:0px 10px 45px 10px;
      position: relative;
      overflow: hidden;
      .kjcg-title{
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
      .floor02-tabs {
        
        .tab {
          width: calc(100% + 20px);
          height: auto;
          display: flex;
          flex-wrap: wrap;
          padding: 0 10px;
          .tab-1 {
            &:hover {
              transition: all .4s linear 0s;
              // background-color: #0071d3;
              box-shadow: 0px 0px 10px 3px #b2d1eb;
              // color: #fff;
              a {
                background-color: white;
              }
              .t-title {
                // color: #fff;
                cursor: pointer;
              }
            }
            width: 581px;
            height: 150px;
            background-color: white;
            margin-top: 20px;
            &:nth-child(2n+1) {
              margin-right: 18px;
            }
            img {
              margin-left: 20px;
              margin-top: 20px;
              height: 110px;
              width: 194px;
            }
            div {
              width: 350px;
              float: right;
              .t-title {
                margin-top: 25px;
                color: #0071d3;
                margin-bottom: 20px;
                font-weight: bold;
              }
              p {
                font-size: 14px;
                line-height: 14px;
                margin-top: 12px;
                margin-bottom: 0px;
                b {
                  font-weight: normal;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
