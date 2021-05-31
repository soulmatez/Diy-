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
					<div class="attr-nav-item" v-for="(item, index) in attr.list" :key="index">
						<div class="ht">
							<div class="t" :class="item.o ? 'on' : ''" @click="item.o = item.o ? false : true">
								推荐图文{{ index + 1 }} 
								<span class="el-icon-arrow-down"></span>
							</div>
							<div class="opt">
								<el-button type="primary" v-if="index != 0" @click="up(attr.list, index)" icon="el-icon-arrow-up" circle></el-button>
								<el-button type="primary" v-if="index != attr.list.length - 1" @click="down(attr.list, index)" icon="el-icon-arrow-down" circle></el-button>
								<el-button type="danger" @click="attr.list.splice(index, 1)" icon="el-icon-delete" circle></el-button>
							</div>
						</div>
						<transition name="down">
							<div class="hm" v-if="item.o">
									<AttrImg  :item ="item" />
									<AttrLink :link="item.link" />
									<div class="item flex c">
										<div class="tit">短文描述：</div>
										<div class="input">
												<el-input	type="textarea" maxlength="500"	:rows="4"	placeholder="请输入内容"		v-model="item.m"></el-input>									
										</div>
									</div>
							</div>
						</transition>
					</div>
					<div class="attr-nav-add" v-if="attr.list.length < attr.max" @click="addNavList">
						<span class="el-icon-circle-plus-outline"></span>
						最多添加{{ attr.max }}个
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
								<span class="sp1"><em class="radio" :class="!attr.base.m?'on':''" @click="attr.base.m = false"></em> 隐藏</span>
								<span class="sp1"><em class="radio" :class="attr.base.m?'on':''" @click="attr.base.m = false"></em> 显示</span>
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
	name: 'AttrTuijian',
	props: ['attr'],
	components: { AttrText, AttrImg, AttrLink, AttrBase },
	data() {
		return {
			tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
			cur: 0
		};
	},

	methods: {
		//添加
		addNavList() {
			this.$util.addItem(this.attr.list,module.moduleArc[0]);
		},
		//上移
		up(arr, index) {
			arr.splice(index - 1, 0, arr[index]);
			arr.splice(index + 1, 1);
		},
		//下移
		down(arr, index) {
			arr.splice(index + 2, 0, arr[index]);
			arr.splice(index, 1);
		}
	}
};
</script>

<style></style>
