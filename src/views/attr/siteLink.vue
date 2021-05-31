<style lang="scss" scoped="scoped">
/***连接弹窗***/
$color: #409eff;
.linkDialog {
	z-index: 999;
	overflow: hidden;
	font-size: 12px;
	max-width: 1200px;
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
		.linkd-menu {
			width: 200px;
			border-right: 1px solid #eee;
			li {
				padding: 12px;
				cursor: pointer;
				border-bottom: 1px solid #f1f1f1;
				color: #666;
				span {
					margin-right: 5px;
				}
				&.on,
				&:hover {
					color: $color;
					font-weight: bold;
				}
			}
		}
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
			.linkd-page-ht {
				display: flex;
				align-items: center;
				color: #666;
				ul {
					display: flex;
					li {
						transition: all 0.3s ease;
						&:hover,
						&.on {
							background: $color;
							color: #fff;
							border-color: $color;
						}
						cursor: pointer;
						margin-right: 12px;
						line-height: 30px;
						padding: 0 12px;
						height: 30px;
						border-radius: 3px;
						border: 1px solid #f1f1f1;
					}
				}
				.search {
					display: flex;
					/deep/ .el-input__inner {
						flex: 1;
						height: 30px;
						line-height: 30px;
						font-size: 12px;
					}
					.el-button {
						padding: 0 10px;
						height: 30px;
						margin-left: 10px;
					}
				}
			}
			.linkd-page-list {
				li {
					float: left;
					width: 20%;
					padding-left: 15px;
					padding-top: 15px;
					.card {
						background: #fff;
						box-shadow: #eee 0 0 10px;
						padding: 0 10px;
						h3 {
							padding: 10px 0;
							font-weight: normal;
							color: #666;
							text-align: center;
						}
						img {
							height: 200px;
							width: 100%;
							display: block;
						}
						p {
							padding: 10px;
							span {
								border: 1px solid #ddd;
								color: #888;
								cursor: pointer;
								&:hover {
									background: $color;
									color: #fff;
									border-color: $color;
								}
								border-radius: 3px;
								padding: 5px 10px;
							}
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
			.linkd-zdy {
				margin: 0 auto;
				margin-top: 20%;
				max-width: 60%;
				display: flex;
				.el-button {
					margin-left: 12px;
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
			<span class="el-icon-close" @click.stop="closeLink"></span>
		</div>
		<div class="linkd-box">
			<ul class="linkd-menu">
				<li v-for="(item, index) in menu" :class="index === cur ? 'on' : ''" @click="cur = index">
					<span :class="item.ico"></span>
					{{ item.txt }}
				</li>
			</ul>
			<div class="linkd-con">
				<!--商品-->
				<div class="linkd-shop" v-if="cur === 0">
					<form>
						<div class="linkd-search">
							<ul>
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
								<th width="20%">商品名称</th>
								<th>行业分类</th>
								<th>商品状态</th>
								<th>显示状态</th>
								<th>操作</th>
							</tr>
							<tr v-for="(item, index) in shopList" :key="index">
								<td>{{ item.id }}</td>
								<td>{{ item.name }}</td>
								<td>{{ item.shopCategoryName }}</td>
								<td>{{ item.statusStr }}</td>
								<td><el-button type="primary" icon="el-icon-check" v-if="item.shield === 0 && item.status != 4" @click="selectLink(item.id)" size="mini">选择</el-button></td>
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
				<!--文章连接-->
				<div class="linkd-shop" v-if="cur == 1">
					<div class="linkd-search">
						<ul>
							<li>
								<span class="t" style="min-width:75px;">关键词匹配：</span>
								<el-input v-model="arcquery.searchKeyWord" placeholder="请输入关键词"></el-input>
							</li>
							<li>
								<span class="t">文章作者：</span>
								<el-input v-model="arcquery.author" placeholder="文章作者"></el-input>
							</li>
							<li>
								<span class="t">文章标签：</span>
								<el-select v-model="arcquery.labelState" placeholder="选择文章标签">
									<el-option value=" " label="全部"></el-option>
									<el-option value="1" label="置顶"></el-option>
									<el-option value="2" label="精华"></el-option>
									<el-option value="3" label="热门"></el-option>
									<el-option value="4" label="全平台置顶"></el-option>
								</el-select>
							</li>
							<li>
								<el-button type="primary" @click="searchArc" icon="el-icon-search">搜索</el-button>
								<el-button type="danger" @click="clearArc" icon="el-icon-delete">清空</el-button>
							</li>
						</ul>
					</div>
					<template v-if="!nodata2">
						<table class="table" cellpadding="0" cellspacing="0" v-loading="loading2">
							<tr>
								<th>文章标题</th>
								<th>文章分类</th>
								<th>文章状态</th>
								<th>操作</th>
							</tr>
							<tr v-for="(item, index) in arcList" :key="index">
								<td width="20%">{{ item.title }}</td>
								<td>{{ item.categoryName1 }}</td>
								<td>{{ item.infoTypeStr }}</td>
								<td><el-button type="primary" icon="el-icon-check" @click="selectLink(item.publishId)" size="mini">选择</el-button></td>
							</tr>
						</table>

						<div class="diy-page">
							<el-pagination
								background
								layout="total, prev, pager, next, jumper"
								v-if="arcList.length > 0"
								:hide-on-single-page="true"
								@current-change="arcCurrent"
								@prev-click="arcCurrent"
								@next-click="arcCurrent"
								:total="arcTotal"
							></el-pagination>
						</div>
					</template>
					<template v-if="nodata">
						<div class="nodata">
							<p><img src="@/assets/nodata.png" alt="" /></p>
							<p>暂无文章!</p>
						</div>
					</template>
				</div>
				<!--自定义链接-->
				<div class="linkd-zdy" v-if="cur == 2">
					<el-input v-model="zdyLink" placeholder="请输入连接"></el-input>
					<el-button type="primary" @click="inputLink" icon="el-icon-circle-check">确定</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SiteLink',
	data() {
		return {
			cur: 0, //当前菜类型 1 商品 2 文章 3 页面链接 4 自定义链接
			menu: [{ id: 1, txt: '商品链接', ico: 'el-icon-shopping-bag-1' }, { id: 2, txt: '文章链接', ico: 'el-icon-message' }, { id: 4, txt: '自定义链接', ico: 'el-icon-set-up' }], //左侧菜单类型
			loading: true, //商品加载中
			nodata: false, //是否有商品数据
			shopCate: [], //店铺行业分类
			shopList: [], //商品列表
			shopTotal: 0, //商品总数
			shopquery: {
				size: 9, //每页显示9条
				current: 1, //当前页
				shopName: '', //店铺名称
				name: '', //商品名
				shopCategoryId: '', //行业ID			
			},
			arcCate: [], //文章分类
			arcSonCate: [], //二级分类
			arcList: [], //文章列表
			loading2: true, //加载文章
			nodata2: false, //是否有文章数据
			arcTotal: 0, //文章总数
			arcquery: {
				size: 9, //每页显示9条
				current: 1, //当前页
				searchKeyWord: '', //关键词
				author: '', //作者
				areaFullName: '', //区域
				labelState: '', //标签
				showState: '', //文章状态
				infoType: '', //文章类型
				category1: '', //分类一
				category2: '' //分类二
			},

			curpage: 0, //当前页面
			zdyLink: '' //自定义连接
		};
	},

	mounted() {
		this.getGoodsList();
		this.getArcList();
	},

	methods: {
		//获取商品列表
		async getGoodsList() { this.loading = false; this.loading2 = false; },

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

		//获取文章列表
		async getArcList() { this.loading2 = false; },

		arcCurrent(e) {
			this.arcquery.current = e;
			this.loading2 = true;
			this.getArcList();
		},

		//搜索文章
		searchArc() {
			this.loading2 = true;
			this.arcTotal = 0;
			this.nodata2 = false;
			this.arcList = [];
			this.arcquery.current = 1;
			this.getArcList();
		},

		//清空文章搜索
		clearArc() {
			this.loading2 = true;
			this.arcTotal = 0;
			this.nodata2 = false;
			this.arcList = [];
			this.arcquery.searchKeyWord = '';
			this.arcquery.author = '';
			this.arcquery.areaFullName = '';
			this.arcquery.labelState = '';
			this.arcquery.showState = '';
			this.arcquery.infoType = '';
			this.arcquery.category1 = '';
			this.arcquery.category2 = '';
			this.arcquery.current = 1;
			this.getArcList();
		},

		//选择
		selectLink(id) {
			this.$parent.link.m = this.menu[this.cur].txt;
			this.$parent.link.t = this.menu[this.cur].id;
			this.$parent.link.id = id;
			this.closeLink();
		},

		//自定义连接
		inputLink() {
			if (this.zdyLink == '') {
				this.$message.error('请输入链接');
				return;
			}
			if (!this.checkURL(this.zdyLink)) {
				this.$message.error('请输入正确的链接');
				return;
			}
			this.$parent.link.t = this.menu[this.cur].id;
			this.$parent.link.m = this.menu[this.cur].txt;
			this.$parent.link.p = this.zdyLink;
			this.closeLink();
		},

		checkURL(URL) {
			var str = URL;
			var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
			var objExp = new RegExp(Expression);
			if (objExp.test(str) == true) {
				return true;
			} else {
				return false;
			}
		},

		closeLink() {
			this.$parent.showSiteLink = false;
		}
	}
};
</script>

<style></style>
