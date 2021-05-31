<template>
	<div class="module-item-goods" :style="!module.base.m ? 'margin-top:0' : ''">
		<div class="item-goods-con" :style="style">
			<moduleBg :base="module.base" />
			<moduleTwtit :title="module.title" v-if="module.title.s" />
			<div class="item-goods-style1" :class="module.base.s == 1 ? 'style2' : ''">
				<div class="item" v-for="(item, index) in module.list" :key="index" @click="$util.openAttr(module.list,index)">
					<div class="pic">
						<img :src="item.cm.imgUrl + '?x-oss-process=style/a2'" alt="" />
						<template v-if="module.base.sth">
							<span v-if="item.cm.isPreferential === 1 && item.cm.type === 1">特惠</span>
							<span v-if="item.cm.isBuyGive === 1 && item.cm.type === 1">买赠</span>
						</template>
					</div>
					<div class="c">
						<div class="tit" v-if="module.base.t.s"><moduleText :text="module.base.t" :name="item.cm.name" /></div>
						<div class="price" v-if="module.base.sjg || module.base.sgm">
							<template v-if="module.base.sjg">
							<span v-if="item.cm.type == 1">
								<b>￥{{ item.cm.price }}</b>
								<i v-if="item.cm.originalPrice">￥{{ item.cm.originalPrice }}</i>
							</span>
							<span v-if="item.cm.type == 2">
								<b>{{ item.cm.priceDescribe }}</b>
							</span>
							</template>
							<template v-if="module.base.sgm">
								<label v-if="item.cm.type == 1 && $util.checkStart(item.cm.startTime) && item.cm.currSku > 0">立即购买</label>
								<label v-if="item.cm.type == 2 && $util.checkStart(item.cm.startTime) && item.cm.currSku > 0">立即领取</label>
								<label v-else-if="!$util.checkStart(item.cm.startTime)">预约提醒</label>
								<label v-if="item.cm.currSku <= 0" style="background:#aaa">已抢完</label>
							</template>
						</div>
						<template v-if="module.base.sjs">
							<p class="ju" v-if="$util.checkStart(item.cm.startTime)">距离活动结束:{{ showtime(item.cm) }}</p>
							<p class="ju" v-else>距离活动开始：{{ showtime(item.cm) }}</p>
						</template>
					</div>
				</div>
				<div class="noadd" v-if="module.list.length == 0"><el-button type="primary" size="mini" icon="el-icon-plus" @click="addGoods">添加商品</el-button></div>
			</div>
		</div>

		<!--添加商品弹窗-->
		<transition name="mask"><div class="comm-mask" v-if="showSelectGoods"></div></transition>
		<transition name="scale"><SelectGoods v-if="showSelectGoods" /></transition>
	</div>
</template>

<script>
import moduleBg from '@/views/module/bg.vue';
import moduleText from '@/views/module/text.vue';
import SelectGoods from '@/views/attr/selectGoods.vue';
export default {
	props: ['module'],
	components: { moduleBg, moduleText,SelectGoods },
	data() {
		return {
			 showSelectGoods:false,
		};
	},

	computed: {
		style() {
			if (this.module.base.fc != '') {
				return `color:${this.module.base.fc}`;
			}
		}
	},

	mounted() {},
	methods: {
		showtime(item) {
			let time = this.$util.getDownTime(item.startTime, item.endTime);
			if (time < 0) {
				return '活动已结束';
			}
			let re = this.$util.timeformat(time);
			return `${re.day}天${re.hour}时${re.minute}分${re.second}秒`;
		},	
		
		addGoods(){
			if(!this.$parent.prev){	this.showSelectGoods = true; }
		}
		
	}
};
</script>

<style></style>
