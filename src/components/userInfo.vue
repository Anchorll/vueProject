<template>
 <div class="user-info">
      <img src="../assets/img/space1.jpg" class="head-img"/>
      <p class="nick-name">xxxxxxxx</p>
      <p class="moto">我们的征途是星辰大海</p>
 </div>
</template>

<script>
  export default {
      data() {
        return {
        };
      },
      methods: {
      }
    }
</script>

<style lang="less" scoped >
  @import "../assets/css/common.less";
  .user-info{
    width: 16.75%;
    padding: 0 1%;
    height: 50vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgba(0,0,0,0.15);
    color: @blackgray;
    margin-top: 10px;
    .head-img{
      width: 80px;
      height: 80px;
      border: 2px solid #ffffff;
      border-radius: 50%;
      margin-top:50px ;
    }
    .nick-name{
      margin: 20px 0;
    }
    .moto{
      text-align: left;
      font-size: 14px;
      color: @blackgray;
    }
  }
</style>
