  /**
			* 模块基本元素：
			* [s]  样式
			* [sc] 样式内容 [t样式名称 p 样式图标]
			* [m]  模块间距 [true有 false无]
			* [c]  列数 [4列 5列表]
			* [bg] 背景 [1默认 2隐藏 3自定义]
			* [bt] 背景类型 [1颜色填充 2背景图片] 
			* [bc] 背景颜色
			* [bi] 背景图片
			* [fc] 文字颜色
			*/
		const base = {s:0,m:true,c:4,bg:1,bt:1,bc:'#ffffff',bi:'',fc:''}
		/**
			* 文字设置
			* [p] 提示文字
			* [t] 标题文字 
			* [e] 副标题  
			* [m] 描述
			* [s] 是否显示 [true显示 false隐藏]
			* [d] 标题样式 [false默认 true自定义]
			* [f] 字体大小 number 
			* [c] 标题颜色 #ffffff		
			* [b] 是否加粗 [true是 false否]
			* [i] 是否斜体 [true是 false否]
			* [u] 有下划线 [true是 false否]
			*/		
		const text = {e:'',m:'',s:true,d:false,f:14,c:'#333333',b:false,i:false,u:false};
		
		/**
		* 图标文字
		* [o]  展开 [false隐藏 true展开]
		* [link] 跳转连接 [g 是否跳转 |t 1商品 2文章 3页面 4自定义连接 | m 描述 ｜ id 商品或文章id | p 路径]
		* [icon] 图标 [s 1默认 2隐藏 3自定义 | p 默认路径 ｜ z 自定义路径 ]
		*/
	 const link = {g:false,t:'',m:'',id:'',p:''};
	 const defaultimg = require('@/assets/img.jpg');
   const icontext = [{o:false,link:link,icon:{s:1,p:defaultimg,z:''},text:{p:'导航名称',t:'标题名称',...text}}];
  
		//多功能列表
		const imgtext  = [{o:false,link:link,img:defaultimg,text:{p:'图文名称',t:'标题名称',...text}}];
		
		/**
			* 商品列表
			* [o]  展开 [false隐藏 true展开]
			* [t]  商品名称 ...text
			* [th] 商品特惠 [false隐藏 true显示]
			* [yh] 商品优惠 [false隐藏 true显示]
		 * [gm] 商品购买 [false隐藏 true显示]
			* [jl] 商品距离结束 [false隐藏 true显示]
			* [js] 倒计时显示
			* [cm] 商品内容
			*/
		const shop = {o:false,cm:{}}
		
		/**
			* 推荐模块
			* [o] 展开 [false隐藏 true展开]
			* [img] 图片
			* [g]  跳转方式 [false不跳转 true自定义]
			* [gc] 跳转连接 [t 1商品 2文章 3页面 4自定义连接 | p 路径]
			* [m]  描述
			*/
		const arc = [{o:false,img:defaultimg,link:{g:false,t:'',p:''},m:'推荐图文描述内容推荐图文描述内容推荐图文描述内容'}]
		
		//页面数据 【type:1 导航模块 2 多功能模块 3 图文模块 4 商品模块 5 推荐模块】
		const pageData = [
				 /**
						* 导航模块
						* name 导航名称 ｜ type 导航标识 ｜ base 基础样式 ｜ list 导航列表 | max 最多添加15｜
						*/
					{ 
							name:'导航模块', 
								type:1, 
								base:{...base,sc:[{t:'样式一',p:''}]},
								max:15,
								list:[...icontext,...icontext,...icontext,...icontext,...icontext,...icontext,...icontext,...icontext],									
					},	
					/**
						* 多功能模块
						* name 名称 ｜ type 2 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加12｜ title  t标题 m更多 link连接
						*/				
					{
						 name:'多图模块',
							type:2, 
							base:{sc:[{t:'样式1',p:''},{t:'样式2',p:''},{t:'样式3',p:''},{t:'样式4',p:''}],...base},								
							title:{t:{p:'模块标题',t:'自义定模块标题',...text},m:{p:'更多文字',t:'更多',...text},link:{g:false,t:'',m:'',id:'',p:''}},
							max:12,
							list:[...imgtext,...imgtext,...imgtext,...imgtext,...imgtext,...imgtext,...imgtext,...imgtext],
					},
					/**
						* 图文模块
						* name 名称 ｜ type 3 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 列表 | max 最多添加6｜
						*/	
					{
						 name:'单图模块',
							type:3, 
							base:{sc:[{t:'样式1',p:''},{t:'样式2',p:''}],...base},
							title:{p:'模块标题',t:'自义定模块标题',...text},								
							note:{p:'短文描述',t:'描述文字描述文字描述文字描述文字描述文字描述文字描述文字描述文字',...text},
							img:defaultimg,
							link:link
					},
					/**
						* 商品模块
						* name 名称 ｜ type 4 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 商品列表 | max 最多添加4｜
						* base [t 商品标题 sth显示特惠 sjg显示价格 sgm 显示购买 sjs 显示结束时间]
						*/
					{
						 name:'商品模块',
							type:4, 
							base:{sc:[{t:'样式1',p:''},{t:'样式2',p:''}],...base,t:{p:'商品标题',t:'商品标题名称',...text},sth:true,sjg:true,sgm:true,sjs:true},
							title:{p:'模块标题',t:'商品模块标题',...text},
							max:4,
							list:[],
					},
					/**
						* 推荐模块
						* name 名称 ｜ type 5 标识 ｜ base 基础样式 ｜ title 标题 ｜ list 商品列表 | max 最多添加6｜
						*/
					{
						  name:'推荐模块', 
							type:5, 
							base:{sc:[{t:'样式1',p:''}],...base},
							note:{p:'短文描述',t:'',...text},
							title:{p:'模块标题',t:'推荐模块标题',...text},
							max:6,
							list:[...arc,...arc,...arc,...arc,...arc,...arc],
					},
		]
		
		const control = [
			{
				name:'顶部导航',
				type:1, 
				title:{p:'页面标题',t:'页面标题',...text},
				fh:{p:'返回箭头',t:'返回箭头',...text},
				link:link,
				base:base,
				check:true,
			},	
			{
				name:'顶部头图',
				type:2, 
				img:defaultimg,
				title:{p:'用户名称',t:'用户名称',...text},
				note:{p:'简介内容',t:'简介：个人描述个人描述个人描述个人描述个人描述个人描述',...text},
				base:{ubg:base,dbg:base},
				check:false,
			},
		]
		
	export default{
		moduleNav:icontext,
		moduleShop:shop,
		moduleArc:arc,
		moduleDuo:imgtext,
		pageData:pageData,
		controlData:control,
	}