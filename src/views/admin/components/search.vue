<template>
  <div class="admin-searchContainer searchInput searchTable">
      <div class="search-part">
          <el-form ref="form" :model="listQuery" label-width="110px">
                <el-form-item label="请求人" class="half-row">
                    <el-input v-model="listQuery.qqr" clearable></el-input>
                </el-form-item>
                <el-form-item label="业务类型" class="half-row">
                    <el-select v-model="ywlx" @change="checkShzt" clearable>
                        <el-option label="侵权判定咨询" value="1"></el-option>
                        <el-option label="维权援助" value="2"></el-option>
                        <el-option label="纠纷调解" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" class="half-row">
                    <el-select v-model="listQuery.shzt" clearable>
                        <el-option :label="item.label" :value="item.value" v-for="(item,i) in shztList" :key="i"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="案件编号" class="half-row">
                    <el-input v-model="listQuery.ajbh" clearable></el-input>
                </el-form-item>
                <el-form-item label="知识产权号" class="half-row">
                    <el-input v-model="listQuery.zscqh" clearable></el-input>
                </el-form-item>
                <el-form-item label="审核结果" class="half-row">
                    <el-select v-model="listQuery.shjg" clearable>
                        <el-option label="不受理" value="0"></el-option>
                        <el-option label="受理" value="1"></el-option>
                        <el-option label="待补充/修改" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <div class="btns">
                    <el-button class="btn1" @click="search">查&nbsp;&nbsp;询</el-button>
                    <el-button class="btn2" @click="reset">重&nbsp;&nbsp;置</el-button>
                </div>
          </el-form>
      </div>
      <div class="table-part" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                :border=true>
                <el-table-column label="流水号" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span @click='goDetail(scope.row)'>{{ scope.row.lsnumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ajbh" label="案件编号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="qqr" label="请求人" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="ywlx" label="业务类型" width="198" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zscqh" label="知识产权号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sqsj" label="申请时间" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shzt1" label="审核状态" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column  label="审核结果" width='100'>
                  <template slot-scope="scope">
                    <span>{{ scope.row.pdjl?scope.row.pdjl:scope.row.shjg }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="jasj" label="结案时间" width="150" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination v-show="total>0" :current-page="startRow" :page-size="pageRow" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
            </div>
      </div>
  </div>
</template>

<script>
import { searchAdminList } from '@/api/search.js'
export default {
  data() {
    return {
      total: 0,
      startRow: 1,
      pageRow: 10,
      loading: false,
      shztList: [],
      qqpdList: [
        { label: '待审核', value: '0' },
        { label: '审核中', value: '1' },
        { label: '已审核', value: '2' }
      ],
      qtList: [
        { label: '待审核', value: '0' },
        { label: '已审核', value: '2' }
      ],
      listQuery: {
        ajbh: '',
        qqr: '',
        zlh: '',
        zlmc: '',
        shzt: ''
      },
      ywlx: '',
      tableData: [

      ],
      detailUris: {
        0: '/adminDetail_dsh', // 0 待审核，1 审核中，2 已审核
        1: '/adminDetail_shz',
        2: '/adminDetail_ysh'
      },
      searchUrls: {
        1: '/qqpd/searchqqpdzx', // 1 侵权判定，2 维权援助，3 纠纷调解
        2: '/wqyz/searchWqyz',
        3: '/jftj/searchjftj'
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // this.init()
  },
  watch: {
    '$route'(to, from) { // 监听路由是否变化
      if (this.$route.query) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.shztList = this.$route.query.type === '1' ? this.qqpdList : this.qtList
      this.listQuery.shzt = this.$route.query.status
      this.ywlx = this.$route.query.type
      this.getList()
    },
    checkShzt(val) {
      this.shztList = val === '1' ? this.qqpdList : this.qtList
      this.listQuery.shzt = '0'
    },
    getList() {
      this.loading = true
      var url = this.searchUrls[this.ywlx]
      searchAdminList(url, this.listQuery, { pageRow: this.pageRow, startRow: this.startRow }).then(res => {
        this.total=res.content.totalSize
        this.tableData = res.content.dataList
        for (var item of this.tableData) {
          item.ywlx = item.ywlx === '1' ? '侵权判定咨询' : item.ywlx === '2' ? '维权援助' : '纠纷调解'
          item.shzt1 = item.shzt === '0' ? '待审核' : item.shzt === '1' ? '审核中' : '已审核'
          item.shjg = item.shjg === '0' ? '不受理' : item.shjg === '1' ? '受理' : item.shjg === '2' ? '待修改补充' : ''
        }
        this.loading = false
      })
    },
    search() {
      this.startRow = 1
      this.getList()
    },
    handleCurrentChange(val) {
      if (val !== this.startRow) {
        this.startRow = val
        this.getList()
      }
    },
    reset() {
      this.listQuery.ajbh = ''
      this.listQuery.qqr = ''
      this.listQuery.zlh = ''
      this.listQuery.zlmc = ''
      this.listQuery.zscqh = ''
      this.listQuery.shjg = ''
      // this.listQuery.shzt = ''
      // this.ywlx = ''
    },
    goDetail(item) {
      const { href } = this.$router.resolve({
        path: this.detailUris[item.shzt],
        query: {
          type: this.ywlx,
          id: item.id
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .admin-searchContainer{
         width:100%;
        height: auto;
        padding:20px 0px;
    .pagination-container{
      text-align: center;
      margin-top:20px;
    }
        .search-part{
            border-bottom: 1px solid #d9d5d5;
            padding:0px 30px;
            .btns{
                margin-bottom: 20px;
            }
        }
    }
</style>
