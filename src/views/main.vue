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
/* .bg{
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-image: url(../assets/img/space4.jpg);
  background-position: center;
  background-size: cover;
  -webkit-filter:blur(5px);
  	filter:blur(5px);
} */
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
