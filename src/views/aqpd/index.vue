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
                <div class="right-part">
                    <add/>
                </div>
            </div>
        </div>
        <footer-item/>
    </div>
</template>
<script>
import HeaderItem from '@/views/components/HeaderItem.vue'
import FooterItem from '@/views/components/FooterItem.vue'
import add from './components/add.vue'
export default {
  name: 'index',
  components: {
    HeaderItem,
    FooterItem,
    add
  },
  data() {
    return {
    }
  },
  methods: {
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
            padding:30px 0px;
            .main{
                margin-top:20px;
                // overflow: hidden;
                .right-part{
                    // width:calc(100% - 220px);
                    width:100%;
                    height: auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                }
            }
        }
    }
</style>