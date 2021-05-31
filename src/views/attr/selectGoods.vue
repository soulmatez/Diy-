<style lang="scss" scoped="scoped">
/***连接弹窗***/
$color: #409eff;
.linkDialog {
	z-index: 999;
	overflow: hidden;
	font-size: 12px;
	max-width: 1000px;
	position: fixed;
	left: 0;
	right: 0;
	margin: auto;
	top: 10%;
	background: #fff;
	border-radius: 5px;
	box-shadow: #555 0 0 12px;
	.linkd-ht {
		display: flex;
		justify-content: space-between;
		align-items: center;
		span {
			cursor: pointer;
		}
		span:hover {
			color: $color;
		}
		font-size: 15px;
		height: 45px;
		padding: 0 12px;
		border-bottom: 1px solid #f1f1f1;
	}
	.linkd-box {
		display: flex;
		height: 650px;
	}
	.linkd-box {
		.linkd-con {
			flex: 1;
			padding: 20px;
			height: 100%;
			overflow: hidden auto;
			&::-webkit-scrollbar {
				width: 0;
			}
			.linkd-search {
				color: #666;
				margin-bottom: 12px;
				ul {
					display: flex;
					li {
						display: flex;
						align-items: center;
						padding-right: 12px;
						padding-bottom: 10px;
						.t {
							min-width: 60px;
						}
						/deep/ .el-input__inner {
							flex: 1;
							height: 30px;
							line-height: 30px;
							font-size: 12px;
						}
						/deep/ .el-select {
							flex: 1;
							font-size: 12px;
						}
						/deep/ .el-input__icon {
							line-height: 30px;
						}
						.el-button {
							padding: 0 10px;
							height: 30px;
						}
						.ml {
							margin-left: 5px;
						}
						&:last-child {
							justify-content: flex-end;
						}
					}
				}
			}
			.table {
				font-size: 12px;
				width: 100%;
				border-top: 1px solid #f1f1f1;
				border-right: 1px solid #f1f1f1;
				th,
				td {
					padding: 8px 5px;
					text-align: center;
					color: #777;
					border-left: 1px solid #f1f1f1;
					border-bottom: 1px solid #f1f1f1;
				}
				th {
					padding: 12px 0;
				}
				tr td:last-child {
					width: 100px;
				}
				tr:hover td {
					background: #f8f8f8;
				}
			}
		}
		.diy-page {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 12px;
		}
	}
}
</style>
<template>
	<!--设置连接-->
	<div class="linkDialog" @click.stop>
		<div class="linkd-ht">
			链接选择
			<span class="el-icon-close" @click.stop="closeSelect"></span>
		</div>
		<div class="linkd-box">
			<div class="linkd-con">
				<!--商品-->
				<div class="linkd-shop">
					<form>
						<div class="linkd-search">
							<ul>
								<li>
									<span class="t">店铺名称：</span>
									<el-input v-model.trim="shopquery.shopName" placeholder="请输入店铺名称"></el-input>
								</li>
								<li>
									<span class="t">商品名称：</span>
									<el-input v-model.trim="shopquery.name" placeholder="请输入商品名称"></el-input>
								</li>
								<li>
									<span class="t">行业分类：</span>
									<el-select placeholder="请选择行业分类" v-model="shopquery.shopCategoryId">
										<el-option :label="item.title" :value="item.id" v-for="(item, index) in shopCate" :key="index"></el-option>
									</el-select>
								</li>
							</ul>
							<ul>
								<li>
									<span class="t">显示状态：</span>
									<el-select placeholder="选择显示状态" v-model="shopquery.status">
										<el-option label="显示状态" value=" "></el-option>
										<el-option label="未开始" value="1"></el-option>
										<el-option label="展示中" value="2"></el-option>
										<el-option label="已抢完" value="3"></el-option>
										<el-option label="已下架" value="4"></el-option>
									</el-select>
								</li>
								<li>
									<span class="t">商品状态：</span>
									<el-select placeholder="选择商品状态" v-model="shopquery.shield">
										<el-option label="商品状态" value=" "></el-option>
										<el-option label="正常" value="0"></el-option>
										<el-option label="系统屏蔽" value="1"></el-option>
										<el-option label="人工屏蔽" value="2"></el-option>
									</el-select>
								</li>
								<li>
									<el-button type="primary" @click="searchGoods" icon="el-icon-search">搜索</el-button>
									<el-button type="danger" @click="clearGoods" icon="el-icon-delete">清空</el-button>
								</li>
							</ul>
						</div>
					</form>
					<template v-if="!nodata">
						<table class="table" cellpadding="0" cellspacing="0" v-loading="loading">
							<tr>
								<th width="10%">商品ID</th>
								<th width="20%">店铺名称</th>
								<th width="20%">商品名称</th>
								<th>行业分类</th>
								<th>商品状态</th>
								<th>显示状态</th>
								<th>操作</th>
							</tr>
							<tr v-for="(item, index) in shopList" :key="index">
								<td>{{ item.id }}</td>
								<td>{{ item.shopName }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.shopCategoryName }}</td>
								<td>{{ item.statusStr }}</td>
								<td>{{ item.shieldStr }}</td>
								<td><el-button type="primary" v-if="item.shield === 0 && item.status != 4" icon="el-icon-check" @click="selectGoods(item)" size="mini">选择</el-button></td>
							</tr>
						</table>

						<div class="diy-page">
							<el-pagination
								background
								layout="total, prev, pager, next, jumper"
								v-if="shopList.length > 0"
								:hide-on-single-page="true"
								@current-change="shopCurrent"
								@prev-click="shopCurrent"
								@next-click="shopCurrent"
								:total="shopTotal"
							></el-pagination>
						</div>
					</template>
					<template v-if="nodata">
						<div class="nodata">
							<p><img src="@/assets/nodata.png" alt="" /></p>
							<p>暂无商品!</p>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import module from '@/util/module.js';
