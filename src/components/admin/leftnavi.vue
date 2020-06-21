<template>
  <div class="leftnavi">
   <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu
     :default-active="$route.path"
     class="el-menu-vertical-demo"
     @open="handleOpen"
     @close="handleClose"
     :collapse="isCollapse"
     :router="true"
     >
      <el-menu-item v-for="(item,index) in menu" :key="index" :index="item.path">
       <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        menu:[
          {name:"首页",path:"/admin/adindex"},
          {name:"文章管理",path:"/admin/articleManage"},
          {name:"标签管理",path:"/admin/tagManage"},
          {name:"分类管理",path:"/admin/kindManage"},
          // {name:"用户管理",path:"/admin/adindex"}
        ]
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

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
