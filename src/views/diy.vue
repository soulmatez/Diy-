<style scoped="scoped" lang="scss">
.page {
	height: 100%;
	background: #f1f1f1;
}
@import '../assets/css/diy.scss';
</style>
<template>
	<div class="page" @click="closeAttr">
		<!--头部-->
		<Header />

		<!--组件部分-->
		<Left ref="left" @componentsClick="componentsClick" @placeholder="placeholderFun" />
		
		<!--内容部份-->
		<div class="xcx-module-container">		
			<!--页面标题-->
			<div v-for="(item,index) in controlList" :key="index">
				<conTitle :title="item"  v-if="item.type==1 && item.check" :name="name"/>	
			</div>		
			
			<div class="xcx-module" ref="editorWrapper" @dragover.prevent @dragenter="dragenter" @dragleave="dragleave" @dragover="dragovers" @drop="drops">
				<!--顶部头图-->				
				<div v-for="(item,index) in controlList" :key="index">					
					<conTopimg :item="item" v-if="item.type==2 && item.check" />
				</div>				
				<div class="placeholder" :data-index="0" v-show="placeholder">放在这里</div>
				<!--DIY组件部份-->
				<Module :moduleList="moduleList" ref="module" @moduleClick="moduleClick" @moduleMouseovers="moduleMouseovers" @moduleMouseout="moduleMouseout" />
				<div class="xcx-nomodule" v-if="moduleList.length == 0 && !placeholder"><h2>拖动或点击左侧模块进行页面DIY</h2></div>
			</div>

			<!--操作-->
			<ul class="xcx-module-option" :style="'top:' + optionTop + 'px'" @mouseenter="showOption = true" @mouseleave="showOption = false" v-if="showOption && moduleList.length > 0">
				<li v-if="moduleList.length != 1 && activeIndex != 0" @click="up"><el-tooltip effect="dark" content="上移" placement="right"><span class="el-icon-top"></span></el-tooltip></li>
				<li @click="moduleList.splice(activeIndex, 1)"><el-tooltip effect="dark" content="删除" placement="right"><span class="el-icon-close"></span></el-tooltip></li>
				<li @click="copy"><el-tooltip effect="dark" content="复制" placement="right"><span class="el-icon-document-copy"></span></el-tooltip></li>
				<li v-if="moduleList.length != 1 && activeIndex != moduleList.length - 1" @click="down"><el-tooltip effect="dark" content="下移" placement="right"><span class="el-icon-bottom"></span></el-tooltip></li>
			</ul>
			
		</div>

		<!--模块属性-->
		<transition name="right"><Attr v-if="showAttr" :attr="curAttrData" /></transition>
		<!--控件属性-->
		<transition name="right"><conAttr v-if="showConAttr" :attr="conAttrData" /></transition>
		<!--预览-->
		<transition name="mask"><div class="comm-mask" v-if="showPreview"></div></transition>
		<transition name="scale"><Preview v-if="showPreview" :moduleList="moduleList" :controlList="controlList"/></transition>
		
		
		<el-dialog
		  title="提示"
		  :visible.sync="saveConfirm"
		  width="30%"
		  center>
		  <span>是否需要保存之前页面操作？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="saveConfirm = false">取 消</el-button>
		    <el-button type="primary" @click="save">确 定</el-button>
		  </span>
		</el-dialog>	
		
	</div>
</template>

