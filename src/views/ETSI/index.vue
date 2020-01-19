<template>
  <div class="ETSI-container userCenterSearch">
    <header-item/>
    <nav-bar :active-index="activeIndex"/>
    <div class="ETSI">
      <div class="ETSI-main">
        <div class="main-t">
          <div class="title">
            <div class="t-i">检索条件</div>
          </div>
          <div class="main-t-m">
            <el-form ref="form" :model="listQuery">
              <el-form-item label="Application number">
                  <el-input v-model="listQuery.applicationNumber"></el-input>
              </el-form-item>
              <el-form-item label="Declaring companies">
                <el-input v-model="listQuery.declaringCompanies"></el-input>
              </el-form-item>
              <el-form-item label="Publication number">
                  <el-input v-model="listQuery.publicationNumber"></el-input>
              </el-form-item>
              <el-form-item label="Declaration references">
                  <el-input v-model="listQuery.declarationReferences"></el-input>
              </el-form-item>
              <el-form-item label="Title">
                  <el-input v-model="listQuery.title"></el-input>
              </el-form-item>
              <el-form-item label="IPR Disclosures">
                  <el-input v-model="listQuery.iprDisclosures"></el-input>
              </el-form-item>
              <el-form-item label="Patent office">
                  <el-input v-model="listQuery.patentOffice"></el-input>
              </el-form-item>
              <el-form-item label="Declaration dates">
                  <el-date-picker type="date" placeholder="选择日期" v-model="listQuery.declarationDates" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="Essential to projects">
                  <el-input v-model="listQuery.essentialProjects"></el-input>
              </el-form-item>
              <el-form-item label="Non-essential to projects">
                  <el-input v-model="listQuery.nonEssentialToProjects"></el-input>
              </el-form-item>
              <el-form-item label="Essential to standards YES to ETSI FRAND license">
                  <el-input v-model="listQuery.yesToEtsiFrandLicense"></el-input>
              </el-form-item>
              <el-form-item label="Essential to standards NO to ETSI FRAND license">
                  <el-input v-model="listQuery.noToEtsiFrandLicense"></el-input>
              </el-form-item>
              <el-form-item label="Non-essential to standards">
                  <el-input v-model="listQuery.nonEssentialToStandards"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn">
                <el-button class="btn1" @click="searchList">查询</el-button>
                <el-button class="btn2" @click="reset">重置</el-button>
            </div>
          </div>
        </div>
        <div class="main" v-loading="loadingETSI">
          <div class="l-c-l" v-for="(content,index) in dataList" :key="index"
                    @click="goDetail(content)">
            <!-- <div class="cg-l">
              <img :src="content.src" class="image" v-if="content.src">
              <img src="./img/default.png" class="image" v-if="!content.src">
            </div> -->
            <div class="cg-r">
              <div class="cg-r-1 no-wrap">
                {{content.title}}
              </div>
              <div class="cg-r-2">
                <b>patentOffice：</b>{{content.patentOffice}}
              </div>
              <div class="cg-r-3">
                <b>applicationNumber：</b>{{content.applicationNumber}}
              </div>
              <div class="cg-r-4">
                <b>declarationDates：</b>{{content.declarationDates}}
              </div>
              <div class="cg-r-5">
                <b>essentialProjects：</b><br>{{content.essentialProjects}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          v-show="total>0"
          :current-page.sync="startRow"
          :page-size="10"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '../components/HeaderItem.vue'
import FooterItem from '../components/FooterItem.vue'
import NavBar from '../components/NavBar.vue'
import { mapMutations } from 'vuex'
import { searchETSIList } from '@/api/search.js'
export default {
  name: 'ETSI',
  components: {
    HeaderItem,
    FooterItem,
    NavBar
  },
  data() {
    return {
      activeIndex: 'etsi',
      startRow: 1,
      pageRow: 10,
      total: 0,
      loadingETSI: false,
      checked: '*',
      dataList: [],
      typeList: [
        { label: '全部', value: '*' },
        { label: '专利', value: '专利' },
        { label: '软件著作', value: '软件著作' },
        { label: '其他科技成果', value: '其他科技成果' }
      ],
      listQuery: {
        message: ''
      }
    }
  },

  mounted() {
    this.getETSIList()
  },

  methods: {
    getETSIList() {
      this.listQuery.zxlx = this.activeName
      this.loadingETSI = true
      searchETSIList(this.listQuery, { startRow: this.startRow, pageRow: this.pageRow }).then((res) => {
        this.dataList = res.content.dataList
        this.total = res.content.totalSize
        this.loadingETSI = false
      })
    },
    checkItem(val) {
      this.checked = val
    },
    handleCurrentChange(val) {
      this.startRow = val
      this.getETSIList()
    },
    goDetail(ETSI) {
      const { href } = this.$router.resolve({
        path: `/ETSIdetail`,
        query: { id: ETSI.id }
      })
      window.open(href, '_blank')
    },
    searchList() {
      this.startRow = 1
      this.getETSIList()
    },
    reset() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .ETSI-container {
    width: 100%;
    height: auto;
    background-color: #f3f3f3;
    .ETSI {
      width: 1200px;
      height: auto;
      margin: 0px auto;
      .ETSI-main {
        background-color: #fff;
        padding:20px;
        .main-t{
          width:100%;
          height: auto;
          overflow: hidden;
          .title{
            // float: left;
            display: flex;
            justify-content: space-between;
            width:500px;
            height: 32px;
            line-height: 32px;
            .t-i{
              font-size:  16px;
              color: #3e3a39;
              width: 66px;
            }
            .item{
              font-size: 14px;
              color: #727171;
              white-space: nowrap;
              cursor: pointer;
              &.active{
                color:#245ea8;
              }
            }
          }
          .main-t-m{
            padding:20px 50px;
            .btn{
              text-align: center;
              margin-top:15px;
              .el-button{
                  padding:8px 20px;
                  font-size: 12px;
                  color:#3e3a39;
                  border-radius: 15px;
              }
              .btn1{
                  background-color: #0071d3;
                  color:#fff;
              }
              .btn2{
                  // background-color: #ffa800
                  background-color: #ffffff;
                  border:1px solid #d3cbcb;
              }
            }
          }
          .search{
            float: right;
          }
        }
        .main{
          .l-c-l {
            display: flex;
            margin-top: 20px;
            padding-top:20px;
            border-top: 1px dashed #aaa;
            cursor: pointer;
            &:first-child {
              border: none;
            }
            .cg-l {
              width: 214px;
              height: 214px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #efefef;
              .image {
                width: auto;
                height: auto;
                max-width: 214px;
                max-height: 214px;
              }
            }
            .cg-r {
              display: flex;
              margin-left: 20px;
              flex-direction: column;
              font-size: 14px;
              line-height: 32px;
              color: #727171;
              margin-top: -4px;
              // width:calc(100% - 250px);
              width:100%;
              .cg-r-1 {
                font-size: 16px;
                color: #0071d3;
                line-height: 26px;
                margin-bottom: 10px;
              }
              .cg-r-5 {
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
                height: auto;
                max-height: 90px;
              }

            }
          }
        }
      }
    }
    .pagination {
      width:100%;
      height: 80px;
      padding: 10px auto 40px auto;
      background-color: #fff;
      display: flex;
      .el-pagination {
        font-weight: normal;
        margin: 0px auto;
        padding-top: 25px;

      }
      .el-pager li, button {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        border-radius: 5px;
        border: 1px solid #d2d2d2;
        min-width: 0;
        padding: 0;
      }
    }
  }
</style>
