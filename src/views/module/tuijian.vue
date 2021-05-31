<template>
	<div class="module-item-tuijian" :style="!module.base.m ? 'margin-top:0' : ''">
		<div class="item-tuijian-con">
			<moduleBg :base="module.base" />
			<moduleTwtit :title="module.title" v-if="module.title.s" />
			<!--样式一-->
			<div class="item-tuijian-style1" v-if="module.base.s == 0">
				<div class="item" v-for="(item,index) in module.list" @click="$util.openAttr(module.list,index)" :key="index">
					<p v-if="item.img"><img :src="item.img" /></p>
					<p v-else><img :src="$util.icon('img.jpg')" alt=""></p>
					<div class="note" v-if="module.note.s"><moduleText :text="module.note" :name="item.m" /></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moduleBg from '@/views/module/bg.vue';
import moduleText from '@/views/module/text.vue';
export default {
	props: ['module'],
	components: { moduleBg, moduleText },
	data() {
		return {};
	},

	mounted() {},
	methods: {		 
	}
};
</script>

<style></style>
