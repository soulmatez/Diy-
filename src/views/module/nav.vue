<template>	
	  <div class="module-item-nav module-common" :style="!module.base.m?'margin-top:0':''">
				 <moduleBg  :base="module.base" />
					<div class="item-nav-con" :class="module.base.c==5?'col5':''" v-if="module.base.s==0">
						<div class="item" v-for="(item,index) in module.list" @click="$util.openAttr(module.list,index)">
							<template v-if="item.icon.s!=2">								
								<img class="item-nav-img" :src="item.icon.z" v-if="item.icon.s==3 && item.icon.z">
								<img class="item-nav-img" :src="item.icon.p" v-else >
							</template>
							<div class="item-nav-text" :style="module.base.fc!=''?'color:'+module.base.fc:''" v-if="item.text.s">
							  <moduleText :text="item.text" />
							</div>
						</div>
					</div>					
			</div>
</template>

<script>
	import moduleText from '@/views/module/text.vue'
	import moduleBg from '@/views/module/bg.vue'
	export default{
		  props:['module'],
				components:{moduleText,moduleBg},
				data(){
					 return{
							 nav:[],
						}
				},
				computed:{
					  
				}
	}
</script>

<style>
</style>
