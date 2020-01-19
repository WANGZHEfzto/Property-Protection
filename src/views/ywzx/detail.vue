<template>
  <div class="ywzx-detailcontainer searchInput">
      <header-item/>
      <div class="ywzxdetail-main">
            <div class="breadcrumb">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>您的位置：{{type==='1'?'侵权判定咨询':type==='2'?'维权援助':'纠纷调解'}}</el-breadcrumb-item>
                    <el-breadcrumb-item>业务咨询详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main">
                <el-form ref="form" :model="formInfo" label-width="110px">
                    <div class="subtitle">基本信息</div>
                    <el-form-item label="请求人" class="half-row">
                        <el-input v-model="formInfo.qqr" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" class="half-row">
                        <el-select v-model="formInfo.sshy" :disabled="isDisabled">
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
                    <el-form-item label="请求人类别" class="half-row">
                        <el-select v-model="formInfo.qqrlb" :disabled="isDisabled">
                            <el-option label="个人" value="个人"></el-option>
                            <el-option label="企业" value="企业"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系人" class="half-row">
                        <el-input v-model="formInfo.lxr" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" class="half-row">
                        <el-input v-model="formInfo.lxdh" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" class="half-row" v-if="type==='2'">
                        <el-input v-model="formInfo.email"></el-input>
                    </el-form-item>
                    <div class="subtitle">知识产权信息</div>
                    <el-form-item label="涉及权利类别" class="half-row" v-if="type==='2'">
                        <el-select v-model="formInfo.zscqlx" :disabled="isDisabled">
                            <el-option label="专利" value="专利"></el-option>
                            <el-option label="商标" value="商标"></el-option>
                            <el-option label="版权" value="版权"></el-option>
                            <el-option label="其它" value="其它"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="知识产权类型" class="half-row" v-if="type==='1'||type==='3'">
                        <el-select v-model="formInfo.zscqlx" :disabled="isDisabled"> 
                            <el-option label="专利" value="专利"></el-option>
                            <el-option label="商标" value="商标"></el-option> 
                            <el-option label="版权" value="版权"></el-option>
                            <el-option label="其它" value="其它"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="知识产权号" class="half-row" v-if="type==='1'||type==='3'">
                        <el-input v-model="formInfo.zscqh" placeholder="样例：专利号、商标号等" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="知识产权名称" class="half-row" v-if="type==='1'">
                        <el-input v-model="formInfo.zscqmc" placeholder="样例：专利名称" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <div class="subtitle">业务信息</div>
                    <el-form-item label="请求事项" class="row" v-if="type==='1'">
                        <el-input type="textarea" v-model="formInfo.qqsx" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="申请援助事项" class="row" v-if="type==='2'">
                        <el-input type="textarea" v-model="formInfo.qqsx" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="委托事项" class="row" v-if="type==='3'">
                        <el-input type="textarea" v-model="formInfo.qqsx" :disabled="isDisabled"></el-input>
                    </el-form-item> 
                    <el-form-item label="案件是否涉外" class="half-row">
                        <el-radio-group v-model="formInfo.sfsw" :disabled="isDisabled">
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="请求人产品链接" class="spec-row">
                        <el-input v-model="formInfo.qqrlj1" placeholder="请输入链接"></el-input>
                    </el-form-item>
                    <el-form-item label="请求人产品图片" class="row">
                        <div class="imgList">
                            <div class="imgs" v-for="item in qqrtpList" :key="item">
                                <img :src="item" alt="" class="img">
                            </div>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="被诉产品链接" class="spec-row" v-if="type==='1'">
                        <!-- <el-input v-model="formInfo.bslj1" placeholder="请输入链接"></el-input> -->
                        <div v-for="(item,i) in bsljList" :key="i" class="ljTxt" v-if="item">{{item}}</div>
                    </el-form-item>
                    <el-form-item label="被诉产品图片" class="row" v-if="type==='1'">
                        <div class="imgList">
                            <div class="imgs" v-for="item in bscptpList" :key="item">
                                <el-image 
                                    :src="item.src" 
                                    :preview-src-list="item.srcs">
                                </el-image>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="资料" class="row">
                        <div>
                            <a :href="wtsList[0].src" class="downLoad" v-if="wtsList&&wtsList.length>0">委托书 <i class="el-icon-download"></i></a>
                            <a :href="qtzlList[0].src" class="downLoad" v-if="qtzlList&&qtzlList.length>0">其他资料 <i class="el-icon-download"></i></a>
                        </div>
                    </el-form-item>
                    <div class="subtitle">案件结果</div>
                    <el-form-item label="审核结果" class="row">
                        <el-select v-model="formInfo.shjg" :disabled="isDisabled">
                            <el-option label="不受理" value="0"></el-option>
                            <el-option label="受理" value="1"></el-option>
                            <el-option label="待补充/修改" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="审核理由" class="row">
                        <el-input v-model="formInfo.zlmc"></el-input>
                    </el-form-item> -->
                    <el-form-item label="说明" class="row">
                        <el-input type="textarea" autosize v-model="formInfo.sm" :disabled="isDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="文件" class="row">
                        <div>
                            <a href="#" class="downLoad">受理通知书 <i class="el-icon-download"></i></a>
                        </div>
                        <div>
                            <a href="#" class="downLoad">意见书 <i class="el-icon-download"></i></a>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
      </div>
    <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import { getDetailById_user } from '@/api/search.js'
