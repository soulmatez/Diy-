<template>
	<div class="xcx-module-attr" @click.stop>	
			<AttrConHead :attr="attr" v-if="attr.type == 1" />
			<AttrConTopimg :attr="attr" v-if="attr.type == 2" />
	</div>
</template>

<script>
import '@/assets/css/attr.scss';
import AttrConHead from '@/views/attr/con_head.vue';
import AttrConTopimg from '@/views/attr/con_topimg.vue';
export default {
	name: 'conAttr',
	props: ['attr'],
	components: {AttrConHead, AttrConTopimg},
	mounted(){
		 
	}
};
</script>
