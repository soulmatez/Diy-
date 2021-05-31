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
						<AttrImg :item="attr" />
						<AttrLink :link="attr.link" />
						<div class="item flex c">
							<div class="tit">短文描述：</div>
							<div class="input"><el-input type="textarea" maxlength="500" :rows="4" placeholder="请输入内容" v-model="attr.note.t"></el-input></div>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!--样式设置-->
		<template v-if="cur == 1">
			<div class="att-con-box">
				<div class="att-con-pd">
					<AttrText :text="attr.title" />
					<AttrBase :base="attr.base" />
					<AttrText :text="attr.note" :edit="false" />
					<div class="item">
						<div class="tit">模块间隙：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" :name="attr.base.m" :checked="!attr.base.m" @click="attr.base.m = false" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" :name="attr.base.m" :checked="attr.base.m" @click="attr.base.m = true" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import AttrText from '@/views/attr/text.vue';
import AttrImg from '@/views/attr/img.vue';
import AttrLink from '@/views/attr/link.vue';
import AttrBase from '@/views/attr/base.vue';
import module from '@/util/module.js';
export default {
	name: 'AttrTuwen',
	props: ['attr'],
	components: { AttrText, AttrImg, AttrLink, AttrBase },
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
