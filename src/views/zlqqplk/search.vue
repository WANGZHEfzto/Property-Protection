<template>
  <div class="zlqqplkSearch-container searchInput">
    <header-item />
    <div class="search-main">
      <div class="breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
          <el-breadcrumb-item>专利侵权判例库</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main">
        <el-form ref="form" :rules="ListRules" :model="listQuery" label-width="110px" status-icon>
          <el-form-item label="案号" class="row" prop="cid">
            <el-input v-model="listQuery.cid" placeholder="民审字第399号"></el-input>
          </el-form-item>
          <el-form-item label="名称" class="row" prop="name">
            <el-input v-model="listQuery.name" placeholder="计算机"></el-input>
          </el-form-item>
          <el-form-item label="原告或上述人" class="row" prop="plo">
            <el-input v-model="listQuery.plo" placeholder="华为"></el-input>
          </el-form-item>
          <el-form-item label="被告或被上述人" class="row" prop="deo">
            <el-input v-model="listQuery.deo" placeholder="华为"></el-input>
          </el-form-item>
          <el-form-item label="原告代理机构" class="row" prop="ygdljg">
            <el-input v-model="listQuery.ygdljg" placeholder="柳沈律师事务所"></el-input>
          </el-form-item>
          <el-form-item label="被告代理机构" class="row" prop="bgdljg">
            <el-input v-model="listQuery.bgdljg" placeholder="柳沈律师事务所"></el-input>
          </el-form-item>
          <el-form-item label="法院名称" class="row" prop="cn">
            <el-input v-model="listQuery.cn" placeholder="北京市高级人民法院"></el-input>
          </el-form-item>
          <el-form-item label="案由" class="row" prop="ay">
            <el-input v-model="listQuery.ay" placeholder="专利侵权纠纷"></el-input>
          </el-form-item>
          <el-form-item label="立案年" class="row" prop="year">
            <el-input v-model="listQuery.year" placeholder="2016"></el-input>
          </el-form-item>
          <div class="btns">
            <el-button class="btn1" @click="search">检&nbsp;&nbsp;索</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <footer-item />
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
export default {
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    // 立案年格式校验
    const checkYear = (rule, value, callback) => {
      if (value === '' || /^(19|20)\d{2}$/.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的立案年信息'))
      }
    }
    return {
      listQuery: {
        cid: '',
        name: '',
        plo: '',
        deo: '',
        ygdljg: '',
        bgdljg: '',
        cn: '',
        ay: '',
        year: '',
        fyjb: '',
        pjje: '',
        slcx: '',
        fyssss: ''
      },
      ListRules: {
        year: [{ trigger: 'blur', validator: checkYear }]
      },
      flg: false
    }
  },
  methods: {
    // 检索校验
    search() {
      this.$refs['form'].validate((valid) => {
        for (const key in this.listQuery) {
          this.listQuery[key] !== '' ? this.flg = true : null
        }
        if (this.flg) {
          if (valid) {
            this.$store.commit('searchResult', this.listQuery)
            const { href } = this.$router.resolve({
              path: `/zlqqplk_list`
            })
            window.open(href, '_blank')
          } else {
            return this.$message.error('检索失败，请核对输入信息是否有效')
          }
        } else {
          this.flg = false
          return this.$message.error('请输入至少一项检索信息')
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.zlqqplkSearch-container {
  width: 100%;
  height: auto;
  background-color: #f7f7f7;
  .search-main {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0px;
    .main {
      margin-top: 20px;
      background-color: #ffffff;
      padding: 30px;
      .el-form {
        width: 800px;
        margin: 0 auto;
      }
    }
  }
}
</style>