<template>
    <div class="aqpd-container">
        <header-item/>
        <div class="aqpd-main">
            <div class="breadcrumb">
                <el-breadcrumb separator=">">
                <el-breadcrumb-item>您的位置：快速维权</el-breadcrumb-item>
                <el-breadcrumb-item>纠纷调解</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="main">
                <div class="left-part">
                    <div class="left-item" :class="{active:isChecked==='add'}" @click="tabclick('add')">纠纷调解请求</div>
                    <div class="left-item" :class="{active:isChecked==='tjzzml'}" @click="tabclick('tjzzml')">调解组织名录</div>
                </div>
                <div class="right-part">
                    <add v-if="isChecked==='add'"/>
                    <tjzzml v-if="isChecked==='tjzzml'"/>
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
import tjzzml from './components/tjzzml.vue'
export default {
  name: 'index',
  components: {
    HeaderItem,
    FooterItem,
    add,
    tjzzml
  },
  data() {
    return {
      isChecked: 'add'
    }
  },
  methods: {
    tabclick(msg) {
      this.isChecked = msg
    },
    getPage1() {
      window.open('http://www.bjipwqzx.com/zscq/_19/_357/_552/index.html', '_blank')
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
            padding:30px 20px;
            .main{
                margin-top:20px;
                overflow: hidden;
                .left-part{
                    float: left;
                    width: 200px;
                    height: auto;
                    background-color: #ffffff;
                    margin-right: 20px;
                    border-radius: 10px;
                    font-size: 14px;
                    color: #3e3a39;
                    .left-item{
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                        cursor: pointer;
                        &:first-child {
                            border-bottom: 1px solid #e5e5e5;
                            border-radius: 10px 10px 0 0;
                        }

                        &:last-child {
                            border-radius: 0px 0px 10px 10px;
                        }
                        &.active {
                            background: linear-gradient(to bottom right, #5c8cf3, #6953d7);
                            color: #fff
                        }
                    }
                }
                .right-part{
                    float: left; 
                    width:calc(100% - 220px);
                    height: auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                }
            }
        }
    }
</style>