
<template>
  <div class="ETSIDetail-container">
    <header-item/>
    <nav-bar :active-index="activeIndex"/>
    <div class="detail">
      <div class="breadcrumb">
        <el-breadcrumb separator=">>">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/etsi' }">ETSI披露</el-breadcrumb-item>
          <el-breadcrumb-item>{{itemDetail.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="detail-main">
        <div class="part part01">
          <p class="part-title">ETSI披露详情</p>
        </div>
        <div class="part" v-for="item in List" :key="item.value">
          <p class="title">{{item.name}}</p>
          <div class="content">
            {{itemDetail[item.value]}}
          </div>
        </div>
      </div>
    </div>
    <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import NavBar from '../components/NavBar.vue'
import { searchETSIDetailById } from '@/api/search.js'

export default {
  name: 'ETSIDetail',
  components: {
    HeaderItem,
    FooterItem,
    NavBar
  },
  data() {
    return {
      activeIndex: 'etsi',
      itemDetail: {},
      List: [
        { name: 'Title', value: 'title' },
        { name: 'Application number', value: 'applicationNumber' },
        { name: 'Declaring companies', value: 'declaringCompanies' },
        { name: 'Publication number', value: 'publicationNumber' },
        { name: 'Declaration references', value: 'declarationReferences' },
        { name: 'IPR Disclosures', value: 'iprDisclosures' },
        { name: 'Patent office', value: 'patentOffice' },
        { name: 'Declaration dates', value: 'declarationDates' },
        { name: 'Essential to projects', value: 'essentialProjects' },
        { name: 'Non-essential to projects', value: 'nonEssentialToProjects' },
        { name: 'Essential to standards YES to ETSI FRAND license', value: 'yesToEtsiFrandLicense' },
        { name: 'Essential to standards NO to ETSI FRAND license', value: 'noToEtsiFrandLicense' },
        { name: 'Non-essential to standards', value: 'nonEssentialToStandards' }
      ]
    }
  },

  mounted() {
    this.getDetail()
  },

  computed: {

  },

  methods: {
    getDetail() {
      searchETSIDetailById({ id: this.$route.params.id }).then(res => {
        console.log(res)
        this.itemDetail = res.content.result
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ETSIDetail-container {
    background-color: #f3f3f3;
    height: auto;
    .detail {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      .breadcrumb {
        height: 36px;
        margin-top: 20px;
        .el-breadcrumb__inner {
          font-weight: normal;
          font-size: 12px;
        }
      }
      .detail-main {
        background-color: #fff;
        width: 100%;
        height: auto;
        .part {
          width: 1140px;
          margin-left: 32px;
          .title {
            font-size: 18px;
            margin: 0;
            padding-left: 20px;
            line-height: 56px;
            background-color: #f3f3f3;
          }
          .content {
            padding: 14px 20px 34px 20px;
            font-size: 14px;
            color: #727171;
            line-height: 40px;
            word-wrap: break-word;
          }
        }
        .part01 {
          width: 1140px;
          // height:355px;
          height: auto;
          margin-left: 32px;
          margin-bottom: 32px;
          .part-title {
            padding-left: 0;
            background-color: #fff;
            color: #0071d3;
            font-size: 24px;
            margin: 0;
            line-height: 64px;
            padding-top: 10px;
          }
          .part-img{
            width: 280px;
            height: 280px;
            float: left;
          }
          img {
            width: 280px;
            height: 280px;
          }
        }
      }
    }
  }
</style>
