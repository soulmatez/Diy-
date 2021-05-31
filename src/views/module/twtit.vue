<template>
	 <div class="module-item-twtit">
			 <moduleText :text="title" />
	 </div>	
</template>

<script>
	import moduleText from '@/views/module/text.vue'
	export default{
		  name:'moduleTwtit',
				props:['title'],
				components:{ moduleText }				
	}
</script>