<script>
import Header from '@/components/Header.vue';
import Left from '@/components/Left.vue';
import Module from '@/components/Module.vue';
import Attr from '@/components/Attr.vue';
import conAttr from '@/components/conAttr.vue';
import conTitle from '@/views/module/contitle.vue';
import conTopimg from '@/views/module/contopimg.vue';
import Preview from '@/views/preview.vue';
import '../assets/css/diy.scss';
import moduledata from '@/util/module.js'
export default {
	components: { Header, Left, Module, Attr, conAttr, conTitle, conTopimg, Preview },
	data() {
		return {
			id: '', //页面ID
			name: '', //页面名称	
			pageIndex:0, //当前页面
			pageList:[], //页面数据
			activeIndex: '',    //移上去模块
			selectIndex: '',    //选中模块
			placeholder: false, //显示空白区域
			showOption: false,  //显示操作按钮
			optionTop: 0,   //操作按钮距离顶部
			control:[], //初始化控件
			moduleList: [], //组件列表
			controlList:[], //控件列表
			showAttr: false,   //显示模块属性
			showConAttr:false, //显示控件属性
			curAttrData: [],   //当前属性数据
			conAttrData:[],    //当前控件属性数据
			saveData: [],     //保存数据
			saveConfirm:false,
			showPreview:false, //显示预览
		};
	},	


	mounted() {
		this.initPage();
	},
	

	methods: {
		
		//初始化页面
		initPage(){
			let control = JSON.stringify(moduledata.controlData[0]);
			console.log(control);
			let arr = [];
			arr.push(JSON.parse(control));
			this.pageList.push({moduleList:[],controlList:arr,name:'自定义页面1',id:1,iscopy:true,isdel:true});
			this.$refs.left.pageList = this.pageList;
			this.moduleList  = this.pageList[this.pageIndex].moduleList;
			this.controlList = this.pageList[this.pageIndex].controlList;
			this.name = this.pageList[this.pageIndex].name;
			this.controlList[0].title.t = this.name;
			this.pageToControl();
		},
		
		
		
		//左侧组件点击
		componentsClick(json, style) {
			let that = this;
			let item = JSON.parse(json);
			item.base.s = style;			
			this.pageList[this.pageIndex].moduleList.push(item);			
			this.$nextTick(() => {
				if (this.$refs.editorWrapper) {
					that.$util.scrollTop(this.$refs.editorWrapper, this.$refs.editorWrapper.scrollHeight, 500);
				}
			});
		},

		//空白区域
		placeholderFun(flag) {
			this.placeholder = flag;
			this.$refs.module.placeholder = flag;
		},

		//当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素上
		dragenter(event) {
			// 拖动到容器的“放到这里（它是个提示）”盒子，就给盒子加上焦点样式
			if (event.target.classList.contains('placeholder')) {
				event.target.classList.add('on');
			}
		},

		//当拖动的元素或文本选择离开有效的放置目标时将触发该事件。此事件作用在目标元素上（具体请看 html5 DataTransfer对象）
		dragleave(event) {
			// 离开目标容器的“放到这里（它是个提示）”盒子，就给盒子移除焦点样式
			if (event.target.classList.contains('placeholder')) {
				event.target.classList.remove('on');
			}
		},

		// 拖拽元素在目标元素上移动的时候触发的事件
		dragovers(event) {
			event.preventDefault();
		},

		// 拖拽组件区域元素的事件drop 被拖拽的元素在目标元素上同时鼠标放开触发的事件
		drops(event) {
			let style = event.dataTransfer.getData('style'); //获取样式
			let data = JSON.parse(event.dataTransfer.getData('text')); // 获取dragstart事件传递的参数
			data.base.s = parseInt(style);
			this.placeholder = false;
			if (event.target.classList.contains('placeholder')) {
				event.target.classList.remove('on');
			}
			event.dataTransfer.clearData(); // 清除dragstart事件传递的参数
			if (this.pageList[this.pageIndex].moduleList.length === 0) {
				this.pageList[this.pageIndex].moduleList.push(data);
			} else if (event.target.classList.contains('placeholder')) {
				let index = event.target.getAttribute('data-index');
				this.pageList[this.pageIndex].moduleList.splice(index, 0, data);
			} else {
			}
		},

		//模块获取焦点，显示操作按钮
		moduleMouseovers(item) {
			this.optionTop = item.top - 100;
			this.showOption = true;
			this.activeIndex = item.index;
		},

		// 容器失去焦点，隐藏按钮区域
		moduleMouseout() {
			this.showOption = false;
		},

		//上移
		up() {
			this.moduleList.splice(this.activeIndex - 1, 0, this.moduleList[this.activeIndex]);
			this.moduleList.splice(this.activeIndex + 1, 1);
			this.selectIndex = this.activeIndex - 1;
			this.showOption = false;
		},

		//下移
		down() {
			this.moduleList.splice(this.activeIndex + 2, 0, this.moduleList[this.activeIndex]);
			this.moduleList.splice(this.activeIndex, 1);
			this.showOption = false;
		},
		
		//复制模块
		copy(){
			let item = JSON.stringify(this.moduleList[this.activeIndex]);
			this.moduleList.push(JSON.parse(item));
		},

		//组件点击
		moduleClick(index) {
			this.selectIndex = index;
			this.showConAttr = false;
			this.showAttr = true;
			this.curAttrData = this.moduleList[this.selectIndex];
		},
		
		//控件点击显示属性
		controlClick(type){
			this.showAttr = false;
			this.showConAttr = true;
			this.controlList.forEach(res=>{
				 if(res.type==type){ 
					 this.conAttrData = res;
				 }
			},this)			
		},

		//关闭属性
		closeAttr() {
			this.showConAttr = false;
			this.showAttr = false;
		},

		//保存
		save() {
			console.log(this.pageList);
		},
		
		//控件选择
		controlSelect(item){
			let json = JSON.stringify(item);
					json = JSON.parse(json);
			let findex = this.controlList.findIndex(res=>res.type==json.type);
			if(findex==-1){				
				this.controlList.push(json); 
			}else{
				this.controlList.map(function(item){
					 if(item.type==json.type){ item.check = json.check;	}
				})
			}
		},
		
		//切换页面
		changePage(id){
			this.moduleList = [];
			this.controlList = [];
			this.pageList.forEach((res,index)=>{
				if(res.id == id){
					this.id = res.id;
					this.name = res.name;					
					this.pageIndex = index;
					this.moduleList = res.moduleList;
					this.controlList = res.controlList;					
					this.pageToControl();
				}
			},this)			
			this.controlList[0].title.t = this.name;
		},
		
		//页面数据对应控件
		pageToControl(){
			let leftcontrol = this.$refs.left.control;
			leftcontrol.forEach(res=>{ if(res.type!=1){ res.check = false;}	})	
			this.controlList.forEach(res=>{
				 if(res.check==true){
					  leftcontrol.map(function(item){
							  if(res.type==item.type){ item.check = true; }
						})
				 }
			})			
		},		
		
		//新增页面
		addPage(){
			let control = JSON.stringify(moduledata.controlData[0]);
			let arr = [];
					arr.push(JSON.parse(control));		
			let id = this.pageList.length+1;
			this.pageList.push({moduleList:[],controlList:arr,name:'自定义页面'+id,id:id,iscopy:true,isdel:true});
			this.$refs.left.pageList = this.pageList;
			this.$refs.left.control.forEach(res=>{ if(res.type!=1){ res.check = false;}	})
		}
		
	}
};
</script>
