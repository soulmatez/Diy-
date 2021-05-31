<template>
	<div>
		<div class="item c">
			<div class="tit">{{ text.p }}：</div>
			<div class="input flex">
				<template v-if="!edit">
					<div class="input-line">						
						<span class="sp1"><em class="radio" :class="!text.s?'on':''" @click="text.s = false"></em> 隐藏</span>
						<span class="sp1"><em class="radio" :class="text.s?'on':''" @click="text.s = true"></em> 显示</span>
					</div>
				</template>
				<template v-if="edit">
					<input type="text" :placeholder="text.p" maxlength="100" v-model="text.t" class="intxt" />
					<input type="checkbox" :checked="!text.s" @click="text.s = text.s ? false : true" class="checkbox" />隐藏
				</template>
			</div>
		</div>
		<div class="item" v-if="(text.s && edit) || (!edit && text.s)">
			<div class="tit">文字样式：</div>
			<div class="input">
				<div class="input-line">				
					<span class="sp1"><em class="radio" :class="!text.d?'on':''" @click="text.d = false"></em> 默认</span>
					<span class="sp1"><em class="radio" :class="text.d?'on':''" @click="text.d = true"></em> 自定义</span>
				</div>
				<template v-if="text.d">
					<div class="input-line">
						<div class="tit">字体大小：</div>
						<div class="input">
							<el-select v-model="text.f" placeholder="请选择">
								<el-option v-for="(item, index) in fontSizeList" :key="index" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</div>
					</div>
					<div class="input-line">
						<div class="tit">字体设置：</div>
						<div class="input f">
							<el-tooltip effect="dark" content="颜色" placement="top"><colorPicker v-model="text.c" defaultColor="#333" /></el-tooltip>
							<el-tooltip effect="dark" content="加粗" placement="top">
								<div class="font" :class="text.b ? 'on' : ''" @click="text.b = text.b ? false : true"><span class="iconfont icon-B"></span></div>
							</el-tooltip>
							<el-tooltip effect="dark" content="斜体" placement="top">
								<div class="font" :class="text.i ? 'on' : ''" @click="text.i = text.i ? false : true"><span class="iconfont icon-xieti"></span></div>
							</el-tooltip>
							<el-tooltip effect="dark" content="下划线" placement="top">
								<div class="font" :class="text.u ? 'on' : ''" @click="text.u = text.u ? false : true"><span class="iconfont icon-xiahuaxian1"></span></div>
							</el-tooltip>
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AttrText',
	props: {
		text: { type: Object },
		edit: { default: true },
		ispagetitle:{ default: false}, //是否标题
	},
	data() {
		return {
			fontSizeList: [
				{ label: '12px', value: 12 },
				{ label: '14px', value: 14 },
				{ label: '16px', value: 15 },
				{ label: '18px', value: 18 },
				{ label: '20px', value: 20 },
				{ label: '22px', value: 22 },
				{ label: '24px', value: 24 },
				{ label: '30px', value: 30 }
			]
		};
	},
	watch: {
		text:{
			handler:function(newv,oldv){
				//如果更改的是页面标题执行
				if(this.ispagetitle){
					this.$parent.$parent.$parent.name = newv.t;
					let pageindex = this.$parent.$parent.$parent.pageIndex;
					this.$parent.$parent.$parent.pageList[pageindex].name = newv.t;
				}
			},
			deep:true, 
		}
	},
	mounted() {
	}
};
</script>
