<template>
	<div id="">
		<el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      
      <router-link to='/assets_list'>
	  	 <el-menu-item index="1">
	        <i class="el-icon-menu"></i>
	        <span slot="title">资产统计</span>
	      </el-menu-item>
      </router-link>
     
     <router-link to='/assets_list'>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">资产列表</span>
      </el-menu-item>
      </router-link>
      
      <router-link to='/user_list'>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">用户列表</span>
      </el-menu-item>
      </router-link>
      
      <router-link to='/assets_type'>
       <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">资产类型管理</span>
      </el-menu-item>
      </router-link>
      
      <router-link to='/area_list'>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">区域管理</span>
      </el-menu-item>
      </router-link>
      
      <router-link to='/user_list'>
      <el-menu-item index="6">
        <i class="el-icon-document"></i>
        <span slot="title">数据库管理</span>
      </el-menu-item>
      </router-link>
    </el-menu>	
	</div>
</template>

<script>
	
  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data,_node,ele) {
      	 let key = this.$refs.tree.getCurrentKey();
      	console.log(key);
      	var router=data.router;
      	this.$router.push({name: router})
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style lang="less">
	@import "../assets/css/common.less";
	.el-menu {
     border-right:none; 
     background: @blue+20;
	}
	.el-menu-item{
		background:@blue;
		text-align:left;
		margin-bottom: 1px;
		i{
			color: @white;
		}
		color:@white;
	}
	.is-active{
		color: @blue;
		background:@white;
	}
	.el-menu-item:hover{
		background:@blue+(-50);
		color:@blue+60;
		i{
			color:@blue+40;
		}
	}
	.el-menu-item:focus {
    background-color:@white;
}
</style>
