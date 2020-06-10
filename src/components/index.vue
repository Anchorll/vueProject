<template>
	<div id="">
			<header-vue></header-vue>
			<!--<img src="https://att.jitashe.org/data/attachment/pdfimg/298/298971/1.png"/>-->
			<el-row>
				<el-col :span="4" class="left-navi">
					<left-navi :style="{height:autoheight}"></left-navi>
				</el-col>
				<el-col :span="20" class="main">
					<router-view class="showpanel"  ref="showpanel" />
					<footer-nav ref="footer"></footer-nav>
				</el-col>
			</el-row>
	</div>
</template>

<script>
	import FooterNav from './footer.vue';
	import HeaderVue from './header.vue';
	import LeftNavi from './navi.vue';
	export default {
		components:{
			FooterNav,
			HeaderVue,
			LeftNavi
		},
		 data() {
      return {
       autoheight:"90vh",
       h:100
      }
    },
    methods: {
    },
    mounted(){
    	
	},
	watch:{
		
	}
}
</script>

<style lang="less">
	@import "../assets/css/common.less";
  @import "../assets/css/index.less";
</style>
<style scoped>
  
</style>