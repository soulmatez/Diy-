<style lang="scss" scoped="scoped">
.home{ width:100%; color:#409EFF; text-shadow:#fff 0 0 1px; height:100%; background:url(../assets/bg.jpg) no-repeat; background-size:cover; display: flex; flex-direction: column; justify-content: center; align-items:center;
 p{margin-top:10px; color:#409EFF}
 a{color:#F56C6C}
}
</style>
<template>
  <div class="home">
			<h1>小程序页面自由设计DIY</h1>
			<p>作者：神夜 源码联系：QQ:564379992 主页：<a href="http://www.hsycms.com" target="_blank">http://www.hsycms.com</a> </p>
			<p><el-button type="primary" @click="go()">点我开始</el-button></p>
  </div>
</template>

<script>
export default {
  name: 'index', 
		data(){
			 return{					 
				}
		},
		
		methods:{		
			  go(){
					this.$router.push({path:'diy'})
				}
		}
}
</script>
