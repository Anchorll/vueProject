<template>
  <div class="content">
    <div class="navibtn">
      <el-button class="btn" v-for="(item,index) in kinds" :key="index+item.id" @click="getKindArtList(item.id)">{{item.name}}</el-button>
    </div>
    <List :getList="getList" class="lista"></List>
  </div>
</template>

<script>
 import userInfo from '@/components/userInfo.vue'
 import List from '@/components/list.vue'
  export default{
    components:{
     userInfo,
     List
    },
    data () {
      return{
       kinds:[
         {name:"111",id:"11111"},
         {name:"111",id:"11111"},
         {name:"111",id:"11111"},
         {name:"111",id:"11111"},
         {name:"111",id:"11111"},
       ]
      }
    },
    mounted() {
       this.getKind()
    },
    methods:{
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      },
      handleSelectionChange(val) {
      },
      handleClose(done) {
      },
      getList(params){
       return this.$http.get('/api/post-article/aritclePage',{params:{
          pageNo:1,
          pageSize:10
        }}).then( res => {
            return res
        })
      },
      getKind(){
         this.$http.get('/api/kind/showKinds').then( res => {
          this.kinds=res.data.content
         })
      },
      getKindArtList(id){
        /* console.log(id)/post-article/singleKind */
      }
    }
  }
</script>

<style scoped lang="less">
  .content{
    position: relative;
    display: flex;
    justify-content: space-between;
    .navibtn{
      width: 20%;
      .btn{
        width: 80%;
        margin: 5px 0;
        border: none;
        color: #ca0c16;
      }
    }
    .lista{
      width: 80%;
    }
  }
</style>
