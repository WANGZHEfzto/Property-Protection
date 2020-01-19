<template>
  <div class="about-container">
    <header-item/>
    <nav-bar/>
    <div class="about">
      <el-tabs tab-position="left" v-model="activeName">
        <el-tab-pane disabled name="first">
          <span slot="label"><svg-icon icon-class="about"/> 关于我们</span>
        </el-tab-pane>
        <el-tab-pane label="平台简介" name="second">
          <div class="main">
            <div class="part01">
              <div class="subtitle02"><p>平台简介</p></div>
              <div class="title">一、建设背景</div>
              <div class="content">
                为全面落实《中华人民共和国促进科技成果转化法（2015 年修订）》、《实施
                <促进科技成果转化法>若干规定》、《促进科技成果转移转化行动方案》国家科技成果转移转化工作“三部曲”战略部署，以及中国电子科技集团公司（以下简称中国电科）
                  《加强科技创新的若干意见（试行）》和《中国电子科技集团公司促进科技成果转化办法》的相关要求，深入贯彻落实国家创新驱动发展战略，充分发挥中国电科国家科技创新主力军作用，打造示范性技术成果转移转化平台——中国电科技术成果转移
                  转化信息及交易平台（以下简称平台），着力推荐科技创新、科技成果转移转化及产业发展，助力中国电科加快建设世界一流创新型领军企业。为此提出建设技术成果转移转化信息交易平台的总体规划与设想。
              </div>
            </div>
            <div class="part02">
              <div class="title">二、建设目标</div>
              <div class="content">
                结合集团公司科技成果的管理现状和积累，依托线上信息平台和先下服务资源，发挥市场对于资源的引导和配置作用，对集团内外创新要素进行整合和优化，盘活科技成果资产，打造资源聚集、协同创新、服务体系健全、专业能力过硬的专注科技成果管理与服务的工作
                平台，为提升中国电科科技成果转移转化水平提供有力支撑。
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="联系我们" name="third"> 
          <div class="main">
            <div class="subtitle02"><p>联系我们</p></div>
            <div class="map">
              <img :src="infoList.src" alt=""/>
            </div>
            <div class="tel">
              <p><b>地址：</b>{{infoList.dz}}</p>
              <p><b>邮编：</b>{{infoList.yb}}</p>
              <p><b>电话：</b>{{infoList.dh}}</p>
              <p><b>电子邮箱：</b>{{infoList.email}}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer-item/>
  </div>
</template>

<script>
  import HeaderItem from '../components/HeaderItem'
  import FooterItem from '../components/FooterItem'
  import NavBar from '../components/NavBar'
  import { aboutList } from '@/api/search.js'
  export default {
    name: 'news',
    components: {
      HeaderItem,
      FooterItem,
      NavBar
    },
    data() {
      return {
        activeName: 'second',
        infoList: {
          dz: '北京市海淀区四道口北街36号院4号楼',
          yb: '100086',
          dh: '010-60840271',
          email: 'zhiyi@cetc.com.cn',
          src: require('./address.png')
        }
      }
    },

    mounted() {
      // this.getList()
    },

    methods: {
      getList() {
        aboutList().then(res => {
          this.infoList = res.content
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .about-container {
    width: 100%;
    height: 100%;
    background-color: #f3f3f3;
    .about {
      width: 1200px;
      height: 700px;
      margin: 20px auto 0 auto;
      background-color: #fff;
      .subtitle01 {
        width: 245px;
        height: 50px;
        padding-top: 15px;
        padding-left: 30px;
        font-size: 18px;
        font-weight: bold;
        line-height: 50px;
      }
      .subtitle02 {
        float: right;
        height: 50px;
        font-size: 20px;
        font-weight: bold;
        color: #1793ff;
        line-height: 50px;
        background-color: #f3f3f3;
        text-align: center;
        p {
          width: 915px;
          height: 50px;
          margin: 0px 0px 0px 20px;
          padding: 0px 0px 0px 20px;
          background-color: #fff;
        }
      }
      .el-tabs--left {
        height: 100%;
        .el-tabs__header {
          width: 245px;
          height: 100%;
          margin: 0px;
          .el-tabs__nav-wrap {
            width: 245px;
            .el-tabs__nav-scroll {
              .el-tabs__nav {
                width: 245px;
                .el-tabs__active-bar {
                  width: 0;
                }
                .el-tabs__item {
                  height: 56px;
                  line-height: 56px;
                  background-color: #f3f3f3;
                  border: 1px solid #fff;
                  text-align: center;
                  font-size: 16px;
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                  &.is-active {
                    color: #fff;
                    background-color: #1793ff;
                  }
                }
              }
            }
          }
        }
        .el-tabs__content {
          background-color: #f3f3f3;
          height: 100%;
          .el-tab-pane {
            background-color: #fff;
            height: 100%;
            margin-left: 20px;
            .main {
              margin: 0;
              height: auto;
              padding: 0 20px 0;
              .part01, .part02 {
                .title {
                  padding-top: 10px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #3e3a39;
                  margin-bottom: 20px;
                }
                .content {
                  font-size: 14px;
                  color: #727171;
                  line-height: 30px;
                }
              }
              .map {
                width: 100%;
                height: 500px;
                border: 1px solid #d1d1d1;
                margin-bottom: 20px;
                img {
                  width: 100%;
                  height: 450px;
                }
              }
              .tel {
                margin-bottom: 50px;
                p {
                  margin-bottom: 10px;
                  padding: 0;
                  margin-top: 0;
                  font-size: 14px;
                  color: #727171;
                  b {
                    color: #3e3a39;
                  }
                }
              }
            }
          }
        }
      }
      #tab-first {
        background-color: #fff;
        font-size: 18px;
        /*font-weight: bold;*/
        color: #000;
        text-align: left;
        padding-left: 63px;
      }
    }
  }
</style>
