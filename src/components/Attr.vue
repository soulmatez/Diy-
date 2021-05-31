<template>
	<div class="xcx-module-attr" @click.stop>
		<AttrNav :attr="attr" v-if="attr.type == 1" />
		<AttrDuo :attr="attr" v-if="attr.type == 2" />
		<AttrTuwen :attr="attr" v-if="attr.type == 3" />
		<AttrGoods :attr="attr" v-if="attr.type == 4" />
		<AttrTuijian :attr="attr" v-if="attr.type == 5" />	
	</div>
</template>

<script>
import '@/assets/css/attr.scss';
import AttrNav from '@/views/attr/nav.vue';
import AttrDuo from '@/views/attr/duo.vue';
import AttrTuwen from '@/views/attr/tuwen.vue';
import AttrGoods from '@/views/attr/goods.vue';
import AttrTuijian from '@/views/attr/tuijian.vue';
export default {
	name: 'Attr',
	props: ['attr'],
	components: { AttrNav, AttrDuo, AttrTuwen, AttrGoods, AttrTuijian},
	mounted(){
		 
	}
};
</script>
