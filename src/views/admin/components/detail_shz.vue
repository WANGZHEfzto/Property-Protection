 <template>
  <div class="adminDetail-detailcontainer searchInput">
      <header-item/>
      <div class="adminDetail-main">
        <div class="breadcrumb">
            <el-breadcrumb separator=">">
            <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
            <el-breadcrumb-item>{{type==='qqpd'?'侵权判定咨询':type==='wqyz'?'维权援助':'纠纷调解'}} 审核中</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="main">
            <el-form ref="form" :model="formInfo" label-width="110px">
                <div class="subtitle">基本信息</div>
                <el-form-item label="请求人" class="half-row">
                    <el-input v-model="formInfo.qqr" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" class="half-row">
                    <el-select v-model="formInfo.sshy">
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
                    <el-select v-model="formInfo.qqrlb">
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
                <div class="subtitle">知识产权信息</div>
                <el-form-item label="知识产权类型" class="half-row">
                    <el-select v-model="formInfo.zscqlx">
                        <el-option label="专利" value="专利"></el-option>
                        <el-option label="商标" value="商标"></el-option>
                        <el-option label="版权" value="版权"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="知识产权号" class="half-row">
                    <el-input v-model="formInfo.zscqh" placeholder="样例：专利号、商标号等"></el-input>
                </el-form-item>
                <el-form-item label="知识产权名称" class="half-row">
                    <el-input v-model="formInfo.zscqmc" placeholder="样例：专利名称"></el-input>
                </el-form-item>
                <!-- <el-form-item label="请求人产品链接" class="row">
                    <el-input v-model="formInfo.qqrlj1" placeholder="请输入链接" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="请求人产品图片" class="row">
                    <div class="imgList">
                        <div class="imgs" v-for="item in qqrtpList" :key="item">
                            <img :src="item" alt="" class="img">
                        </div>
                    </div>
                </el-form-item> -->
                <div class="subtitle">业务信息</div>
                <el-form-item label="请求事项" class="row">
                    <el-input type="textarea" v-model="formInfo.qqsx"></el-input>
                </el-form-item>
                <el-form-item label="案件是否涉外" class="half-row">
                    <el-radio-group v-model="formInfo.ajsfsw" :disabled="isDisabled">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="被诉产品链接" class="row">
                    <!-- <el-input v-model="formInfo.bslj1" placeholder="请输入链接" :disabled="isDisabled"></el-input> -->
                    <div v-for="(item,i) in bsljList" :key="i" class="ljTxt" v-if="item">{{item}}</div>
                </el-form-item>
                <el-form-item label="被诉产品图片" class="row">
                    <div class="imgList"  v-if="bscptpList&&bscptpList.length>0">
                        <div class="imgs" v-for="(item,i) in bscptpList" :key="i">
                          <!-- <img :src="item.src" alt="" class="img"> -->
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
                <hr style="margin-bottom:30px;width:100%">
                <el-form-item label="申请时间" class="half-row">
                    <el-input v-model="formInfo.sqsj" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="审核人" class="half-row">
                    <el-select v-model="formInfo.shr1" :disabled="isDisabled">
                        <el-option label="张三" value="张三"></el-option>
                        <el-option label="李四" value="李四"></el-option>
                        <el-option label="王五" value="王五"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核时间" class="half-row">
                    <el-input v-model="formInfo.shsj" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="审核结果" class="half-row">
                    <el-select v-model="formInfo.shjg" :disabled="isDisabled">
                        <el-option label="不受理" value="0"></el-option>
                        <el-option label="受理" value="1"></el-option>
                        <el-option label="待补充/修改" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="审核理由" class="row" v-if="type==='wqyz'">
                    <el-input type="textarea" autosize v-model="formInfo.shly" :disabled="isDisabled"></el-input>
                </el-form-item> -->
                <el-form-item label="说明" class="row">
                    <el-input type="textarea" autosize v-model="formInfo.sm" :disabled="isDisabled"></el-input>
                </el-form-item>
                <!-- <el-form-item label="审核意见" class="row">
                    <el-input type="textarea" autosize v-model="formInfo.shyj" :disabled="isDisabled"></el-input>
                </el-form-item> -->
                <el-form-item label="文书" class="row">
                    <div>
                        <a :href="wsxzList[0].src" v-if="wsxzList&&wsxzList.length>0" class="downLoad">文书下载 <i class="el-icon-download"></i></a>
                    </div>
                </el-form-item>
            </el-form>
            <hr style="margin-bottom:30px">

            <el-form ref="form1" :model="submitInfo" label-width="110px" :rules="formRules">
                <el-form-item label="审核状态" class="half-row">
                    <el-select v-model="submitInfo.shzt" :disabled="isDisabled">
                        <el-option label="待审核" value="待审核"></el-option>
                        <el-option label="审核中" value="审核中"></el-option>
                        <el-option label="已审核" value="已审核"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核人" class="half-row" prop="shr2">
                    <el-select v-model="submitInfo.shr2">
                        <el-option label="张三" value="张三"></el-option>
                        <el-option label="李四" value="李四"></el-option>
                        <el-option label="王五" value="王五"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="结案时间" class="half-row" prop="jasj">
                    <!-- <el-input v-model="submitInfo.jasj"></el-input> -->
                    <el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd" v-model="submitInfo.jasj" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="判定结论" class="half-row" prop="pdjl">
                    <el-select v-model="submitInfo.pdjl">
                        <el-option label="落入保护范围" value="落入保护范围"></el-option>
                        <el-option label="不落入保护范围" value="不落入保护范围"></el-option>
                        <!-- <el-option label="不受理" value="不受理"></el-option>
                        <el-option label="受理" value="受理"></el-option>
                        <el-option label="侵权" value="侵权"></el-option>
                        <el-option label="不侵权" value="不侵权"></el-option>
                        <el-option label="达成调解" value="达成调解"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="文件上传" class="row">
                    <el-upload
                        class="upload-d"
                        :action=docUrl
                        ref="uploadimg"
                        :auto-upload="true"
                        :data=infoImg1
                        :beforeUpload="beforeUpload"
                        :on-remove='onRemove1'
                        :file-list=fileList1
                        :on-success="sendSuccess1">
                        <el-button>上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div> -->
                    </el-upload>
                </el-form-item>
                <div class="btns">
                    <el-button class="btn1" @click="submitForm('form1')">提交</el-button>
                </div>
            </el-form>
        </div>
        
      </div>
      <footer-item/>
  </div>
