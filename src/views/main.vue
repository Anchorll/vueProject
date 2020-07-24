<template>
 <div class="content">
   <!-- <div class="bg"></div> -->
 <header-navi></header-navi>
 <div class="main">
   <!-- <user-info></user-info> -->
   <router-view class="panel" ></router-view>
 </div>
 </div>

</template>


<script>
  import headerNavi from '@/components/navi.vue'
   // import userInfo from '@/components/userInfo.vue'
  export default{
    components:{
      headerNavi,
     /* userInfo */
    }
  }
</script>

<style lang="less">
@import "../assets/css/common.less";
.content{
  background-color: @whitegray;
}
.main{
  width: 80%;
  position:relative;
  margin: 0 auto;
  min-height: 81.5vh;
  padding-bottom: 20px;
  .panel{
    margin-top: 10px;
    width: 100%;
    padding:0 0 20px 0 ;
  }
}
</style>
