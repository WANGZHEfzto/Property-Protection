<template>
  <div class="footer-container">
    <div>
      <a href="http://bszs.conac.cn/sitename?method=show&id=8F6A3419D2D9542AE05310291AACE3F6" target="_blank">
        <img src="../assets/blue_error.png" alt="">
      </a>
    </div>
    <p>版权所有：中国（北京）知识产权保护中心</p>
    <p>技术支持：北京中知智慧科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;技术支持电话：010-82004554&nbsp;&nbsp;&nbsp;&nbsp;京ICP备19026382号</p>
  </div>
</template>

<script>
  export default {
    name: 'FooterItem',
    props: {
      msg: String
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
  .footer-container {
    min-width: 1200px;
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    background: #e4e4e4;
    color: #FFF;
    border-top: 3px solid #2980d0;
    text-align: center;
    color: #333;
    line-height: 25px;
    font-size: 14px;
    p{
      margin:0;
      padding: 0;
    }
  }
</style>