</template>

<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import { getShjlDetailById, updateInfo } from '@/api/search.js'
export default {
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {
      docUrl: process.env.BASE_API + '/Jlfilecontroller/upload',
      infoImg1: { 'msg': 'shztp' },
      fileList1: [],
      shzIds: '',
      wtsIds: '',
      qtzlIds: '',
      formInfo: {
        ajsfsw: '是'
      },
      formRules: {
        shr2: [{ required: true, message: '请选择', trigger: 'change' }],
        jasj: [{ required: true, message: '请选择', trigger: 'change' }],
        pdjl: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      isDisabled: true,
      submitInfo: {
        shzt: '审核中'
      },
      bsljList: [],
      type: this.$route.query.type,
      bscptpList: [

      ],
      wtsList: [],
      qtzlList: [],
      wsxzList: [],
      searchByIdUrls: {
        1: '/qqpd/selectqqpdzxbyid', // 1 侵权判定，2 维权援助，3 纠纷调解
        2: '',
        3: ''
      },
      updateUrls: {
        1: '/qqpd/updateqqpdzx',
        2: '',
        3: ''
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var url = this.updateUrls[this.type]
          this.submitInfo.shzt = '2'
          this.submitInfo.id = this.formInfo.id
          updateInfo(url, this.submitInfo, { wjids: this.shzIds, deleteWjids: '' }).then(res => {
            if (res.success === true) {
              this.$message({
                type: 'success',
                message: '提交成功！'
              })
            }
            this.$router.push({
              path: `/admin`
            })
          })
        } else {
          return false
        }
      })
    },
    getDetail() {
      var url = this.searchByIdUrls[this.type]
      getShjlDetailById(url, { id: this.$route.query.id }).then(res => {
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
          } else if (list.type === 'qqpdQtzl') {
            this.qtzlList.push(list)
          } else if (list.type === 'dshtp') {
            this.wsxzList.push(list)
          }
        }
      })
    },
    sendSuccess1(res, file) {
      this.shzIds += res.content[0] + ','
    },
    beforeUpload(file, fileList) {
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 20MB!',
          type: 'warning'
        })
      }
      return isLt2M
    },
    onRemove1(file, fileList) {
      var ids = []
      ids = this.shzIds.split(',')
      var i = ids.indexOf(file.id + '')
      ids.splice(i, 1)
      this.shzIds = ids.join(',')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .adminDetail-detailcontainer{
        width:100%;
        height: auto;
        background-color: #f7f7f7;
        .adminDetail-main{
            width:1200px;
            margin:0 auto;
            padding:30px 0px;
            .main{
                margin-top:20px;
                height: auto;
                background-color: #ffffff;
                padding:30px;
            }
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
            margin-right: 30px;
            .el-icon-download{
                font-size: 18px;
            }
        }
        .subtitle{
            margin-left: -10px;
        }
    }
</style>
