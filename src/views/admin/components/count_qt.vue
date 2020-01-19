<template>
  <div class="count-searchContainer searchInput searchTable">
      <div class="search-part">
          <el-form ref="form" :model="listQuery" label-width="110px">
                <el-form-item label="请求人" class="half-row">
                    <el-input v-model="listQuery.qqr" clearable></el-input>
                </el-form-item>
                <el-form-item label="请求人类别" class="half-row">
                    <el-select v-model="listQuery.qqrlb" clearable>
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="企业" value="企业"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属行业" class="half-row">
                    <el-select v-model="listQuery.sshy" clearable>
                        <el-option label="新一代信息技术" value="新一代信息技术"></el-option>
                        <el-option label="集成电路" value="集成电路"></el-option>
                        <el-option label="医药健康" value="医药健康"></el-option>
                        <el-option label="智能装备" value="智能装备"></el-option>
                        <el-option label="节能环保" value="节能环保"></el-option>
                        <el-option label="软件和信息服务" value="软件和信息服务"></el-option>
                        <el-option label="新能源汽车" value="新能源汽车"></el-option>
                        <el-option label="新材料" value="新材料"></el-option>
                        <el-option label="人工智能" value="人工智能"></el-option>
                        <el-option label="科技服务" value="科技服务"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型" class="half-row">
                    <el-select v-model="ywlx">
                        <el-option label="侵权判定咨询" value="1"></el-option>
                        <el-option label="维权援助" value="2"></el-option>
                        <el-option label="纠纷调解" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="知识产权类型" class="half-row">
                    <el-select v-model="listQuery.zscqlx" clearable>
                        <el-option label="专利" value="专利"></el-option>
                        <el-option label="商标" value="商标"></el-option>
                        <el-option label="版权" value="版权"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人" class="half-row">
                    <el-select v-model="listQuery.shr" clearable>
                        <el-option label="张三" value="张三"></el-option>
                        <el-option label="李四" value="李四"></el-option>
                        <el-option label="王五" value="王五"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态" class="half-row">
                    <el-select v-model="listQuery.shzt" clearable>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核中" value="1"></el-option>
                        <el-option label="已审核" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核结果" class="half-row">
                    <el-select v-model="listQuery.shjg" clearable>
                        <el-option label="不受理" value="0"></el-option>
                        <el-option label="受理" value="1"></el-option>
                        <el-option label="待补充/修改" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <br/>
                <el-form-item label="时间" class="half-row">
                    <el-select v-model="listQuery.sjlx">
                        <el-option label="申请时间" value="sqsj"></el-option>
                        <el-option label="审核时间" value="shsj"></el-option>
                        <el-option label="结案时间" value="jasj"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="half-row date">
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
                    <el-button class="btn2" @click="reset">重&nbsp;&nbsp;置</el-button>
                </div>
          </el-form>
      </div>
      <div class="table-part">
            <div class="btns">
              <el-button class="btn2" @click="exportFile">导出报表</el-button>
            </div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                :border=true v-loading="loading">
                <el-table-column prop="lsnumber" label="流水号" width="150" show-overflow-tooltip>
                    <!-- <template slot-scope="scope">
                        <span @click='goDetail(scope.row.lsh)'>{{ scope.row.lsh }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column prop="ajbh" label="案件编号" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="qqr" label="请求人" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="qqrlb" label="请求人类别" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sshy" label="所属行业" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="ywlx" label="业务类型" width='100'>
                </el-table-column>
                <el-table-column prop="zscqlx" label="知识产权类型" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="zscqh" label="知识产权号" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="sqsj" label="申请时间" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shzt" label="审核状态" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="shjg" label="审核结果" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jasj" label="结案时间" width="120" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination v-show="total>0" :current-page="startRow" :page-size="pageRow" :total="total" background layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"/>
            </div>
      </div>
  </div>
</template>

<script>
import { searchQtList, exportFile_qt } from '@/api/search.js'
export default {
  data() {
    return {
      total: 0,
      startRow: 1,
      pageRow: 10,
      listQuery: {
        qqrlb: '',
        qqr: '',
        sshy: '',
        zscqlx: '',
        shr: '',
        shzt: '',
        shjg: '',
        sjlx: 'sqsj',
        startime: '',
        endtime: ''
      },
      ywlx: '1',
      loading: false,
      tableData: [
        {
          lsh: '111111',
          ajbh: '222222',
          zlh: '333333',
          zlmc: 'XXXXXXXXXXXXXXXXXXXXX',
          ywlx: 'sdsds',
          shzt: '待审核'
        }
      ],
      searchUrls: { // 1 侵权判定，2 维权援助，3 纠纷调解
        1: '/qqpd/qttjQqpd',
        2: '/wqyz/qttjWqyz',
        3: '/jftj/qttjJftj'
      },
      downLoadUrls: {
        1: '/qqpd/qttjQqpdToExcel',
        2: '/wqyz/qttjWqyzToExcel',
        3: '/jftj/qttjJftjToExcel'
      },
      downLoadName: {
        1: '侵权判定咨询列表.xlsx',
        2: '维权援助列表.xlsx',
        3: '纠纷调解列表.xlsx'
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      var url = this.searchUrls[this.ywlx]
      searchQtList(url, this.listQuery, { pageRow: this.pageRow, startRow: this.startRow }).then(res => {
        this.total = res.content.totalSize
        this.tableData = res.content.dataList
        for (var item of this.tableData) {
          item.ywlx = item.ywlx === '1' ? '侵权判定咨询' : item.ywlx === '2' ? '维权援助' : '纠纷调解'
          item.shzt = item.shzt === '0' ? '待审核' : item.shzt === '1' ? '审核中' : '已审核'
          item.shjg = item.shjg === '0' ? '不受理' : item.shjg === '1' ? '受理' : '待修改补充'
        }
        this.loading = false
      })
    },
    search() {
      this.startRow = 1
      this.getList()
    },
    exportFile() {
      var url = this.downLoadUrls[this.ywlx]
      var name = this.downLoadName[this.ywlx]
      exportFile_qt(url, this.listQuery, name)
    },
    handleCurrentChange(val) {
      if (val !== this.startRow) {
        this.startRow = val
        this.getList()
      }
    },
    reset() {
      this.listQuery.qqr = ''
      this.listQuery.qqrlb = ''
      this.listQuery.sshy = ''
      this.listQuery.zscqlx = ''
      this.listQuery.shzt = ''
      this.listQuery.ywlx = ''
      this.listQuery.shr = ''
      this.listQuery.shjg = ''
      this.listQuery.sjlx = ''
      this.listQuery.startime = ''
      this.listQuery.endtime = ''
    },
    goDetail(id) {
      const { href } = this.$router.resolve({
        path: this.detailUris[this.listQuery.shzt],
        query: {
          type: this.listQuery.ywlx,
          id: id
        }
      })
      window.open(href, '_blank')
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
        .table-part{
          .btns{
              text-align: right;
              margin-bottom: 20px;
            }
        }
        .pagination-container{
          text-align: center;
          margin-top:30px;
        }
    }
</style>
