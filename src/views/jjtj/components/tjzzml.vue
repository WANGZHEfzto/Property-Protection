<template>
  <div class="tjzzml-searchContainer searchInput searchTable">
    <div class="table-part">
          <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              :border=true>
              <el-table-column prop="zzmc" label="调解组织名称" width="400" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="dh" label="电话" width="200" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="dz" label="地址（统一地址）" width="400" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="lxr" label="联系人" width="200" show-overflow-tooltip>
              </el-table-column>
          </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { zzmc: '中国专利保护协会知识产权纠纷人民调解委员会', dh: '62159121', dz: '海淀区花园路甲7号院新时代大厦3层', lxr: '隋欣' },
        { zzmc: '中国电子工业标准化技术协会知识产权纠纷人民调解委员会', dh: '88681362', dz: '北京市石景山区石景山路35号电科大厦12层', lxr: '李浩' },
        { zzmc: '北京软件和信息服务业协会知识产权纠纷人民调解委员会', dh: '62564219', dz: '北京市海淀区海淀南路甲21号中关村知识产权大厦A座206室', lxr: '程晓霞' },
        { zzmc: '北京电源行业协会知识产权纠纷人民调解委员会', dh: '83520995', dz: '丰台区富丰路2号星火科技大厦808/809', lxr: '张凤婷' },
        { zzmc: '北京家居行业协会知识产权纠纷人民调解委员会', dh: '84083972', dz: '东城区东直门南大街甲3号居然大厦11层', lxr: '马丽英' },
        { zzmc: '北京茶业企业商会知识产权纠纷人民调解委员会', dh: '63341378', dz: '西城区马连道6号北京国际茶城4层416', lxr: '汪朝江' },
        { zzmc: '北京市海淀区工商联知识产权纠纷人民调解委员会', dh: '62423438', dz: '海淀区海淀南路甲21号，中关村知识产权大厦A座一层', lxr: '赵天庆' },
        { zzmc: '北京城建科技促进会知识产权纠纷人民调解委员会', dh: '63983021', dz: '北京市西城区广莲路1号 北京建工大厦A座906-913室', lxr: '周与诚' },
        { zzmc: '北京市朝阳区（设计服务业）知识产权纠纷人民调解委员会', dh: '85630093', dz: '朝阳区三丰北里7号楼悠唐国际中心B座1906室', lxr: '王洪涛' },
        { zzmc: '知乎知识产权纠纷人民调解委员会', dh: '61190680', dz: '北京市海淀区学院路甲5号1幢三层1#厂房3-010', lxr: '门一帆' }
      ]
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .tjzzml-searchContainer{
         width:100%;
        height: auto;
        padding:20px 0px;
    }
</style>