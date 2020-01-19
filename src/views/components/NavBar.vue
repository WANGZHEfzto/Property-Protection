<template>
  <div class="navbar-container">
    <div class="navbar">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               background-color="transparent" text-color="#fff" active-text-color="#0057f8" menu-trigger="hover">
        <el-menu-item index="index">首页</el-menu-item>
            <el-menu-item index="demand">需求库</el-menu-item>
            <el-submenu index="newsA">
              <template slot="title">新闻资讯库</template>
              <el-menu-item index="news">新闻资讯</el-menu-item>
              <el-menu-item index="etsi">ETSI披露</el-menu-item>
            </el-submenu>
            <el-menu-item index="user">用户中心</el-menu-item>
            <el-submenu index="product">
              <template slot="title">科技成果库</template>
              <el-menu-item index="patent">专利库</el-menu-item>
              <el-menu-item index="patentPortfolio">专利组合库</el-menu-item>
              <el-menu-item index="soft">软著库</el-menu-item>
              <el-menu-item index="product">其他成果库</el-menu-item>
            </el-submenu>
            <el-submenu index="userNav">
              <template slot="title">用户服务导航</template>
              <el-menu-item index="cgdj">成果登记</el-menu-item>
              <el-menu-item index="cgpj">成果评价</el-menu-item>
              <el-menu-item index="jzpg">价值评估</el-menu-item>
            </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'navbar',
    props: ['activeIndex'],

    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'ejly'
      ])
    },
    methods: {
      handleSelect(index) {
        this.goPage(index)
      },
      goProduct(name) {
      },
      goPage(page) {
        this.$router.push({
          path: `/${page}`
        })
      },
      ...mapMutations({
        setKeyword: 'SET_KEYWORD',
        setEjly: 'SET_EJLY',
        setPerson: 'SET_PERSON'
      })
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .navbar-container {
    width: 100%;
    height: 50px;
    background-color: #113579;
    .navbar {
      width: 815px;
      margin-left: auto;
      margin-right: auto;
      .el-menu.el-menu--horizontal {
        border: none 0;
        .el-submenu, .el-submenu__title, .el-menu-item {
          line-height: 50px;
          height: 50px;
          padding: 0 19px;
          font-size: 18px;
          &:hover {
            background-color: transparent !important;
            a {
              color: #0071d3;
            }
          }
          a {
            vertical-align: baseline;
          }
          &.is-active {
            /*border-bottom: none;*/
          }
        }
        .el-menu-item + .el-menu-item {
          margin-left: 22px;
        }
        .submenu-part01 {
          line-height: 38px;
          .el-menu-item + .el-menu-item {
            margin-left: 0px;
          }
          .el-menu-item {
            line-height: 40px;
            height: 40px;
          }
        }
        .el-submenu.first-menu .el-submenu__title {
          border: none;
          color: #fff !important;
          &:hover {
            color: #0071d3 !important;
          }
        }
        .el-submenu__title {
          /*margin-top: 2px;*/
          line-height: 50px;
          height: 50px;
        }
      }
      .el-submenu__icon-arrow {
        display: none;
      }
      //  .el-menu--horizontal>.el-menu-item.is-active{
      //    border-bottom: none;
      //  }
      .el-menu--horizontal .el-menu-item:focus,
      .el-menu--horizontal .el-menu-item:hover,
      .el-menu--horizontal .el-submenu__title:hover,
      .el-menu--horizontal .el-menu-item.is-active {
        color: #0057f8 !important;
        background-color: transparent !important;
        border-bottom: 2px solid #0057f8 !important;
      }
    }
  }

  //下拉菜单样式
  // .el-menu--horizontal .el-submenu > .el-menu {
  //   clear: both;
  //   top: 50px;
  //   left: -100px;
  //   width: 400px;
  //   height: 500px;
  //   background-color: #000 !important;
  //   opacity: 0.8;
  //   padding: 10px 0;
  //   .el-menu-item {
  //     line-height: 40px;
  //     height: 40px;
  //     .icon-item {
  //       line-height: 40px;
  //       font-size: 14px;
  //       color: #fff;
  //       .iconfont {
  //         margin-right: 12px;
  //       }
  //     }
  //     .icon-item.active {
  //       color: #0071d3;
  //       .iconfont {
  //         color: #0071d3;
  //       }
  //     }
  //     .icon-item:hover {
  //       color: #0071d3;
  //       .iconfont {
  //         color: #0071d3;
  //       }
  //     }
  //   }
  //   div {
  //     width: 200px;
  //     height: 100%;
  //     float: left;
  //   }
  //   .submenu-part01 {
  //     .el-menu-item + .el-menu-item {
  //       margin-left: 0px;
  //     }
  //   }
  //   .submenu-part01 + .submenu-part01 {
  //     border-left: 1px solid #393f48;
  //   }
  // }

  .index-container .banner .banner-content .nav .navbar .el-menu.el-menu--horizontal .submenu-part01 .el-menu-item {
    line-height: 40px;
    height: 40px;
    a {
      line-height: 40px;
      span {
        line-height: 40px;
      }
    }
  }

  #app .nest-menu .el-submenu > .el-submenu__title, #app .el-submenu .el-menu-item {
    background-color: transparent !important;
    margin-top: 0px;
    padding: 0 20px;
    a {
      display: inline-block;
      // width:150px;
      font-size: 14px;
      color: white;
      span {
        margin-left: 15px;
      }
      &:hover {
        color: #0071d3;
      }
    }
    &:hover {
      background-color: transparent !important;
    }
  }

</style>
