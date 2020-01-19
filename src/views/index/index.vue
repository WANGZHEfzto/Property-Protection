<template>
    <div class="aqpd-container">
        <header-item/>
        <div class="aqpd-main">
            <div class="breadcrumb">
                <el-breadcrumb separator=">">
                <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
                <el-breadcrumb-item>侵权判定咨询</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main">
                <el-tabs tab-position="left" style="height: 200px;">
                    <el-tab-pane label="侵权判定咨询请求">

                    </el-tab-pane>
                    <el-tab-pane label="我的业务">
                        
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <footer-item/>
    </div>
</template>
<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
export default {
  name: 'index',
  components: {
    HeaderItem,
    FooterItem
  },
  data() {
    return {

    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .aqpd-container{
        width:100%;
        height: auto;
        background-color: #f7f7f7;
        .aqpd-main{
            width:1200px;
            margin:0 auto;
            background-color: #ffffff;
            padding:30px 20px;
        }
    }
</style>