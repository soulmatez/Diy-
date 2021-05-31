
<template>
	 <div>
			<div class="item">
					<div class="tit">跳转方式：</div>
					<div class="input">
						<div class="input-line"> 
						<span class="sp1"><em class="radio" :class="!link.g?'on':''" @click="link.g=false"></em> 不跳转</span>
						<span class="sp1"><em class="radio" :class="link.g?'on':''" @click="link.g=true"></em> 自定义</span>
						</div>
						<div class="input-line" v-if="link.g">
							 		<div class="tit"><el-button type="primary" @click="openLink" icon="el-icon-link">设置跳转</el-button></div>
							 		<div class="input">
							 			 <input type="text" readonly="readonly" class="intxt" :value="link.m" placeholder="请设置导航链接">
							 		</div>
						</div>
					</div>
			</div>								
			
			
			<!--设置连接弹窗-->
			<transition name="mask"><div class="comm-mask" v-if="showSiteLink"></div></transition>
			<transition name="scale"><SiteLink v-if="showSiteLink" /></transition>
			
		</div>
</template>

<script>
	import SiteLink from '@/views/attr/siteLink.vue'
	export default{
		  name:'AttrLink',
				props:['link'],
				components:{SiteLink},
				data(){
					 return{	
						   showSiteLink:false
						}
				},
				mounted(){
					
				},
			 methods:{								
					  openLink(){
								 this.showSiteLink = true;
							}
				}
	}	
</script>
