<template>
  <div class="content">
   <header class="header">后台管理系统</header>
  <div class="main">
   <left-navi class="leftnavi"></left-navi>
    <router-view class="panel" ></router-view>
  </div>
  </div>
</template>

<script>
  import LeftNavi from "@/components/admin/leftnavi.vue"
  export default {
      components:{
        LeftNavi
      },
      data() {
        return {
          isCollapse: true
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style lang="less">
  @import "../../assets/css/common.less";
 .main{
   display: flex;
   width: 100%;
    justify-content: space-between;
 }
.header{
  background-color: @blue;
  color: #FFFFff;
  height: 8vh;
  line-height: 8vh;
  padding: 0 20px;
  text-align: left;
}
.leftnavi{
  width: 15%;
}
.panel{
  width: 85%;
  min-height: 92vh;
}
</style>
