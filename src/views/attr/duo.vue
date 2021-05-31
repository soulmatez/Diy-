<template>
	<div>
		<ul class="module-attr-tab">
			<li v-for="(item, index) in tab" :class="cur === index ? 'on' : ''" @click="cur = index">{{ item.name }}</li>
		</ul>
		<!--基础设置-->
		<template v-if="cur == 0">
			<div class="attr-con-item">元件设置</div>
			<div class="att-con-box">
				<div class="attr-nav-item" v-for="(item, index) in attr.list" :key="index">
					<div class="ht">
						<div class="t" :class="item.o ? 'on' : ''" @click="item.o = item.o ? false : true">
							多功能图文{{ index + 1 }}
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
							<AttrText :text="item.text" />
							<AttrImg :item="item" />
							<AttrLink :link="item.link" />
						</div>
					</transition>
				</div>
				<div class="attr-nav-add" v-if="attr.list.length < attr.max" @click="addNavList">
					<span class="el-icon-circle-plus-outline"></span>
					最多添加{{ attr.max }}个
				</div>
			</div>
		</template>
		<!--样式设置-->
		<template v-if="cur == 1">
			<div class="att-con-box">
				<div class="att-con-pd">
					<AttrText :text="attr.title.t" />
					<AttrText :text="attr.title.m" />
					<AttrLink :link="attr.title.link" />
					<AttrBase :base="attr.base" :type="attr.type" />
					<div class="item c">
						<div class="tit mg">文字颜色：</div>
						<div class="input">
							<el-tooltip effect="dark" content="颜色" placement="top"><colorPicker v-model="attr.base.fc" :defaultColor="attr.base.fc" /></el-tooltip>
						</div>
					</div>
					<div class="item c" v-if="attr.base.s == 0">
						<div class="tit">模块排列：</div>
						<div class="input">
							<div class="input-line">
								<el-select v-model="attr.base.c" placeholder="请选择排列">
									<el-option label="1列" value="1"></el-option>
									<el-option label="2列" value="2"></el-option>
									<el-option label="3列" value="3"></el-option>
									<el-option label="4列" value="4"></el-option>
								</el-select>
							</div>
						</div>
					</div>
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
	name: 'AttrDuo',
	props: ['attr'],
	components: { AttrText, AttrImg, AttrLink, AttrBase },
	data() {
		return {
			tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
			cur: 0
		};
	},

	methods: {
		//添加导航
		addNavList() {
			this.$util.addItem(this.attr.list,module.moduleDuo[0]);
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
