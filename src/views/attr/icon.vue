<template>
	<div>
		<div class="item">
			<div class="tit">图标样式：</div>
			<div class="input">
				<div class="input-line">					
					<span class="sp1"><em class="radio" :class="icon.s==1?'on':''" @click="icon.s=1"></em> 默认</span>
					<span class="sp1"><em class="radio" :class="icon.s==2?'on':''" @click="icon.s=2"></em> 隐藏</span>
					<span class="sp1"><em class="radio" :class="icon.s==3?'on':''" @click="icon.s=3"></em> 自定义</span>
				</div>
				<template v-if="icon.s == 3">
					<div class="input-line">
						<div class="module-upload" v-if="icon.z">
							<img :src="icon.z + '?x-oss-process=style/h3'" class="avatar" />
							<i class="el-icon-close" @click="deleFile"></i>
						</div>
						<div class="module-upload" @click="selectImage" v-else>
							<i class="el-icon-camera-solid"></i>
							<input type="file" accept="image/*" name="file" id="fileupload" @change="upload" style="display: none;" />
						</div>
						<div class="tips">
							点击可添加图标
							<br />
							尺寸建议：60*60
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AttrIcon',
	props: ['icon'],
	data() {
		return {};
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
				that.icon.z = res;
				loading.close();
			});
		},

		//删除文件
		async deleFile() {
			const json = await this.$api.deleteFile({ m: 'get', q: { fileUrl: this.icon.z } });
			this.icon.z = '';
		}
	}
};
</script>
