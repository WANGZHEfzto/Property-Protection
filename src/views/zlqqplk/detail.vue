<template>
  <div class="zlqqplkDetail-container searchInput">
    <header-item />
    <div class="search-main">
      <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{path:'/zlqqplk_search'}">您的位置：快速维权</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/zlqqplk_list'}">专利侵权判例库 检索列表</el-breadcrumb-item>
          <el-breadcrumb-item>专利侵权判例库案例详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <div class="left-part">
          <div
            class="left-item"
            :class="{active:isChecked===item.value}"
            v-for="(item,i) in tabsList"
            :key="i"
            @click="tabClick(item)"
          >{{item.name}}</div>
        </div>
        <div class="right-part">
          <div class="part1">
            <div class="title">{{detailInfo.ctio}}</div>
            <div class="part1-1">
              <div> {{detailInfo.cn}}</div>
              <span>{{detailInfo.cdt}}</span>
              <a :href="pdfUrl" target="_blank">PDF下载</a>
            </div>
          </div>
          <div class="part2">
            <div class="title">{{checkedName}}</div>
            <div class="part2-content">
              <div class="item" v-for="(item,i) in checkedList" :key="i">
                <div v-show="item.value==='pdf'" id="item">
                  <embed  width="920" height="600" :src="pdfUrl"> </embed>
                </div>
                <div>
                  <div class="item-l">{{item.name}}</div>
                  <div class="item-r">{{detailInfo[item.value]}}</div>
                </div>
              </div>
            </div>
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
import { catalog, download } from '@/api/zlqqplk'
export default {
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      isChecked: 'dangsrxx',
      checkedName: '当事人信息',
      tabsList: [
        { name: '当事人信息', value: 'dangsrxx' },
        { name: '第三人信息', value: 'disrxx' },
        { name: '法院信息', value: 'fyxx' },
        { name: '文书信息', value: 'wsxx' },
        { name: '判决信息', value: 'pjxx' },
        { name: 'PDF原文', value: 'PDF' }
      ],
      contentList: {
        dangsrxx: [
          { name: '原告', value: 'plaintiff' },
          { name: '原告法定代表人', value: 'plaintiffLawPerson' },
          { name: '原告委托代理机构', value: 'plaintiffAgentOrg' },
          { name: '原告委托代理姓名', value: 'plaintiffAgent' },
          { name: '被告', value: 'defendent' },
          { name: '被告法定代表人', value: 'defendentLawPerson' },
          { name: '被告委托代理机构', value: 'plaintiffAgentOrg' },
          { name: '被告委托代理姓名', value: 'defendentAgent' }
        ],
        disrxx: [
          { name: '原告', value: 'plaintiff' },
          { name: '原告法定代表人', value: 'plaintiffLawPerson' },
          { name: '原告委托代理机构', value: 'plaintiffAgentOrg' },
          { name: '原告委托代理姓名', value: 'plaintiffAgent' },
          { name: '被告', value: 'defendent' },
          { name: '被告法定代表人', value: 'defendentLawPerson' },
          { name: '被告委托代理机构', value: 'plaintiffAgentOrg' },
          { name: '被告委托代理姓名', value: 'defendentAgent' }
        ],
        fyxx: [
          { name: '法院名称', value: 'cn' },
          { name: '法院级别', value: 'cl' },
          { name: '法院所属省/市', value: 'cp' },
          { name: '法院所属辖区', value: 'cjuc' },
          { name: '审判长', value: 'pjc' },
          { name: '代理审判长', value: 'pjac' },
          { name: '审判员', value: 'joc' },
          { name: '代理审判员', value: 'joao' },
          { name: '人民陪审员', value: 'pac' },
          { name: '书记员', value: 'cco' }
        ],
        wsxx: [
          { name: '上级案号', value: 'ucn' },
          { name: '案由', value: 'cro' },
          { name: '案号', value: 'cdn' },
          { name: '文书名称', value: 'cdti' },
          { name: '文书性质', value: 'cdp' },
          { name: '文书落款年份', value: 'cdy' }
        ],
        pjxx: [
          { name: '审理程序', value: 'hp' },
          { name: '判决结果类型', value: 'jrt' },
          { name: '受理日', value: 'cad' },
          { name: '判决日', value: 'cjd' },
          { name: '判决金额', value: 'ja' },
          { name: '申诉金额', value: 'apa' }
        ],
        PDF: [
          { name: 'pdf', value: 'pdf' }
        ]
      },
      checkedList: {},
      detailInfo: {},
      pdfUrl: '',
      pageNum: 1,
      pageTotalNum: 1

    }
  },
  created() {
    this.editData()
  },
  mounted() {
    this.checkedList = this.contentList.dangsrxx
  },
  methods: {
    tabClick(val) {
      this.isChecked = val.value
      this.checkedName = val.name
      this.checkedList = this.contentList[val.value]
    },
    getCurList(container) {
      // title
      this.drawRefereeData(container, 'ctio')
      // dangsrxx/disrxx
      const role = {
        plaintiff: 'plo',
        plaintiffLawPerson: 'pllro',
        plaintiffAgentOrg: 'plago',
        plaintiffAgent: 'plagnc',
        defendent: 'dec',
        defendentLawPerson: 'delro',
        defendentAgentOrg: 'plago',
        defendentAgent: 'deagno',
        proxyJudge: 'joao',
        judge: 'joo',
        clerk: 'ccc'
      }
      for (const key in role) {
        this.drawRoleData(container, key, role[key])
      }
      const referee = ['cn', 'ctd', 'cl', 'cp', 'cjuc', 'pjc', 'pjac', 'joc', 'joao', 'pac', 'cco', 'ucn', 'cro', 'cdn', 'cdti', 'cdp', 'cdy', 'hp', 'jrt', 'cad', 'cjd', 'ja', 'apa']
      referee.forEach(element => {
        this.drawRefereeData(container, element)
      })
      this.previewPDF(this.$route.query.id)
    },
    async editData() {
      const { content: { context: { records }}} = await catalog({ cid: this.$route.query.id })
      this.detailInfo = records[0]
      // key：一级属性名（source[key]-数组）
      for (const key in records[0]) {
        if (records[0].hasOwnProperty(key)) {
          if (records[0][key] instanceof Array) {
            // item:数组中的每一项（item-对象）
            records[0][key].forEach((item, index) => {
              if (index === 0) {
                // container[key]：容器中的基项
                this.detailInfo[key] = item
              } else {
                // key2：基项字段名
                for (const key2 in this.detailInfo[key]) {
                  if (this.detailInfo[key].hasOwnProperty(key2)) {
                    this.detailInfo[key][key2] = this.detailInfo[key][key2] + '、' + item[key2]
                  }
                }
              }
            })
          }
          if (records[0][key] instanceof Object) {
            if (records[0][key]['cjd']) {
              var pattern = /(\d{4})(\d{2})(\d{2})/
              records[0][key]['cjd'] = records[0][key]['cjd'].replace(pattern, '$1/$2/$3')
            }
            this.detailInfo[key] = records[0][key]
          }
        }
      }
      this.getCurList(this.detailInfo)
    },
    drawRoleData(container, attr1, attr2) {
      container[attr1] = container[attr1] && container[attr1][attr2] ? container[attr1][attr2] : '暂无数据'
    },
    drawRefereeData(container, attr) {
      if (attr === 'ja' || attr === 'apa') {
        container[attr] = container.referee[attr] ? this.number_format(container.referee[attr], 2, '.', ',') : '暂无数据'
      } else {
        container[attr] = container.referee[attr] ? container.referee[attr] : '暂无数据'
      }
    },
    async previewPDF(id) {
      const { content: { context: { records }}} = await download({ cid: id })
      this.pdfUrl = records[0].pdfPath
      console.log(this.$refs.pdf)
    },
    // 数字金额格式化处理
    number_format(number, decimals, dec_point, thousands_sep) {
      number = (number + '').replace(/[^0-9+-Ee.]/g, '')
      const n = !isFinite(+number) ? 0 : +number
      const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
      const sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep
      const dec = (typeof dec_point === 'undefined') ? '.' : dec_point
      let s = ''
      s = (prec ? this.toFixedFix(n, prec) : '' + Math.round(n)).split('.')
      var re = /(-?\d+)(\d{3})/
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
      }
      if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
      }
      return s.join(dec)
    },
    toFixedFix(n, prec) {
      var k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zlqqplkDetail-container {
  width: 100%;
  height: auto;
  background-color: #f7f7f7;
  .search-main {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0px;
    .main {
      margin-top: 20px;
      overflow: hidden;
      .left-part {
        float: left;
        width: 200px;
        height: auto;
        background-color: #ffffff;
        margin-right: 20px;
        border-radius: 10px;
        font-size: 14px;
        color: #3e3a39;
        .left-item {
          height: 50px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
          border-bottom: 1px solid #e5e5e5;
          &:first-child {
            border-radius: 10px 10px 0 0;
          }

          &:last-child {
            border-radius: 0px 0px 10px 10px;
          }
          &.active {
            background: linear-gradient(to bottom right, #5c8cf3, #6953d7);
            color: #fff;
          }
        }
      }
      .right-part {
        float: left;
        width: calc(100% - 220px);
        background-color: #ffffff;
        color: #3e3a39;
        padding-top: 30px;
        .part1 {
          text-align: center;
          border-bottom: 1px dashed #aaa;
          padding-bottom: 30px;
          .title {
            font-size: 16px;
            font-weight: bold;
            line-height: 24px;
            margin-bottom: 20px;
          }
          .part1-1 {
            font-size: 12px;
            text-align: center;
            position: relative;
            span {
              display: inline-block;
              width: 50px;
              margin: 0 15px;
              border-left: 1px solid #aaa;
              border-right: 1px solid #aaa;
            }
            a {
              color: #1677d7;
              position:absolute;
              right: 30px;
              top: 0
            }
          }
        }
        .part2 {
          width: 100%;
          height: auto;
          padding: 30px 30px 0 30px;
          color: #3e3a39;
          .title {
            font-size: 16px;
            font-weight: bold;
          }
          .part2-content {
            width: 100%;
            margin: 0 auto;
            padding: 30px 0;
            box-sizing: border-box;
            .item {
              width: 100%;
              height: auto;
              .item-l {
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                background-color: #f3f3f3;
                padding-left: 20px;
              }
              .item-r {
                font-size: 14px;
                line-height: 40px;
                word-wrap: break-word;
                padding: 10px 20px;
                color: #727171;
              }
            }
          }
        }
      }
    }
  }
}
</style>