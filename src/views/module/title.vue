<template>
	 <div class="module-item-title">
 		 <div class="tit">
						<moduleText :text="title.t" />
				</div>
				<div class="mo" v-if="title.m.s">
					<moduleText :text="title.m" />
				</div>
	 </div>	
</template>

<script>
	import moduleText from '@/views/module/text.vue'
	export default{
		  name:'moduleTitle',
				props:['title'],
				components:{ moduleText }				
	}
</script>
