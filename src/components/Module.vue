<template>
	<div id="module">
		<section class="section-module" v-for="(element, index) in moduleList" :key="index">			
			<div class="xcx-module-item" :class="selectIndex === index ? 'on' : ''" @click.stop="moduleClick(index)" @mouseenter="mouseovers(index)" @mouseleave="mouseout">		
				<template v-if="!prev">
					<span class="xline"></span>
					<span class="xline"></span>
					<span class="xline"></span>
					<span class="xline"></span>
				</template>
				<moduleNav :module="element" v-if="element.type == 1"/>				
				<moduleDuo :module="element" v-if="element.type == 2"/>			
				<modlueTuwen :module="element" v-if="element.type == 3"/>				
				<modlueGoods :module="element" v-if="element.type == 4"/>			
				<modlueTuijian :module="element" v-if="element.type == 5"/>	
			</div>
			<div class="placeholder" :data-index="index + 1" v-if="placeholder">放在这里</div>
		</section>
	</div>
</template>

<script>
import moduleNav from '@/views/module/nav.vue';
import moduleDuo from '@/views/module/duo.vue';
import modlueTuwen from '@/views/module/tuwen.vue';
import modlueGoods from '@/views/module/goods.vue';
import modlueTuijian from '@/views/module/tuijian.vue';
export default {
	name: 'Module',
	props: {
	 	'moduleList':{type:Array},
		'prev':{default:false}
	},
	components: { moduleNav, moduleDuo, modlueTuwen, modlueGoods,modlueTuijian },
	data() {
		return {
			placeholder: false,
			selectIndex: '', //选中
			activeIndex: '' //当前活动active
		};
	},

	methods: {
		//模块点击
		moduleClick(index) {
			this.selectIndex = index;
			this.$emit('moduleClick', index);
		},

		//鼠标移入模块
		mouseovers(index) {
			let top = event.target.getBoundingClientRect().top;
			this.$emit('moduleMouseovers', { top: top, index: index });
		},

		//鼠标离开模块
		mouseout() {
			this.$emit('moduleMouseout');
		}
	}
};
</script>
