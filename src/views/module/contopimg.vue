<template>
	 <div class="xcx-page-topimg" @click.stop="controlClick">	 
			<p class="pic">
				<img :src="item.img" v-if="item.img">
			</p> 
			<p class="tit" v-if="item.title.s"><moduleText :text="item.title" /></p>
			<div class="note" v-if="item.note.s"><moduleText :text="item.note" /></div>
			<moduleBg class="bg" :base="item.base.dbg" />
			<moduleBg :base="item.base.ubg" />
	 </div>
</template>

<script>	
	import moduleText from '@/views/module/text.vue';
	import moduleBg from '@/views/module/bg.vue';
	export default{
		 name:'conTopimg',
		 props:{
			 'item':{type:Object},
			 'prev':{default:false}
		 },
		 components:{moduleText,moduleBg},
		 data(){
			 return{				 
			 }
		 },	
		 methods:{
			  controlClick(){
					if(!this.prev){
						this.$parent.controlClick(this.item.type);
					}
			  }
		 }
	}
</script>

<style>
</style>
