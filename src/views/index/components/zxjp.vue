<template>
  <div class="zxjp-container">
    <div class='zxjp-main'>
      <div class='zxjp-title'>
        <div class='gxzx-t' @click="goPage('')">专项精品</div>
        <div class='gxzx-b'></div>
        <div class='gxzx-e'>Special Boutique</div>
      </div>
      <div class='zxjp eltabs' v-loading='loading'>
        <el-tabs v-model="activeName" @tab-click="getProduct">
          <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab, i) in tabs" :key="i">
            <div class="zxjp-m">
              <div class='zxjp-part' v-for="(item,i) in zxjpList" :key="i" @click="goPage('')">
                <div class='zxjp-img'>
                  <img :src="item.src" alt="" v-if="item.imageid">
                  <span class='iconfont iconzanwutupian1' v-if="!item.imageid"></span>
                </div>
                <div class='zxjp-content'>
                  <div class='content-t'>{{item.kcm}}</div>
                  <!-- <div class='content-a'>{{item.pxsxm}}</div> -->
                  <div class='content-d'>
                    <span class='wrap'>{{item.con1}}</span><br>
                    <span class='no-wrap'> <b>申请号：</b>{{item.con2}}</span><br>
                    <span class='no-wrap'> <b>申请人：</b> {{item.con3}}</span><br>
                    <span class='zxjp-f-t'> <b>申请日期：</b> {{item.tjsj}}</span>
                    <!-- <span>{{item.con4}}</span> -->
                  </div>
                  <!-- <div class='content-f'>
                      <span class='zxjp-f-t'> <b>申请日期：</b> {{item.tjsj}}</span>
                  </div> -->
                </div>
              </div>
            </div>
            
          </el-tab-pane>
        </el-tabs>
      </div>
    <br style='clear:both'/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'zxjp',
    props: {

    },
    data() {
      return {
        loading: false,
        activeName: '专利信息',
        tabs: [
          { label: '专利信息', name: '专利信息' },
          { label: '软著信息', name: '软著信息' },
          { label: '科技成果信息', name: '科技成果信息' },
          { label: '专利组合信息', name: '专利组合信息' }
        ],
        zxjpList: [
          {
            src: require('../imgs/1.png'),
            kcm: '主推课程A',
            zz: '李玉冰',
            con1: '一句话描述一句话描述一句话描述一句话描述一句话描述一句话描述',
            con2: '1.一句话描述一句话描述',
            con3: '2.一句话描述一句话描述',
            con4: '3.一句话描述一句话描述',
            tjsj: '2019-09-01',
            imageid: 1
          },
          {
            src: require('../imgs/2.png'),
            kcm: '主推课程B',
            zz: '李玉冰',
            con1: '一句话描述一句话描述一句话描述一句话描述一句话描述一句话描述',
            con2: '1.一句话描述一句话描述',
            con3: '2.一句话描述一句话描述',
            con4: '3.一句话描述一句话描述',
            tjsj: '2019-09-01',
            imageid: 1
          },
          {
            src: require('../imgs/3.png'),
            kcm: '主推课程C',
            zz: '李玉冰',
            con1: '一句话描述一句话描述一句话描述一句话描述一句话描述一句话描述',
            con2: '1.一句话描述一句话描述',
            con3: '2.一句话描述一句话描述',
            con4: '3.一句话描述一句话描述',
            tjsj: '2019-09-01',
            imageid: 1
          },
          {
            src: require('../imgs/1.png'),
            kcm: '主推课程D',
            zz: '李玉冰',
            con1: '一句话描述一句话描述一句话描述一句话描述一句话描述一句话描述',
            con2: '1.一句话描述一句话描述',
            con3: '2.一句话描述一句话描述',
            con4: '3.一句话描述一句话描述',
            tjsj: '2019-09-01',
            imageid: 1
          }
        ],
        listQuery: {
          kcmc: '',
          bjr: '',
          kcfl: '',
          ztkc: '1',
          zdkc: '1',
          sort: 'desc'
        },
        startRow: 1,
        pageRow: 10
      }
    },
    mounted() {
      // this.getZtkcList()
    },
    methods: {
      getZtkcList() {
        this.loading = true
        zdkc().then((res) => {
          for (var item of res.content.dataList) {
            if (item.imageid && item.imageid.indexOf(',') !== -1) {
              item.src = process.env.BASE_API + '/Jlfilecontroller/download?id=' + item.imageid.split(',')[0]
            } else {
              item.src = process.env.BASE_API + '/Jlfilecontroller/download?id=' + item.imageid
            }
            item.tjsj = item.tjsj ? item.tjsj.slice(0, 4) + '-' + item.tjsj.slice(4, 6) + '-' + item.tjsj.slice(6, 8) : ''
          }
          this.zxjpList = res.content.dataList
          this.loading = false
        })
      },
      getProduct() {},
      goPage(msg) {
        localStorage.zxjpMsg = msg
        // this.$router.push({
        //   path: `/zxjp`
        // })
        const { href } = this.$router.resolve({
          path: `/zxjp`
        })
        window.open(href, '_blank')
      },
      goNewPage(e) {
        // window.location.href = e
        window.open(e, '_blank')
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  $fontSize:18px;
  $fontSizeMini:14px;
  $color1:#4e4e4e;
  $color2:#8a8989;
  .zxjp-container {
    height:auto;
    // background:url('../imgs/zxjp.jpg') no-repeat;
    background-size:cover;
    // background-color: #f6f6f6;
    .zxjp-main{
      width:1200px;
      height:auto;
      margin:0 auto;
      padding:0px 10px 25px 10px;
      position: relative;
      overflow: hidden;
      .zxjp-title{
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
      .zxjp{

      }
      .zxjp-m{
        height: auto;
        padding:20px 10px;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        .zxjp-part{
          width:265px;
          height:385px;
          // height:auto;
          background-color: #ffffff;

          .zxjp-img{
            width:265px;
            height:170px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #e5e3e3;
            .iconfont{
              font-size: 90px;
              color: #787474
            }
            img{
              width: auto;
              height: auto;
              max-width:265px;
              max-height:170px;
            }
          }
          .zxjp-content{
            padding:20px;
            .content-t{
              padding-bottom: 20px;
              font-size: $fontSize;
              color:$color1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              border-bottom: 1px solid #eee;
            }
            .content-a{
              max-height:30px;
              font-size: $fontSizeMini;
              color:$color2;
              margin-bottom: 10px;
              line-height: 15px;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .content-d{
              height:auto;
              font-size: $fontSizeMini;
              color:$color2;
              line-height: 24px;
              .wrap{
                word-break: break-all;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                display:inline-block;
                -webkit-line-clamp: 2;
                overflow: hidden;
              }
              span{
                display:inline-block;
                width:100%;
                &:hover{
                  // color:#4548af
                }
              }
            }
            .content-f{
              font-size: $fontSizeMini;
              color:$color2;
              border-top:1px solid #d2d2d2;
              margin-top:20px;
              padding-top: 15px;
              a{
                margin-left:70px;
              }
            }
          }
          &:hover{
            transition: all .4s linear 0s;
            box-shadow: 0px 0px 10px 3px #b2d1eb;
            cursor: pointer;
            // height: auto;
            // .content-d{
            //   transition: all .4s linear 0s;
            //   height: 60px;
            //   text-overflow: inherit;
            //   display: inherit;
            //   -webkit-box-orient: vertical;
            //   -webkit-line-clamp: 0;
            //   overflow: inherit;
            // }
            .zxjp-content .content-t{
              color:#4548af
            }
            // z-index: 10;
          }
        }
      }
    }
    .icon {
      width: 4em;
      height: 4em;
      vertical-align: -0.15em;
      fill: red;
      color:red;
      overflow: hidden;
    }
  }
</style>
