<template>
	 <div class="xcx-title" @click.stop="controlClick">
	 	<span class="el-icon-arrow-left" :style="fhstyle" v-if="title.fh.s"></span>
	 	<p class="tit" v-if="title.title.s"><moduleText :text="title.title" :name="name"/></p>
	 	<img src="@/assets/xcx.png" alt="" />
		<moduleBg :base="title.base" />
	 </div>
</template>

<script>	
	import moduleText from '@/views/module/text.vue';
	import moduleBg from '@/views/module/bg.vue';
	export default{
		 props:{
			 'title':{type:Object},
			 'name':{default:''},
			 'prev':{default:false}
		 },
		 components:{moduleText,moduleBg},
		 data(){
			 return{
			 }
		 },
		 
		 computed: {
		 	fhstyle() {
		 		if (this.title.fh.d) {
		 			let style = `font-size:${this.title.fh.f}px;color:${this.title.fh.c};`;
		 			if (this.title.fh.b) {
		 				style += 'font-weight:bold;';
		 			}
		 			if (this.title.fh.i) {
		 				style += 'font-style:italic;';
		 			}
		 			if (this.title.fh.u) {
		 				style += 'text-decoration:underline;';
		 			}
		 			return style;
		 		}
		 	}
		 },
		 
		 methods:{
			  controlClick(){
					if(!this.prev){
						this.$parent.controlClick(this.title.type);
					}
				}
		 }
	}
</script>

<style>
</style>
