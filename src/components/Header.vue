<style scoped="scoped" lang="scss">
	 $color: #29c8a1;
	 .header{ background:#fff; display: flex; justify-content:space-between; align-items:center; padding:0 20px; height:65px; overflow: hidden; position: fixed; z-index:22; width:100%; top:0; left:0;
		  .fr{ display: flex; width:50%;  align-items:center; .el-button--primary{background-color:$color; border-color:$color;} }
		}
</style>
<template>
  <section class="header">
				<h4>小程序页面DIY</h4>
				<div class="fr">
							<el-button type="success" icon="el-icon-view" @click="$parent.showPreview=true">预览</el-button>
							<el-button type="primary" @click="save" icon="el-icon-circle-check">保存</el-button>
				</div>    
  </section>
</template>

<script>
export default {
  name: 'Header',  
		methods:{
			 save(){
					 this.$parent.save();
				} 
		}
}
</script>

