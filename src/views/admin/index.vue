<template>
  <div class="admin-container">
    <header-item/>
    <div class="admin-main">
        <div class="breadcrumb">
            <el-breadcrumb separator=">">
            <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
            <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
            <div class="left-part">
                <el-collapse v-model="activeNames">
                    <el-collapse-item :title="'待审核（'+dshCount+'）'" name="1">
                        <div @click="goPage('0','1')">侵权判定咨询 <span>( {{countList.qqpdzx_dsh}} )</span></div>
                        <div @click="goPage('0','2')">维权援助 <span>( {{countList.wqyz_dsh}} )</span></div>
                        <div @click="goPage('0','3')">纠纷调解 <span>( {{countList.jftj_dsh}} )</span></div>
                    </el-collapse-item>
                    <el-collapse-item :title="'审核中（'+shzCount+'）'" name="2">
                        <div @click="goPage('1','1')">侵权判定咨询 <span>( {{countList.qqpdzx_shz}} )</span></div>
                        <!-- <div @click="goPage('shz','wqyz')">维权援助 <span>( {{countList.shz.wqyz}} )</span></div> -->
                        <!-- <div @click="goPage('shz','jftj')">纠纷调解 <span>( {{countList.shz.jftj}} )</span></div> -->
                    </el-collapse-item>
                    <el-collapse-item :title="'已审核（'+yshCount+'）'" name="3">
                        <div @click="goPage('2','1')">侵权判定咨询 <span>( {{countList.qqpdzx_ysh}} )</span></div>
                        <div @click="goPage('2','2')">维权援助 <span>( {{countList.wqyz_ysh}} )</span></div>
                        <div @click="goPage('2','3')">纠纷调解 <span>( {{countList.jftj_ysh}} )</span></div>
                    </el-collapse-item>
                    <el-collapse-item title="查询统计" name="4">
                        <div @click="goPage1('al')">案量申请统计</div>
                        <div @click="goPage1('qqr')">请求人统计</div>
                        <div @click="goPage1('cyly')">产业领域统计</div>
                        <div @click="goPage1('qt')">其他统计</div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="right-part">
                <router-view/>
            </div>
        </div>
    </div>
    <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import { getNumList } from '@/api/search.js'
export default {
  name: 'admin',
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      activeNames: ['1', '2', '3', '4'],
      dshCount: 0,
      shzCount: 0,
      yshCount: 0,
      breadcrumb: '',
      countList: {
        jftj_dsh: 0,
        jftj_ysh: 0,
        qqpdzx_dsh: 0,
        qqpdzx_shz: 0,
        qqpdzx_ysh: 0,
        wqyz_dsh: 0,
        wqyz_ysh: 0
      },
      countUrls: {
        al: '/admin/count_al',
        qqr: '/admin/count_qqr',
        qt: '/admin/count_qt',
        cyly: '/admin/count_cyly'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$route.query) {
        var status = ''
        status = this.$route.query.status
        this.breadcrumb = status === '0' ? '待审核' : status === '1' ? '审核中' : status === '2' ? '已审核' : '查询统计'
      }
      this.getNUm()
    },
    goPage(status, type) {
      this.breadcrumb = status === '0' ? '待审核' : status === '1' ? '审核中' : '已审核'
      this.$router.push({
        path: `/admin/search`,
        query: {
          status,
          type
        }
      })
    },
    goPage1(msg) {
      this.breadcrumb = '查询统计'
      this.$router.push({
        path: this.countUrls[msg]
      })
    },
    getNUm() {
      getNumList().then(res => {
        this.countList = res.content
        this.dshCount = this.countList.jftj_dsh + this.countList.qqpdzx_dsh + this.countList.wqyz_dsh
        this.yshCount = this.countList.jftj_ysh + this.countList.qqpdzx_ysh + this.countList.wqyz_ysh
        this.shzCount = this.countList.qqpdzx_shz
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .admin-container{
        width:100%;
        height: auto;
        background-color:#f7f7f7;
        .admin-main{
            width:1200px;
            margin:0 auto;
            padding:30px 0px;
            .main{
                overflow: hidden;
                margin-top:20px;
                height: auto;
                // height: 500px;
                .left-part{
                    width:240px;
                    float: left;
                    height: auto;
                    background-color:#ffffff;
                }
                .right-part{
                    width:calc(100% - 260px);
                    float: right;
                    background-color:#ffffff;
                }
            }
        }
    }
</style>
