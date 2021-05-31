<template>
	 <div class="xcx-preview">
		 <span class="el-icon-close" @click="$parent.showPreview=false"></span>
		 <div class="xcx-module-container">
			 
			<!--控件部份-->
			<div v-for="(item,index) in controlList" :key="index">
				<!--页面标题-->
				<conTitle  :title="item" :name="name"  v-if="item.type==1 && item.check" :prev="true"/>			
			</div>	
			
			<div class="xcx-module">							
				<div v-for="(item,index) in controlList" :key="index">
					<!--顶部头图-->				
					<conTopimg :item="item" :prev="true" v-if="item.type==2 && item.check" />
				</div>								
				<!--DIY组件部份-->
				<Module :moduleList="moduleList" :prev="true" ref="module"/>
			</div>	 
		 </div>
	 </div>
</template>

<script>
	import Module from '@/components/Module.vue';
	import conTitle from '@/views/module/contitle.vue';
	import conTopimg from '@/views/module/contopimg.vue';
	 export default{
		  name:'Preview',
			props:{
				 controlList:{type:Array},
				 moduleList:{type:Array},
				 name:{default:''},
			},
			components:{Module,conTitle,conTopimg},
		  data(){
				return{					
				}
			},
			mounted(){
				
			}
	 }
</script>

