<template>
  <div class="aqpd-addcontainer searchInput">
    <el-form ref="form" :model="formInfo" label-width="110px" :rules="formRules">
      <div class="subtitle">基本信息</div>
        <el-form-item label="委托人" class="half-row" prop="wtr">
            <el-input v-model="formInfo.wtr"></el-input>
        </el-form-item>
        <el-form-item label="委托人类别" class="half-row" prop="qqrlb">
            <el-select v-model="formInfo.qqrlb">
                <el-option label="个人" value="个人"></el-option>
                <el-option label="企业" value="企业"></el-option>
            </el-select>
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
        <div class="subtitle">业务信息</div>
        <el-form-item label="委托事项" class="row" prop="qqsx">
            <el-input type="textarea" v-model="formInfo.qqsx"></el-input>
        </el-form-item>
        <el-form-item label="案件是否涉外" class="half-row" prop="ajsfsw">
            <el-radio-group v-model="formInfo.ajsfsw">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="证据资料" class="row">
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
                <el-button>资料上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">文件格式:jpg/jpeg/png,大小不超过20M</div> -->
            </el-upload>
        </el-form-item>
        <div class="btns">
            <el-button class="btn1" @click="submitForm('form')">提交</el-button>
        </div>
    </el-form>
  </div>
</template>

<script>
  import { addjftj } from '@/api/search.js'

  export default {
  data() {
      return {
        docUrl: process.env.BASE_API + '/Jlfilecontroller/upload',
        infoImg1: { 'msg': 'jftjtp' },
        fileList1: [],
        jftjIds: '',
        formInfo: {},
        bqqrList: [],
        formRules: {
          wtr: [{ required: true, message: '请输入', trigger: 'blur' }],
          sshy: [{ required: true, message: '请选择', trigger: 'change' }],
          qqrlb: [{ required: true, message: '请选择', trigger: 'change' }],
          lxr: [{ required: true, message: '请输入', trigger: 'blur' }],
          lxdh: [{ required: true, message: '请输入', trigger: 'blur' }],
          zscqlx: [{ required: true, message: '请选择', trigger: 'change' }],
          zscqh: [{ required: true, message: '请输入', trigger: 'blur' }],
          qqsx: [{ required: true, message: '请输入', trigger: 'blur' }],
          ajsfsw: [{ required: true, message: '请选择', trigger: 'change' }]
        }
      }
  },
  methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            addjftj(this.formInfo, { jftjIds: this.jftjIds }).then(res => {
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
      addBqqr() {
        this.bqqrList.push({})
      },
      sendSuccess1(res, file) {
        this.jftjIds += res.content[0] + ','
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
        ids = this.jftjIds.split(',')
        var i = ids.indexOf(file.id + '')
        ids.splice(i, 1)
        this.jftjIds = ids.join(',')
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .aqpd-addcontainer{
        width:100%;
        height: auto;
        padding:20px 30px;
        .downLoad{
            font-size: 12px;
            color:#1677d7;
            .el-icon-download{
                font-size: 18px;
            }
            &:hover{
                
            }
        }
        .subtitle{
          margin-left: -10px;
        }
    }
</style>