export default {
	name: 'SelectGoods',
	data() {
		return {
			loading: true, //商品加载中
			nodata: false, //是否有商品数据
			shopCate: [], //店铺行业分类
			shopList: [], //商品列表
			shopTotal: 0, //商品总数
			shopquery: {
				size: 12, //每页显示9条
				current: 1, //当前页
				shopName: '', //店铺名称
				name: '', //商品名
				shopCategoryId: '', //行业ID
				status: '', //商品状态
				shield: '' //显示状态
			}
		};
	},

	mounted() {
		this.getShopCategory();
		this.getGoodsList();
	},

	methods: {
		//获取分类
		async getShopCategory() {
			
		},

		//获取商品列表
		async getGoodsList() {
			this.loading = false;
		},

		//商品点击当前页上一下下一页
		shopCurrent(e) {
			this.shopquery.current = e;
			this.loading = true;
			this.getGoodsList();
		},

		//搜索商品
		searchGoods() {
			this.loading = true;
			this.shopTotal = 0;
			this.nodata = false;
			this.shopList = [];
			this.shopquery.current = 1;
			this.getGoodsList();
		},

		//清空商品搜索
		clearGoods() {
			this.loading = true;
			this.shopTotal = 0;
			this.nodata = false;
			this.shopList = [];
			this.shopquery.current = 1;
			this.shopquery.shopName = '';
			this.shopquery.name = '';
			this.shopquery.shopCategoryId = '';
			this.shopquery.status = '';
			this.shopquery.shield = '';
			this.getGoodsList();
		},

		//选择
		selectGoods(item) {
			let arr = JSON.stringify(module.moduleShop);
			let goods = JSON.parse(arr);
			goods.cm = item;
			let flag = true;
			if (typeof this.$parent.attr != 'undefined') {
				this.$parent.attr.list.forEach(res=>{
					 if(res.cm.id==item.id){ flag = false;}
				})
				if(flag){
					this.$parent.attr.list.push(goods);
				}else{
					this.$message.error('不能选择重复商品');
					return false;
				}
			}
			if (typeof this.$parent.module != 'undefined') {
				this.$parent.module.list.forEach(res=>{
					 if(res.cm.id==item.id){ flag = false;}
				})
				if(flag){
					this.$parent.module.list.push(goods);
				}else{
					this.$message.error('不能选择重复商品');
					return false;
				}
			}
			this.closeSelect();
		},

		closeSelect() {
			this.$parent.showSelectGoods = false;
		}
	}
};
</script>

<style></style>
