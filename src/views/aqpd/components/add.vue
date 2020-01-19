<template>
  <div class="aqpd-addcontainer searchInput">
    <el-form ref="form" :model="formInfo" label-width="110px" :rules="formRules">
      <div class="subtitle">基本信息</div>
        <el-form-item label="请求人" class="half-row" prop="qqr">
            <el-input v-model="formInfo.qqr"></el-input>
        </el-form-item>
        <el-form-item label="所属行业" class="half-row" prop="sshy">
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
        <el-form-item label="请求人类别" class="half-row" prop="qqrlb">
            <el-select v-model="formInfo.qqrlb">
                <el-option label="个人" value="个人"></el-option>
                <el-option label="企业" value="企业"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系人" class="half-row" prop="lxr">
            <el-input v-model="formInfo.lxr"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" class="half-row" prop="lxdh">
            <el-input v-model="formInfo.lxdh"></el-input>
        </el-form-item>
        <div class="subtitle">知识产权信息</div>
        <el-form-item label="知识产权类型" class="half-row" prop="zscqlx">
            <el-select v-model="formInfo.zscqlx">
                <el-option label="专利" value="专利"></el-option>
                <el-option label="商标" value="商标"></el-option>
                <el-option label="版权" value="版权"></el-option>
                <el-option label="其它" value="其它"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="知识产权号" class="half-row" prop="zscqh">
            <el-input v-model="formInfo.zscqh" placeholder="样例：专利号、商标号等"></el-input>
        </el-form-item>
        <el-form-item label="知识产权名称" class="half-row" prop="zscqmc">
            <el-input v-model="formInfo.zscqmc" placeholder="样例：专利名称"></el-input>
        </el-form-item>
        <div class="subtitle">业务信息</div>
        <el-form-item label="请求事项" class="row" prop="qqsx">
            <el-input type="textarea" v-model="formInfo.qqsx"></el-input>
        </el-form-item>
        <el-form-item label="案件是否涉外" class="half-row" prop="ajsfsw">
            <el-radio-group v-model="formInfo.ajsfsw">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
            </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="请求人产品链接" class="spec-row">
            <el-input v-model="formInfo.qqrlj1" placeholder="请输入链接"></el-input>
        </el-form-item>
        <i class="el-icon-circle-plus" @click="addQqrcp"></i>
        <el-form-item class="spec-row" v-for="(item,index) in qqrList" :key="index">
            <el-input v-model="formInfo['qqrlj'+index+2]" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="请求人产品图片" class="row">
            <div class="files">
            <el-upload
                class="upload-demo"
                :action=docUrl
                ref="uploadimg"
                :auto-upload="true"
                :data=infoImg1
                accept=".jpg,.jpeg,.png"
                :beforeUpload="beforeUpload"
                :on-remove='onRemove1'
                :file-list=fileList1
                :on-success="sendSuccess1">
                <el-button>选取图片</el-button>
                <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div>
            </el-upload>
            </div>
        </el-form-item> -->
        <el-form-item label="被诉产品链接" class="spec-row">
            <el-input v-model="bsljTmp.bslj0" placeholder="请输入链接"></el-input>
        </el-form-item>
        <i class="el-icon-circle-plus" @click="addBscp"></i>
        <el-form-item class="spec-row" v-for="(item,index) in bsList" :key="index">
            <el-input v-model="bsljTmp[item]" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="被诉产品图片" class="row">
            <div class="files">
            <el-upload
                class="upload-demo"
                :action=docUrl
                ref="uploadimg"
                :auto-upload="true"
                :data=infoImg2
                accept=".jpg,.jpeg,.png"
                :beforeUpload="beforeUpload"
                :on-remove='onRemove2'
                :file-list=fileList2
                :on-success="sendSuccess2">
                <el-button>选取图片</el-button>
                <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div>
            </el-upload>
            </div>
        </el-form-item>
        <el-form-item label="资料上传" class="row">
            <el-upload
                class="upload-d"
                :action=docUrl
                ref="uploadimg"
                :auto-upload="true"
                :data=infoImg3
                :beforeUpload="beforeUpload"
                :on-remove='onRemove3'
                :file-list=fileList3
                :on-success="sendSuccess3">
                <el-button>委托书</el-button>
                <!-- <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div> -->
            </el-upload>
            <el-upload
                class="upload-d"
                :action=docUrl
                ref="uploadimg"
                :auto-upload="true"
                :data=infoImg4
                :on-remove='onRemove4'
                :file-list=fileList4
                :on-success="sendSuccess4">
                <el-button>其他资料</el-button>
                <!-- <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div> -->
            </el-upload>
            <a :href="wtsmbId" class="downLoad">委托书模板 <i class="el-icon-download"></i></a>
        </el-form-item>
        <div class="btns">
            <el-button class="btn1" @click="submitForm('form')">提交</el-button>
        </div>
    </el-form>
  </div>
