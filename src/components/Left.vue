<style scoped="scoped" lang="scss">
$color: #29c8a1;
.left {
	width: 450px;
	display: flex;
	background: #273239;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 0;
	height: 100%;
	.ul1 {
		width: 80px;
		padding-top: 65px;
		li {
			color: #8e9499;
			cursor: pointer;
			height: 100px;
			&.on {
				background: #1a242b;
				color: #fff;
			}
			&:hover {
				color: #fff;
			}
			i {
				font-size: 18px;
				padding-bottom: 5px;
			}
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			font-weight: bold;
			font-size: 14px;
		}
	}
	.leftcon{ flex:1; height:100%; background:#fff; overflow:hidden auto;border-left: 1px solid #eee;}
	.left-menu {
		padding-top: 65px;
		/deep/ .el-collapse-item__header {
			font-size: 14px;
			font-weight: bold;
			color:#444;
			padding-left: 12px;
		}
		.hm {
			border-top: 1px solid #eee;
			padding-top: 15px;
		}
		.item {
			&:hover {
				border-color: $color;
				box-shadow: #409eff 0 0 10px;
			}
			img {
				width: 100%;
			}
			cursor: move;
			text-align: center;
			padding: 10px;
			border: 1px solid #f7f7f7;
			float: left;
			width: 28%;
			margin-bottom: 15px;
			margin-left: 15px;
		}
	}
	.left-control{	
		padding-top:65px;
		ul{border-top:1px solid #eee; padding:0 20px;}
		ul li{
			height:50px; border:1px solid #eee; border-radius:5px; margin-top:12px; display: flex; background:#f7f7f7; padding:0 12px; justify-content:space-between; align-items:center; font-size:14px; color:#666;
			.fl{flex:1; cursor:pointer; height:50px; line-height:50px; &.on{ color:$color;} }
			.fr{
				  button{background:none; border:0; -webkit-appearance:none; &[disabled]:hover{ cursor:not-allowed; em{ color:#999;cursor:not-allowed; } } }
					em{ margin-left:8px; font-size:18px; color:#999; cursor:pointer; &:hover{ color:$color;} }
			}		
		}
		.add-page{ span{margin-right:12px;} cursor:pointer; height:45px; border:1px solid #eee; margin:20px; font-size:14px; display: flex; align-items:center; justify-content:center; background:$color; color:#fff; border-radius:40px;}
	}
}
</style>
<template>
	<div class="left">
		<ul class="ul1">
			<li :class="index === cur ? 'on' : ''" @click="cur = index" v-for="(item, index) in left" :key="index">
				<i :class="item.icon"></i>
				<span>{{ item.txt }}</span>
			</li>
		</ul>
		<!--模块-->
		<div class="leftcon">
		<!--页面-->
		<div class="left-control" v-if="cur===0">
			<ul>
				<li v-for="(item,index) in pageList" :key="index">
					<div class="fl" :class="item.id==id?'on':''" @click="changePage(index)">{{item.name}}</div>
					<div class="fr">
					<button type="button" @click="changePage(index)"><em class="el-icon-edit-outline"></em></button>
					<button type="button" :disabled="!item.iscopy"><em class="el-icon-copy-document"></em></button>
					<button type="button" :disabled="!item.isdel"><em class="el-icon-delete"></em></button></button>
					</div>
				</li>
			</ul>
			<div class="add-page" @click="$parent.addPage"><span class="el-icon-plus"></span> 新建自定义页面</div>
		</div>
		<div class="left-menu" v-if="cur===1">
			<el-collapse>
				<el-collapse-item :title="item.name" :name="index" v-for="(item, index) in list" :key="index">
					<div class="hm">
						<div class="item" v-for="(a, i) in item.base.sc" :key="i" @click="comClick(item, i)" @dragend="dragend" @dragstart="dragstart(item, i)" draggable="true">
							<img draggable="false" :src="$util.icon(a.p)" />
							<span>{{ a.t }}</span>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<!--控件-->
		<div class="left-control" v-if="cur===2">
			<ul style="border-top:1px solid #eee;">
				<li v-for="(item,index) in control" :key="index">
					<el-checkbox :disabled="item.type==1" @change="controlSelect(item)" :checked="item.check">{{item.name}}</el-checkbox>
				  <div class="fr"><em class="el-icon-edit-outline" @click.stop="$parent.controlClick(item.type)"></em></div>
				</li>
			</ul>
		</div>
		
		</div>		
		
		
	</div>
</template>
<script>
import module from '@/util/module.js';
export default {
	name: 'Left',
	data() {
		return {
			id:1,
			left: [{ txt: '页面', icon: 'el-icon-s-platform' }, { txt: '模块', icon: 'el-icon-menu' }, { txt: '控件', icon: 'el-icon-s-operation' }],
			cur: 0,
			list: [], //模块
			control:[], //控件
			pageList:[], //页面			
		};
	},

	mounted() {		
		//页面组件
		this.list = module.pageData;
		this.list.forEach((res, i1) => {
			res.base.sc.forEach((r, i2) => {
				r.p = 's' + (i1 + 1) + '_' + (i2 + 1) + '.png';
			});
		});	
		
		//控件
		this.control = module.controlData;
	},

	methods: {
		
		dragstart(item, style) {
			event.dataTransfer.setData('style', style);
			event.dataTransfer.setData('text', JSON.stringify(item));
			event.dataTransfer.effectAllowed = 'copyMove';
			this.$emit('placeholder', true);
		},
		
		dragend(item) {
			this.$emit('placeholder', false);
		},
		
		comClick(item, style) {
			let json = JSON.stringify(item);
			this.$emit('componentsClick', json, style);
		},
		
		selectcontrol(index){
			 this.$parent.pageList[this.$parent.pageIndex].controlList[index].check=true;
		},
		
		//切换页面
		changePage(index){
			this.id = this.pageList[index].id;
			this.$parent.changePage(this.id);
		},
		
		//控件选择
		controlSelect(item){
			 item.check = item.check ? false : true;
			 this.$parent.controlSelect(item);
		},
		
	}
};
</script>
