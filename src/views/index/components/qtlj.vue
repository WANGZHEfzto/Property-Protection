<template>
  <div class="qtlj-container">
    <div class='qtlj-main'>
      <div class='qtlj-title'>
        <div class='gxzx-t' @click="goPage('')">其他链接</div>
        <div class='gxzx-b'></div>
        <div class='gxzx-e'>Othor Links</div>
      </div>
      <div class="qtlj-m">
        <div class="qtlj-item" v-for="(item,index) in ljList" :key="index">
          <div class="item-logo" :class="'icon'+index">
            <span class="iconfont" :class="item.icon"></span>
          </div>
          <div class="item-txt">
            {{item.name}}
          </div>
        </div>
      </div>
      <br style='clear:both'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'qtlj',
    props: {

    },
    data() {
      return {
        ljList: [
          {
            icon: 'iconchengguozhuanhuan1',
            name: '通信院科技成果转换平台'
          },
          {
            icon: 'iconchengguozhuanhuan2',
            name: '长城软件科技成果转换平台'
          },
          {
            icon: 'iconchengguozhuanhuan',
            name: '通信院科技成果转换平台'
          },
          {
            icon: 'iconchengguozhuanhuan3',
            name: '长城软件科技成果转换平台'
          },
          {
            icon: 'iconchengguozhuanhuan4',
            name: '通信院科技成果转换平台'
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:18px;
  $fontSizeMini:14px;
  $color1:#4e4e4e;
  $color2:#8a8989;
  .qtlj-container {
    height:auto;
    // background:url('../imgs/qtlj.jpg') no-repeat;
    background-size:cover;
    // background-color: #f6f6f6;
    .qtlj-main{
      width:1200px;
      height:auto;
      margin:0 auto;
      padding:0px 10px 45px 10px;
      position: relative;
      overflow: hidden;
      .qtlj-title{
        text-align: center;
        .gxzx-t{
          font-size: 36px;
          color:#3e3a39;
          &:hover{
            cursor: pointer;
          }
        }
        .gxzx-b{
          margin:15px auto;
          width:80px;
          height: 1px;
          border-bottom: 1px solid #4548af
        }
        .gxzx-e{
          font-size: $fontSize;
          color:#9c9c9c
        }
        &:hover {
          .gxzx-t{
            cursor: pointer;
            color: #4548af;
          }
          .gxzx-e{
            color: #4548af;
          }
        }
      }
      .qtlj-m{
        width:100%;
        height: auto;
        margin-top:30px;
        display: flex;
        justify-content: space-between;
        .qtlj-item{
          width:135px;
          cursor: pointer;
          .item-logo{
            width:135px;
            height: 135px;
            border-radius: 50%;
            line-height: 135px;
            text-align: center;
            .iconfont{
              color:#ffffff;
              font-size: 60px;
            }
          }
          .item-txt{
            margin-top:20px;
            text-align: center;
            color:#3e3a39;
            font-size: 18px;
            line-height: 25px;
          }
          .icon0{
            background-color: #5cb7e2;
          }
          .icon1{
            background-color: #fdbd5d;
          }
          .icon2{
            background-color: #b39dd9;
          }
          .icon3{
            background-color: #ed8881;
          }
          .icon4{
            background-color: #5cb7e2;
          }
        }
      }
    }
  }
</style>
