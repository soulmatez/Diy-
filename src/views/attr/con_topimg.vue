<template>
	<div>
		<ul class="module-attr-tab">
			<li v-for="(item, index) in tab" :class="cur === index ? 'on' : ''" @click="cur = index">{{ item.name }}</li>
		</ul>
		<!--基础设置-->
		<template v-if="cur == 0">
			<div class="attr-con-item">元件设置</div>
			<div class="att-con-box">
				<div class="attr-nav-item">
					<div class="att-con-pd">
						<AttrImg  :item="attr" />
						<AttrText :text="attr.title" />
						<AttrText :text="attr.note" />				
					</div>
				</div>
			</div>
		</template>
		<!--样式设置-->
		<template v-if="cur == 1">
			<div class="att-con-box">
				<div class="att-con-pd">
					<AttrBase :base="attr.base.ubg" />
					<AttrBase :base="attr.base.dbg" name="上部背景" />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import AttrImg from '@/views/attr/img.vue';	
import AttrText from '@/views/attr/text.vue';
import AttrLink from '@/views/attr/link.vue';
import AttrBase from '@/views/attr/base.vue';
import module from '@/util/module.js';
export default {
	name: 'AttrConTopimg',
	props: ['attr'],
	components: {AttrImg, AttrText, AttrLink, AttrBase },
	data() {
		return {
			tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
			cur: 0
		};
	},

	methods: {		
	}
};
</script>

<style></style>
