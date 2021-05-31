<template>
	<span :style="style" v-if="name==''">{{ text.t }}</span>
	<span :style="style" v-else>{{ name }}</span>
</template>

<script>
export default {
	name: 'moduleText',
	props: {
		'text':{type:Object},
		'name':{default:''}
	},
	computed: {
		style() {
			if (this.text.d) {
				let style = `font-size:${this.text.f}px;color:${this.text.c};`;
				if (this.text.b) {
					style += 'font-weight:bold;';
				}
				if (this.text.i) {
					style += 'font-style:italic;';
				}
				if (this.text.u) {
					style += 'text-decoration:underline;';
				}
				return style;
			}
		}
	}
};
</script>
