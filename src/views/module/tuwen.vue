<template>
	<div class="module-item-tuwen" :style="!module.base.m ? 'margin-top:0' : ''">
		<div class="item-tuwen-con">
			<moduleBg :base="module.base" />
			<!--样式一-->
			<div class="item-tuwen-style1" v-if="module.base.s == 0">
				<p class="tit" v-if="module.title.s"><moduleText :text="module.title" /></p>
				<div class="item">
					<p v-if="module.img"><img :src="module.img" /></p>
					<p v-else><img :src="$util.icon('img.jpg')" alt=""></p>
					<div class="note" v-if="module.note.s"><moduleText :text="module.note" /></div>
				</div>
			</div>
			<!--样式二-->
			<div class="item-tuwen-style2" v-if="module.base.s == 1">
				<div class="item">
					<p v-if="module.img"><img :src="module.img" /></p>
					<p v-else><img :src="$util.icon('img.jpg')" alt=""></p>
					<p class="tit" v-if="module.title.s"><moduleText :text="module.title" /></p>
					<div class="note" v-if="module.note.s"><moduleText :text="module.note" /></div>
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
	methods: {}
};
</script>

<style></style>