export default {
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      wtsIds: '',
      qtzlIds: '',
      formInfo: {},
      qqrtpList: [
        require('./imgs/img03.png'), require('./imgs/img04.png'), require('./imgs/img05.png'), require('./imgs/img06.png')
      ],
      bscptpList: [
        {
          src: require('./imgs/img03.png'),
          srcs: [require('./imgs/img03.png')]
        },
        {
          src: require('./imgs/img04.png'),
          srcs: [require('./imgs/img04.png')]
        },
        {
          src: require('./imgs/img05.png'),
          srcs: [require('./imgs/img05.png')]
        },
        {
          src: require('./imgs/img06.png'),
          srcs: [require('./imgs/img06.png')]
        }
      ],
      type: this.$route.query.type,
      bsljList: [],
      wtsList: [],
      qtzlList: [],
      isDisabled: true,
      searchUrls: {
        1: '',
        2: '',
        3: ''
      }
    }
  },
  mounted() {
    // this.getDetail()
  },
  methods: {
    submitForm() {},
    getDetail() {
      console.log(999999, this.$route.query.id)
      var url = this.searchUrls[this.type]
      getDetailById_user(url, { id: this.$route.query.id }).then(res => {
        console.log(res)
        this.formInfo = res.content
        if (this.formInfo.bscplj) {
          this.bsljList = this.formInfo.bscplj.split(',')
        }
        var fileList = res.content.fj ? JSON.parse(res.content.fj) : []
        for (var list of fileList) {
          list.src = process.env.BASE_API + '/Jlfilecontroller/download?id=' + list.id
          if (list.type === 'qqpdBscqtp') {
            var srcs = []
            srcs.push(list.src)
            list.srcs = srcs
            this.bscptpList.push(list)
          } else if (list.type === 'qqpdWts') {
            this.wtsList.push(list)
          } else if (list.type === 'qqpdQtzl' || list.type === 'wqyztp' || list.type === 'jftjtp') {
            this.qtzlList.push(list)
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .ywzx-detailcontainer{
        width:100%;
        height: auto;
        // padding:20px 30px;
        background-color: #f7f7f7;
        .ywzxdetail-main{
            width:1200px;
            margin:0 auto;
            padding:30px 0;
            .main{
                margin-top:20px;
                background-color: #ffffff;
                padding:30px 40px;
            }
        }
        .subtitle{
            margin-left: -10px;
        }
        .detail-title{
            width:100%;
            text-align: left;
            margin-left: -15px;
            font-size: 16px;
            font-weight: bold;
            color:#3e3a39;
            margin-bottom:30px;
        }
        .imgList{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .imgs{
                width:250px;
                height: 150px;
                display: flex;
                align-items: center;
                justify-content: center;
                .img{
                    max-width: 100%;
                    width: auto;
                    height: auto;
                }
            }
        }
        .downLoad{
            font-size: 12px;
            color:#1677d7;
            .el-icon-download{
                font-size: 18px;
            }
        }
    }
</style>