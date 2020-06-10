<template>
	<footer>
			公司资产管理系统Copyright © 2017-2019 
	</footer>
</template>

<script>
	export default {
		 data() {
      return {
        form: {
          name: '',
        	pwd:''
        }
      }
    },
    methods: {
      login() {
       	this.$router.push({name: 'index'})
      }
    }
	}
</script>

<style lang="less">
	@import "../assets/css/common.less";
	  footer{
	  	width:100%;
	  	position:relative;
	  	text-align:center;
	  	line-height:4vh;
	  	color:@blue ;
	  }
</style>