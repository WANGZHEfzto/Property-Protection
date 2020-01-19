<template>
  <div class="count-searchContainer searchInput searchTable">
      <div class="search-part">
          <el-form ref="form" :model="listQuery" label-width="110px">
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
                <el-table-column  prop="cyly" label="产业领域" width="198" show-overflow-tooltip>
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
      </div>
  </div>
</template>

<script>
  import { searchCylyList } from '@/api/search.js'
export default {
  data() {
      return {
        total: 0,
        startRow: 1,
        pageRow: 10,
        listQuery: {
          startime: '',
          endtime: '',
          hylx: ''
        },
        loading: false,
        tableData: [

        ],
        cylyList: [
          '新一代信息技术', '集成电路', '医药健康', '智能装备', '节能环保', '软件和信息服务', '新能源汽车', '新材料', '人工智能', '科技服务', '其他'
        ]
      }
  },
  mounted() {
      // this.init()
      this.getList()
  },
  methods: {
      init() {
        for (var item of this.cylyList) {
          this.tableData.push({
            cyly: item,
            jftj: '',
            qqpd: '',
            wqyz: '',
            hj: ''
          })
        }
      },
      getList() {
        this.loading = true
        this.listQuery.hylx = this.cylyList.join(',')
        searchCylyList(this.listQuery).then(res => {
          var qqpdTotal = 0
          var jftjTotal = 0
          var wqyzTotal = 0
          var hjTotal = 0
          for (var key of this.cylyList) {
            this.tableData.push({
              cyly: key,
              jftj: res.content['jftj'][key],
              qqpd: res.content['qqpd'][key],
              wqyz: res.content['wqyz'][key],
              hj: res.content['hj'][key]
            })
            qqpdTotal += res.content['qqpd'][key]
            jftjTotal += res.content['jftj'][key]
            wqyzTotal += res.content['wqyz'][key]
            hjTotal += res.content['hj'][key]
          }
          this.tableData.push({
            cyly: '合计',
            jftj: jftjTotal,
            qqpd: qqpdTotal,
            wqyz: wqyzTotal,
            hj: hjTotal
          })
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
      exportFile() {
        // window.open(process.env.BASE_API + '/all/downCylytjToExcel')
        if (this.tableData.length) {
          this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['产业领域', '侵权判定', '维权援助', '纠纷调解', '合计']
          const filterVal = ['cyly', 'qqpd', 'wqyz', 'jftj', 'hj']
          const list = this.tableData
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '产业领域统计表'
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
