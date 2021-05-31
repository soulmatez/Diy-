<template>
	<div>
		<div class="item">
			<div class="tit" v-if="name==''">模块背景：</div>
			<div class="tit" v-else>{{name}}：</div>
			<div class="input">
				<div class="input-line">					
					<span class="sp1"><em class="radio" :class="base.bg==1?'on':''" @click="base.bg=1"></em> 默认</span>
					<span class="sp1"><em class="radio" :class="base.bg==2?'on':''" @click="base.bg=2"></em> 隐藏</span>
					<span class="sp1"><em class="radio" :class="base.bg==3?'on':''" @click="base.bg=3"></em> 自定义</span>
				</div>
				<template v-if="base.bg == 3">
					<div class="input-line">
						<div class="tit">颜色类型：</div>
						<div class="input">
							<el-select v-model="base.bt" placeholder="请选择颜色类型">
								<el-option label="颜色填充" :value="1"></el-option>
								<el-option label="图片填充" :value="2"></el-option>
							</el-select>
						</div>
					</div>
					<div class="input-line"  v-if="base.bt==1">
						<div class="tit">背景颜色：</div>
						<div class="input f">
							<el-tooltip effect="dark" content="颜色" placement="top"><colorPicker v-model="base.bc" defaultColor="#333" /></el-tooltip>
						</div>
					</div>
					<div class="input-line"  v-if="base.bt==2">
						<div class="tit">背景图片：</div>
						<div class="input f">
							<div class="module-upload" v-if="base.bi">
								<img :src="base.bi + '?x-oss-process=style/h3'" class="avatar" />
								<i class="el-icon-close" @click="deleFile"></i>
							</div>
							<div class="module-upload" @click="selectImage" v-else>
								<i class="el-icon-camera-solid"></i>
								<input type="file" accept="image/*" name="file" id="fileupload" @change="upload" style="display: none;" />
							</div>
							<div class="tips">点击上传背景图</div>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div class="item" v-if="base.sc && base.sc.length>1">
			<div class="tit">样式选择：</div>
			<div class="input attr-style">
				<dl class="style" v-for="(item, index) in base.sc" @click="base.s = index">
					<dd><img :src="$util.icon(item.p)" alt="" /></dd>
					<dd>
						<el-radio v-model="base.s" :label="index">{{ item.t }}</el-radio>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AttrBase',
	props: {
		'base':{type:Object},
		'type':{default:0},
		'name':{default:''},
	},
	data() {
		return {};
	},
	
	mounted(){
	},

	methods: {
		selectImage() {
			document.getElementById('fileupload').click();
		},

		async upload(e) {
			var that = this;
			let file = e.target.files[0];
			let arr = [];
			arr.push({ name: file.name, size: file.size, path: file });
			let loading = this.$loading({ text: '上传中' });
			this.$util.uploadImg(arr, function(res) {
				that.base.bi = res;
				loading.close();
			});
		},

		//删除文件
		async deleFile() {
			const json = await this.$api.deleteFile({ m: 'get', q: { fileUrl: this.base.bi } });
			this.base.bi = '';
		}
	}
};
</script>

<style></style>
