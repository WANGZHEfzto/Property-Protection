<template>
  <div class="ywzxcontainer searchInput searchTable">
      <header-item/>
      <div class="ywzx-main">
        <div class="breadcrumb">
            <el-breadcrumb separator=">">
            <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
            <el-breadcrumb-item>我的业务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
          <div class="search-part">
            <el-form ref="form" :model="listQuery" label-width="110px">
                  <el-form-item label="流水号" class="half-row">
                      <el-input v-model="listQuery.lsh"></el-input>
                  </el-form-item>
                  <el-form-item label="知识产权号" class="half-row">
                      <el-input v-model="listQuery.zscqh" placeholder="样例：专利号、商标号等"></el-input>
                  </el-form-item>
                  <el-form-item label="知识产权名称" class="half-row">
                      <el-input v-model="listQuery.zscqmc" placeholder="样例：专利名称"></el-input>
                  </el-form-item>
                  <el-form-item label="业务类型" class="half-row">
                      <el-select v-model="ywlx">
                          <el-option label="侵权判定咨询" value="1"></el-option>
                          <el-option label="维权援助" value="2"></el-option>
                          <el-option label="纠纷调解" value="3"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="审核状态" class="half-row">
                      <el-select v-model="listQuery.shzt">
                          <el-option label="待审核" value="0"></el-option>
                          <el-option label="审核中" value="1"></el-option>
                          <el-option label="已审核" value="2"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="审核结果" class="half-row">
                      <el-select v-model="listQuery.shjg">
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
                <el-table-column label="流水号" width="200" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span @click='goDetail(scope.row.lsh)'>{{ scope.row.lsh }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ywlx" label="业务类型" width="200" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zscqlx" label="知识产权类型" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zscqh" label="知识产权号" width="188" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zscqmc" label="知识产权名称" width='150'>
                </el-table-column>
                <el-table-column prop="shzt" label="审核状态" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shjg" label="审核结果" width="150" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination v-show="total>0" :current-page="startRow" :page-size="pageRow" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
            </div>
          </div>
        </div>
      </div>
      <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import { getList_user } from '@/api/search.js'
export default {
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      listQuery: {},
      tableData: [
        {
          lsh: '111111',
          ywlx: '222222',
          zscqlx: '333333',
          zscqmc: 'XXXXXXXXXXXXXXXXXXXXX',
          zscqh: 'sdsds',
          shzt: '0',
          shjg: '1'
        }
      ],
      startRow: 1,
      pageRow: 10,
      total: 0,
      loading: false,
      ywlx: '1',
      searchUrls: {
        1: '',
        2: '',
        3: ''
      }
    }
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      var url = this.searchUrls[this.ywlx]
      getList_user(url, this.listQuery, { pageRow: this.pageRow, startRow: this.startRow }).then(res => {
        console.log(res)
        this.tableData = res.content.dataList
        this.loading = false
      })
    },
    search() {},
    reset() {
      this.listQuery.zlh = ''
      this.listQuery.lsh = ''
      this.listQuery.zlmc = ''
    },
    goDetail(id) {
      const { href } = this.$router.resolve({
        path: `/ywzxDetail`,
        query: {
          id: id,
          type: this.ywlx
        }
      })
      window.open(href, '_blank')
    },
    handleCurrentChange(val) {
      this.startRow = val
      this.getList()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   .ywzxcontainer{
       width:100%;
        height: auto;
        background-color: #f7f7f7;
        .ywzx-main{
          width:1200px;
          margin:0 auto;
          padding:30px 0px;
          .main{
            margin-top:20px;
            background-color: #ffffff;
          }
        }
        .search-part{
            border-bottom: 1px solid #d9d5d5;
            padding:30px;
            .btns{
                margin-bottom: 20px;
            }
        }
   } 
</style>