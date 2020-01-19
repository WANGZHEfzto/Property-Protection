<template>
  <div class="rdxw-container">
    <div class='rdxw-main'>
      <div class='rdxw-title'>
        <div class='gxzx-t'>热点新闻</div>
      </div>
      <div class='rdxw-m' v-loading='loading'>
        <div class='rdxw-p1'>
          <div class='p1-img'>
            <img :src="rdxwList1.src" alt="" v-if="rdxwList1.imageid">
            <span class='iconfont iconzanwutupian1' v-if="rdxwList1.length>0&&!rdxwList1.imageid"></span>
          </div>
          <div class='p1-c' @click="goNewUrl(rdxwList1.id)">
            <div class='p1-c-t'>{{rdxwList1.zxmc}}</div>
            <div class='p1-c-c'>{{rdxwList1.zxjj}}</div>
          </div>
        </div>
        <div class='rdxw-p2'>
          <div class='p2-main' v-for="(item,i) in rdxwList2" :key="i">
            <div class='p2-img'>
              <img :src="item.src" alt="" v-if="item.imageid">
              <!-- <img src="../imgs/default.png" alt="" v-if="!item.imageid"> -->
              <span class='iconfont iconzanwutupian1' v-if="!item.imageid"></span>
            </div>
            <div class='p2-content' @click="goNewUrl(item.id)">
              <div class='p2-c-t'>{{item.zxmc}}</div>
              <div class='p2-c-c'>{{item.zxjj}}</div>
              <div class='p2-c-f'>
                <span>{{item.fbsj}}</span>
                <span>{{item.lll}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br style='clear:both'/>
    </div>
  </div>
</template>

<script>
import {newsSearch} from '@/api/hdSearch3.js'
  export default {
    name: 'rdxw',
    props: {

    },
    data() {
      return {
        loading: false,
        rdxwList1: {
          // src: require('../imgs/1.png'),
          // zcmc: '中国信通院与新石器签署框架合作协议',
          // jdms: '2019年7月23日，新石器惠通（北京）科技有限公司（以下简称“新石器”）创始人，CEO余恩源，合作人刘淼等一行4人到中国信息通信研究院（以下简称“中国信通院”）进行了交流与xsakdsajdksajdsadj',
          // imageid: 1
        },
        rdxwList2: [
          // {
          //   src: require('../imgs/2.png'),
          //   zcmc: '实践出真实——工业互联网安全人才实操能力提升活动在打电话圣诞节倒计时得三十多',
          //   jdms: '为切实提升工业互联网安全人才的专业能力，加速安全人才能力从“新手”到“熟练”的过度，dasdiajdajdasdjalsd',
          //   zcfbsj: '2019-7-25',
          //   imageid: 1
          // },
          // {
          //   src: require('../imgs/3.png'),
          //   zcmc: '实践出真实——工业互联网安全人才实操能力提升活动在打电话圣诞节倒计时得三十多',
          //   jdms: '为切实提升工业互联网安全人才的专业能力，加速安全人才能力从“新手”到“熟练”的过度，dasdiajdajdasdjalsd',
          //   zcfbsj: '2019-7-25',
          //   imageid: 1
          // },
          // {
          //   src: require('../imgs/4.png'),
          //   zcmc: '实践出真实——工业互联网安全人才实操能力提升活动在打电话圣诞节倒计时得三十多',
          //   jdms: '为切实提升工业互联网安全人才的专业能力，加速安全人才能力从“新手”到“熟练”的过度，dasdiajdajdasdjalsd',
          //   zcfbsj: '2019-7-25',
          //   imageid: 1
          // }
        ]
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList(){
        this.loading=true
        newsSearch({},1,4).then(res=>{
          console.log(res)
          for(var item of res.content.dataList){
            item.src= process.env.BASE_API + '/Jlfilecontroller/download?id=' + item.imageid
          }
          this.rdxwList1=res.content.dataList[0]
          this.rdxwList2=res.content.dataList.slice(1)
          this.loading=false
        })
      },
      goNewUrl(id) {
        const { href } = this.$router.resolve({
        path: `/newsdetail`,
        query: { id: id }
        })
        window.open(href, '_blank')
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:18px;
  $fontSizeMini:14px;
  $color1:#4e4e4e;
  $color2:#8a8989;
  .rdxw-container {
    height:auto;
    // background:url('../imgs/rdxw.jpg') no-repeat;
    background-size:cover;
    margin:45px 0;
    .rdxw-main{
      width:1200px;
      height:auto;
      margin:0px auto;
      padding:25px 25px 0px 25px;
      position: relative;
      overflow: hidden;
      background-color: #fff;
      .rdxw-title{
        text-align: left;
        .gxzx-t{
          font-size: 28px;
          color:#3e3a39;
          &:hover{
            cursor: pointer;
          }
        }
      }
      .rdxw-m{
        height: auto;
        margin-top:20px;
        overflow: hidden;

        .rdxw-p1{
          width:615px;
          height:560px;
          float: left;
          &:hover{
            transition:all 0.4s linear;
            box-shadow: 0 0 20px 8px #d2d2d2;
            .p1-c .p1-c-t{
              color:#4548af
            }
          }
          .p1-img{
            height:430px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #eeeeee;
            img{
              height: 100%;
              width:100%;
              // height:auto;
              // width:auto
            }
            .iconfont{
              font-size:250px;
              color:#787474
            }
          }
          .p1-c{
            padding:20px 25px;
            background-color:#fff;
            cursor: pointer;
            .p1-c-t{
              font-size: $fontSize;
              color: $color1;
              cursor: pointer;
            }
            .p1-c-c{
              height:50px;
              margin-top:20px;
              font-size: $fontSizeMini;
              color:$color2;
              line-height: 25px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
        }
        .rdxw-p2{
          width:510px;
          height:560px;
          float: right;
          .p2-main{
            height:170px;
            background-color:#fff;
            &:hover{
              transition:all 0.4s linear;
              box-shadow: 0 0 20px 8px #d2d2d2;
            }
            .p2-img{
              float: left;
              width:255px;
              height:170px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: #eeeeee;
              .iconfont{
                font-size:90px;
                color:#787474
              }
              img{
                height: auto;
                width: auto;
                max-width: 255px;
                max-height:100%;
              }
            }
            .p2-content{
              float:right;
              width:250px;
              padding: 20px 0 20px 10px;
              cursor: pointer;
              &:hover{
                .p2-c-t{
                  color:#4548af
                }
              } 
              .p2-c-t{
                height:48px;
                font-size: $fontSize;
                color:$color1;
                line-height: 24px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                cursor: pointer;
              }
              .p2-c-c{
                height: 50px;
                font-size: $fontSizeMini;
                color:$color2;
                margin-top:15px;
                margin-bottom: 10px;
                line-height: 24px;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              .p2-c-f{
                font-size: 12px;
                color:$color2;
                span:nth-child(2){
                  // margin-left:100px;
                  float: right;
                }
              }
            }
            &:nth-child(2){
              margin:25px 0;
            }
          }
        }
      }
    }
  }
</style>
