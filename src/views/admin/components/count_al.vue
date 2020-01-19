<template>
  <div class="count-searchContainer searchInput searchTable">
      <div class="search-part">
          <el-form ref="form" :model="listQuery" label-width="110px">
              <el-form-item label="时间" class="half-row">
                  <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd" v-model="listQuery.startime" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">至</el-col>
                  <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd" v-model="listQuery.endtime" style="width: 100%;"></el-date-picker>
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
                <el-table-column  prop="ywlx" label="业务类型" width="115" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sql" label="申请量" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sll" label="受理量" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jal" label="结案量" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zls" label="专利" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sbs" label="商标" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="bqs" label="版权" width="109" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="qts" label="其他" width="109" show-overflow-tooltip>
                </el-table-column>
            </el-table>
      </div>
  </div>
</template>

<script>
import { searchAjtjList } from '@/api/search.js'
export default {
  data() {
    return {
      listQuery: {
        startime: '',
        endtime: ''
      },
      loading: false,
      tableData: [
        {
          ywlx: '侵权判定',
          sql: '',
          sll: '',
          jal: '',
          zl: '',
          sb: '',
          bq: '',
          qt: ''
        },
        {
          ywlx: '维权援助',
          sql: '',
          sll: '',
          jal: '—————',
          zl: '',
          sb: '',
          bq: '',
          qt: ''
        },
        {
          ywlx: '纠纷调解',
          sql: '',
          sll: '',
          jal: '—————',
          zl: '',
          sb: '',
          bq: '',
          qt: ''
        },
        {
          ywlx: '合计',
          sql: '',
          sll: '',
          jal: '',
          zl: '',
          sb: '',
          bq: '',
          qt: ''
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
      searchAjtjList(this.listQuery).then(res => {
        var hjList = {
          sql: 0,
          sll: 0,
          zls: 0,
          sbs: 0,
          bqs: 0,
          qts: 0
        }
        this.tableData = res.content
        for (var item of this.tableData) {
          if (item.ywlx === '维权援助' || item.ywlx === '纠纷调解') {
            item.jal = '—————'
          } else {
            hjList.jal = item.jal
          }
          hjList.sql += parseInt(item.sql)
          hjList.sll += parseInt(item.sll)
          hjList.zls += parseInt(item.zls)
          hjList.sbs += parseInt(item.sbs)
          hjList.bqs += parseInt(item.bqs)
          hjList.qts += parseInt(item.qts)
        }
        hjList.ywlx = '合计'
        this.tableData.push(hjList)
        this.loading = false
      })
    },
    search() {
      this.startRow = 1
      this.getList()
    },
    exportFile() {
      // window.open(process.env.BASE_API + '/all/downAlsqtjToExcel')
      if (this.tableData.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['业务类型', '申请量', '受理量', '结案量', '专利', '商标', '版权', '其他']
          const filterVal = ['ywlx', 'sql', 'sll', 'jal', 'zls', 'sbs', 'bqs', 'qts']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '案量申请统计表'
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
    }
</style>