</template>

<script>
  import { addQqpd } from '@/api/search.js'
export default {
  data() {
      return {
        docUrl: process.env.BASE_API + '/Jlfilecontroller/upload',
        wtsmbId: process.env.BASE_API + '/Jlfilecontroller/download?id=1939',
        // infoImg1: { 'msg': 'qqpdQqrtp' },
        infoImg2: { 'msg': 'qqpdBscqtp' },
        infoImg3: { 'msg': 'qqpdWts' },
        infoImg4: { 'msg': 'qqpdQtzl' },
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        qqrcptpIds: '',
        bscptpIds: '',
        wtsIds: '',
        qtzlIds: '',
        formInfo: {},
        bsljTmp: {},
        qqrList: [],
        bsList: [],
        tpId: 1,
        formRules: {
          qqr: [{ required: true, message: '请输入', trigger: 'blur' }],
          sshy: [{ required: true, message: '请选择', trigger: 'change' }],
          qqrlb: [{ required: true, message: '请选择', trigger: 'change' }],
          lxr: [{ required: true, message: '请输入', trigger: 'blur' }],
          lxdh: [{ required: true, message: '请输入', trigger: 'blur' }],
          zscqlx: [{ required: true, message: '请选择', trigger: 'change' }],
          zscqh: [{ required: true, message: '请输入', trigger: 'blur' }],
          zscqmc: [{ required: true, message: '请输入', trigger: 'blur' }],
          qqsx: [{ required: true, message: '请输入', trigger: 'blur' }],
          ajsfsw: [{ required: true, message: '请选择', trigger: 'change' }]
        }
      }
  },
  methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.formInfo.bscplj = this.bsljTmp.bslj0 + ','
            if (this.bsList && this.bsList.length > 0) {
              for (var item of this.bsList) {
                this.formInfo.bscplj += this.bsljTmp[item] + ','
              }
            }
            addQqpd(this.formInfo, { bscptpIds: this.bscptpIds, wtsIds: this.wtsIds, qtzlIds: this.qtzlIds }).then(res => {
              if (res.success === true) {
                this.$message({
                  type: 'success',
                  message: '提交成功！'
                })
                this.$router.push({
                  path: `/ywzx`
                })
              }
            })
          } else {
            return false
          }
        })
      },
      addQqrcp() {
        this.qqrList.push({})
      },
      addBscp() {
        this.bsList.push('bslj' + this.tpId)
        this.tpId++
      },
      sendSuccess1(res, file) {
        this.qqrcptpIds += res.content[0] + ','
      },
      sendSuccess2(res, file) {
        this.bscptpIds += res.content[0] + ','
      },
      sendSuccess3(res, file) {
        this.wtsIds += res.content[0] + ','
      },
      sendSuccess4(res, file) {
        this.qtzlIds += res.content[0] + ','
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
        ids = this.qqrcptpIds.split(',')
        var i = ids.indexOf(file.id + '')
        ids.splice(i, 1)
        this.qqrcptpIds = ids.join(',')
      },
      onRemove2(file, fileList) {
        var ids = []
        ids = this.bscptpIds.split(',')
        var i = ids.indexOf(file.id + '')
        ids.splice(i, 1)
        this.bscptpIds = ids.join(',')
      },
      onRemove3(file, fileList) {
        var ids = []
        ids = this.wtsIds.split(',')
        var i = ids.indexOf(file.id + '')
        ids.splice(i, 1)
        this.wtsIds = ids.join(',')
      },
      onRemove4(file, fileList) {
        var ids = []
        ids = this.qtzlIds.split(',')
        var i = ids.indexOf(file.id + '')
        ids.splice(i, 1)
        this.qtzlIds = ids.join(',')
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .aqpd-addcontainer{
        width:100%;
        height: auto;
        padding:40px 80px;
        .downLoad{
            font-size: 12px;
            color:#1677d7;
            .el-icon-download{
                font-size: 18px;
            }
            &:hover{
                
            }
        }
    }
</style>
