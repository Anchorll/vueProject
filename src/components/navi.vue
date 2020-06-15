<template>
 <div>
    <header>
     <div class="blog-info">
       <p class="blog-title">xxxxxxxxx</p>
       <p class="weather-info">天气预报|公告</p>
     </div>
     <div class="menu">
         <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item  v-for="(item,index) in menu " :key="index" :index="item.path">{{item.name}}</el-menu-item>

        </el-menu>
     </div>
    </header>
 </div>
</template>

<script>
  export default {
      data() {
        return {
          activeIndex: '/Index',
          menu:[
            {name:"首页",path:"/Index"},
            {name:"管理",path:"/Manage"},
            {name:"问答",path:"/Question"},
          ]
        };
      },
      methods: {
        handleSelect(key, keyPath) {
         this.$router.push(keyPath[0])
        }
      }
    }
</script>

<style lang="less" scoped >
  header{
  /*  background-image: url(../assets/img/space2.jpg);
    background-position: center;
    background-size: cover; */
  }
 @import "../assets/css/common.less";
.blog-info{
  position: relative;
  height: 10vh;
  color:@red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .blog-title{
    font-size: 20px;
    font-weight: 700;
    padding: 0 40px;
  }
}
.menu{
  position:relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background-color: @blackgray ;
}
.el-menu.el-menu--horizontal {
    border-bottom: none;
}
.el-menu-demo{
  width: 75%;
  .el-menu-item{
    padding:0 20px ;
  }
}
</style>
