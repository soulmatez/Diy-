<template>
	<div>
		<div class="item c">
			<div class="tit">添加图片：</div>
			<div class="input flex">
				<div class="module-upload c" v-if="item.img">
					<img :src="item.img" class="avatar" />
					<i class="el-icon-close" @click="deleFile"></i>
				</div>
				<div class="module-upload c" @click="selectImage" v-else>
					<i class="el-icon-camera-solid"></i>
					<input type="file" accept="image/*" name="file" id="fileupload" @change="upload" style="display: none;" />
				</div>
				<div class="tips">点击更换图片<br/>图片大小一致</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AttrImg',
	props: ['item'],
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
				that.item.img = res;
				loading.close();
			});
		},

		//删除文件
		async deleFile() {			
			this.item.img = '';
		}
	}
};
</script>
