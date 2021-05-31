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
							商品列表{{ index + 1 }}
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
							<div class="goods">
								<img :src="item.cm.imgUrl + '?x-oss-process=style/h3'" alt="" />
								<div class="text">
									<p class="p1">{{ item.cm.name }}</p>
									<p v-if="item.cm.currencyCouponList && item.cm.type == 1">￥{{ item.cm.currencyCouponList[0].decreaseMoney }} 无门槛</p>
									<p v-if="item.cm.type == 2">{{ item.cm.priceDescribe }}</p>
								</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="attr-nav-add" v-if="attr.list.length < attr.max" @click="showSelectGoods = true">
					<span class="el-icon-circle-plus-outline"></span>
					最多添加{{ attr.max }}个
				</div>
			</div>
		</template>
		<!--样式设置-->
		<template v-if="cur == 1">
			<div class="att-con-box">
				<div class="att-con-pd">
					<AttrText :text="attr.title" />
					<AttrBase :base="attr.base" />
					<div class="item">
						<div class="tit">模块间隙：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" name="m" :checked="!attr.base.m" @click="attr.base.m = false" value="0" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" name="m" :checked="attr.base.m" @click="attr.base.m = true" value="1" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
					<AttrText :text="attr.base.t" :edit="false" />
					<div class="item">
						<div class="tit">商品特惠：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" name="sth" :checked="!attr.base.sth" @click="attr.base.sth = false" value="0" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" name="sth" :checked="attr.base.sth" @click="attr.base.sth = true" value="1" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="tit">商品价格：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" name="sjg" :checked="!attr.base.sjg" @click="attr.base.sjg = false" value="0" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" name="sjg" :checked="attr.base.sjg" @click="attr.base.sjg = true" value="1" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="tit">商品购买：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" name="sgm" :checked="!attr.base.sgm" @click="attr.base.sgm = false" value="0" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" name="sgm" :checked="attr.base.sgm" @click="attr.base.sgm = true" value="1" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
					<div class="item">
						<div class="tit">商品结束：</div>
						<div class="input">
							<div class="input-line">
								<span class="sp1">
									<input class="radio" name="sjs" :checked="!attr.base.sjs" @click="attr.base.sjs = false" value="0" type="radio" />
									隐藏
								</span>
								<span class="sp1">
									<input class="radio" name="sjs" :checked="attr.base.sjs" @click="attr.base.sjs = true" value="1" type="radio" />
									显示
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!--添加商品弹窗-->
		<transition name="mask"><div class="comm-mask" v-if="showSelectGoods"></div></transition>
		<transition name="scale"><SelectGoods v-if="showSelectGoods" /></transition>
	</div>
</template>

<script>
import AttrText from '@/views/attr/text.vue';
import AttrBase from '@/views/attr/base.vue';
import SelectGoods from '@/views/attr/selectGoods.vue';
export default {
	name: 'AttrGoods',
	props: ['attr'],
	components: { AttrText, AttrBase, SelectGoods },
	data() {
		return {
			tab: [{ name: '基础设置', content: '' }, { name: '样式设置', content: '' }],
			cur: 0,
			showSelectGoods: false
		};
	},

	methods: {
		//上移
		up(arr, index) {
			arr.splice(index - 1, 0, arr[index]);
			arr.splice(index + 1, 1);
		},
		//下移
		down(arr, index) {
			arr.splice(index + 2, 0, arr[index]);
			arr.splice(index, 1);
		},
	}
};
</script>

<style></style>
