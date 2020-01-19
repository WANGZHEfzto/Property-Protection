<template>
  <div class="count-searchContainer searchInput searchTable">
      <div class="search-part">
          <el-form ref="form" :model="listQuery" label-width="110px">
            <el-form-item label="请求人类别" class="half-row">
              <el-select v-model="listQuery.qqrlb" clearable>
                  <el-option label="个人" value="个人"></el-option>
                  <el-option label="企业" value="企业"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间" class="half-row">
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyyMMdd" placeholder="选择日期" v-model="listQuery.startime" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" value-format="yyyyMMdd" placeholder="选择日期" v-model="listQuery.endtime" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <div class="btns">
                <el-button class="btn1" @click="search">统&nbsp;&nbsp;计</el-button>
                <el-button class="btn2" @click="exportFile">导出报表</el-button>
            </div>
          </el-form>
      </div>
      <div class="table-part" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                :border=true>
                <el-table-column  prop="qqr" label="请求（委托）人" width="198" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="qqpd" label="侵权判定" width="170" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="wqyz" label="维权援助" width="170" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jftj" label="纠纷调解" width="170" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="hj" label="合计" width='170'>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination v-show="total>0" :current-page="startRow" :page-size="pageRow" :total="total" background layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
            </div>
      </div>
  </div>
</template>

<script>
import { searchQqrList, exportFile_qqr } from '@/api/search.js'
export default {
  data() {
    return {
      total: 0,
      startRow: 1,
      pageRow: 10,
      listQuery: {
        qqrlb: '',
        startime: '',
        endtime: ''
      },
      loading: false,
      allData: [],
      tableData: [
        {
          jftj: '111111',
          qqpd: '222222',
          wqyz: '333333',
          qqr: 'XXXXXXXXXXXXXXXXXXXXX',
          hj: 'sdsds'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      searchQqrList(this.listQuery).then(res => {
        var qqrList = []
        this.allData=[]
        for (var key in res.content) {
          qqrList.push(key)
        }
        this.total = qqrList.length
        for (var item of qqrList) {
          this.allData.push({
            qqr: item,
            qqpd: res.content[item][0],
            wqyz: res.content[item][1],
            jftj: res.content[item][2],
            hj: res.content[item][3]
          })
        }
        this.tableData = this.allData.slice(0, this.pageRow)
        this.loading = false
      })
    },
    search() {
      this.startRow = 1
      this.getList()
    },
    handleCurrentChange(val) {
      var tmpIndex = this.pageRow * (val - 1)
      this.tableData = this.allData.slice(tmpIndex, tmpIndex + this.pageRow)
    },
    exportFile() {
      exportFile_qqr(this.listQuery)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .count-searchContainer{
         width:100%;
        height: auto;
        padding:20px 0px;
        .search-part{
            border-bottom: 1px solid #d9d5d5;
            padding:0px 30px;
            .btns{
                margin-bottom: 20px;
            }
            .line{
                text-align: center;
            }
        }
      .pagination-container{
        text-align: center;
        margin-top:30px;
      }
    }
</style>
