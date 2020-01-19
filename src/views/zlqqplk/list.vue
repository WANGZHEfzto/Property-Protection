<template>
  <div class="zlqqplkList-container admin-container">
    <header-item />
    <div class="zlqqplkList-main">
      <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{path:'/zlqqplk_search'}">您的位置：快速维权</el-breadcrumb-item>
          <el-breadcrumb-item>专利侵权判例库 检索列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div class="left-part">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="法院级别" name="1">
              <div
                @click="searchList('fyjb',item.value)"
                v-for="(item,i) in tabList.cl"
                :key="i"
                :class="{active:checkedTab===item.value}"
              >
                {{item.value}}
                <span>（{{item.count}}）</span>
                <span class="close" @click="close"></span>
              </div>
              <div @click="loadMore('cl',columnItemLength.cl)" ref="cl" class="loadMore">显示更多...</div>
            </el-collapse-item>
            <el-collapse-item title="判决金额" name="2">
              <div
                @click="searchList('pjje',item.value)"
                v-for="(item,i) in tabList.ja"
                :key="i"
                :class="{active:checkedTab===item.value}"
              >
                {{item.value}}
                <span>（{{item.count}}）</span>
                <span class="close" @click="close"></span>
              </div>
              <div @click="loadMore('ja',columnItemLength.ja)" ref="ja" class="loadMore">显示更多...</div>
            </el-collapse-item>
            <el-collapse-item title="审理程序" name="3">
              <div
                @click="searchList('slcx',item.value)"
                v-for="(item,i) in tabList.hp"
                :key="i"
                :class="{active:checkedTab===item.value}"
              >
                {{item.value}}
                <span>（{{item.count}}）</span>
                <span class="close" @click="close"></span>
              </div>
              <div @click="loadMore('hp',columnItemLength.hp)" ref="hp" class="loadMore">显示更多...</div>
            </el-collapse-item>
            <el-collapse-item title="立案年" name="4">
              <div
                @click="addBtnFlag && searchList('year',item.value)"
                v-for="(item,i) in tabList.crd"
                :key="i"
                :class="{active:checkedTab===item.value}"
              >
                {{item.value}}
                <span>（{{item.count}}）</span>
                <span class="close" @click="close"></span>
              </div>
              <div @click="loadMore('crd',columnItemLength.crd)" ref="crd" class="loadMore">显示更多...</div>
            </el-collapse-item>
            <el-collapse-item title="法院所属省市" name="5">
              <div
                @click="searchList('fyssss',item.value)"
                v-for="(item,i) in tabList.cp"
                :key="i"
                :class="{active:checkedTab===item.value}"
              >
                {{item.value}}
                <span>（{{item.count}}）</span>
                <span class="close" @click="close"></span>
              </div>
              <div @click="loadMore('cp',columnItemLength.cp)" ref="cp" class="loadMore">显示更多...</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="right-part" ref="right_part">
          <div class="right-main" v-loading="loading">
            <div class="item" v-for="(item,i) in searchlist" :key="i">
              <div class="title no-wrap" @click="goDetail(item.cid)">{{item.ccto}}</div>
              <div class="item-t">
                <div class="item-t-t no-wrap">
                  <b>案号：</b>
                  <span>{{item.cdn}}</span>
                </div>
                <div class="item-t-t no-wrap">
                  <b>法院名称：</b>
                  <span>{{item.cn}}</span>
                </div>
                <div class="item-t-t no-wrap">
                  <b>原告：</b>
                  <span>{{item.plo}}</span>
                </div>
                <div class="item-t-t no-wrap">
                  <b>被告：</b>
                  <span>{{item.deo}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-container" ref="pageBox">
            <el-pagination
              :current-page="startRow"
              :page-sizes="[10,20,50]"
              :page-size="pageRow"
              :total="total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          <div class="elevtor">
            <div class="btnFlag" v-if="btnFlag" @click="backTop">Top</div>
          </div>
        </div>
      </div>
    </div>
    <footer-item />
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import { searchPlk, categoryColumn } from '@/api/zlqqplk'
import { mapState } from 'vuex'
export default {
  inject: ['reload'],
  name: 'zlqqplkList',
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      startRow: 1,
      pageRow: 10,
      total: 100,
      // 视图树依赖数据
      tabList: {},
      // 内容依赖数据
      searchlist: [],
      // 筛选条件备份容器
      listQuery: {},
      lastType: '',
      checkedTab: '',
      sourceData_Column: {},
      loading: false,
      addBtnFlag: true,
      btnFlag: false,
      // 加载步长
      columnItemLength: {
        crd: 4,
        ja: 4,
        hp: 4,
        cl: 4,
        cp: 4
      }
    }
  },
  computed: {
    ...mapState({
      'result': state => state.zlxq.result
    })
  },
  created() {
    Object.assign(this.listQuery, this.result)
    // this.listQuery = this.result
    this.getColumn()
    this.getDetail()
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
  },
  methods: {
    // 二次筛选
    searchList(type, msg) {
      this.listQuery[this.lastType] = ''
      if (type === 'year') {
        this.listQuery[type] = msg.slice(0, 4)
      } else {
        this.listQuery[type] = msg
      }
      this.checkedTab = msg
      this.startRow = 1
      this.getDetail()
      this.lastType = type
    },
    // 页码
    handleSizeChange(val) {
      if (this.pageRow !== val) {
        this.pageRow = val
        this.startRow = 1
        this.getDetail()
      }
    },
    handleCurrentChange(val) {
      if (this.startRow !== val) {
        this.startRow = val
        this.getDetail()
      }
    },
    goDetail(id) {
      const { href } = this.$router.resolve({
        path: `/zlqqplk_detail`,
        query: {
          id
        }
      })
      window.open(href, '_blank')
    },
    // 数据操作
    getDetail() {
      this.loading = true
      searchPlk(this.listQuery, { pageRow: this.pageRow, startRow: this.startRow }).then(res => {
        const { content } = res
        if (!content || content.total === '') {
          this.$refs.right_part.innerHTML = '暂无相关内容'
        }
        this.pageRow = parseInt(content.page_row)
        this.total = parseInt(content.total)
        this.searchlist = content.context.records
        this.loading = false
      })
    },
    getColumn() {
      categoryColumn(this.result).then(res => {
        const { content } = res
        const context = content.context
        if (!context || JSON.stringify(context) === '{}') {
          const items = document.querySelectorAll('.loadMore')
          items.forEach(element => {
            element.innerText = '暂无数据'
          })
        } else {
          context.ja.sort((a, b) => {
            return a.value - b.value
          })
          this.sourceData_Column = context
          const temData = {}
          for (const key in context) {
            const temAry = []
            if (key === 'crd' && context[key].length === 1) {
              temAry.push(context[key][0])
              this.$refs[key].style = 'display:none'
              this.addBtnFlag = false
            } else if (context[key].length <= 4) {
              for (let i = 0; i < context[key].length; i++) {
                temAry.push(context[key][i])
              }
            } else {
              for (let i = 0; i < 4; i++) {
                temAry.push(context[key][i])
              }
            }
            temData[key] = temAry
          }
          this.tabList = temData
        }
      })
    },
    // 加载更多
    loadMore(key, length) {
      length += 4
      const temData = []
      if (length < this.sourceData_Column[key].length) {
        for (let i = 0; i < length; i++) {
          temData.push(this.sourceData_Column[key][i])
        }
        this.$set(this.tabList, key, temData)
        this.columnItemLength[key] = length
      } else {
        this.$set(this.tabList, key, this.sourceData_Column[key])
        this.$refs[key].style = 'display:none'
        this.$message('暂无更多相关信息')
      }
    },
    // 电梯导航
    scrollToTop() {
      const that = this
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 1000) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    backTop() {
      const that = this
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 50)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        // let top = document.documentElement.scrollTop || document.body.scrollTop
        // document.documentElement.scrollTop = document.body.scrollTop = top -= 50
        if (that.scrollTop <= 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    close(e) {
      this.reload()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zlqqplkList-container {
  width: 100%;
  height: auto;
  background-color: #f7f7f7;
  .zlqqplkList-main {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0px;
    .main {
      overflow: hidden;
      margin-top: 20px;
      height: auto;
      .left-part {
        width: 240px;
        float: left;
        height: auto;
        background-color: #ffffff;
        .close {
          display: none;
          float: right;
          background: #ccc;
          color: white;
          border-radius: 12px;
          line-height: 16px;
          text-align: center;
          height: 18px;
          width: 18px;
          font-size: 14px;
          padding: 1px;
          box-sizing: border-box;
          margin-top: 14px;
          // top: -10px;
          // right: -10px;
          // position: absolute;
        }
        .close::before {
          content: "\2716";
        }
      }
      .right-part {
        width: calc(100% - 260px);
        float: right;
        background-color: #ffffff;
        padding: 0px 15px 20px 15px;
        .right-main {
          width: 100%;
          height: auto;
          .item {
            width: 100%;
            height: auto;
            padding: 20px;
            border-bottom: 1px dashed #aaa;
            .title {
              font-size: 18px;
              color: #1677d7;
              cursor: pointer;
            }
            .item-t {
              margin-top: 20px;
              .item-t-t {
                font-size: 14px;
                color: #3e3a39;
                margin-top: 15px;
              }
            }
          }
        }
        .pagination-container {
          margin-top: 20px;
          text-align: center;
        }
        .elevtor .btnFlag {
          text-align: center;
          position: fixed;
          right: 50px;
          bottom: 30px;
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          background: rgb(2, 150, 235);
          color: white;
        }
      }
    }
  }
}
</style>