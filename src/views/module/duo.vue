<template>
	<div class="module-item-duo" :style="!module.base.m ? 'margin-top:0' : ''">
		<moduleTitle :title="module.title" v-if="module.title.t.s" />
		<div class="item-duo-con" :style="style">
			<moduleBg :base="module.base" />
			<!--样式一-->
			<div class="item-duo-style1" :class="'col' + module.base.c" v-show="module.base.s == 0">
				<div class="item" v-for="(item, index) in module.list" :key="index" @click="$util.openAttr(module.list,index)">
					<div class="c">
						<p class="pic"><img :src="item.img" v-if="item.img" /><img v-else :src="$util.icon('img.jpg')" alt=""></p>
						<p class="txt" v-if="item.text.s"><moduleText :text="item.text" /></p>
					</div>
				</div>
			</div>
			<!--样式二-->
			<div class="item-duo-style2" v-show="module.base.s == 1">
				<swiper class="item" ref="mySwiper" :options="swiperOption1" v-if="module.list.length>0">
					<swiper-slide v-for="(item, index) in module.list" :key="index">
						<p class="pic"><img :src="item.img" v-if="item.img" /><img v-else :src="$util.icon('img.jpg')" alt=""></p>
						<p class="txt" v-if="item.text.s"><moduleText :text="item.text" /></p>
					</swiper-slide>
				</swiper>
			</div>
			<!--样式三-->
			<div class="item-duo-style3" v-show="module.base.s == 2">
				<swiper class="item" ref="mySwiper2" :options="swiperOption2">
					<swiper-slide v-for="(item, index) in module.list" :key="index" v-if="module.list.length>0">
						<p class="pic"><img :src="item.img" v-if="item.img" /><img v-else :src="$util.icon('img.jpg')" alt=""></p>
						<p class="txt" v-if="item.text.s"><moduleText :text="item.text" /></p>
					</swiper-slide>
				</swiper>
			</div>
			<!--样式四-->
			<div class="item-duo-style4" v-show="module.base.s == 3">
				<swiper class="item" ref="mySwiper3" :options="swiperOption3">
					<swiper-slide v-for="(item, index) in module.list" :key="index" v-if="module.list.length>0">
						<p class="pic"><img :src="item.img" v-if="item.img" /><img v-else :src="$util.icon('img.jpg')" alt=""></p>
						<p class="txt" v-if="item.text.s"><moduleText :text="item.text" /></p>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
		</div>
	</div>
</template>
<script>
import moduleBg from '@/views/module/bg.vue';
import moduleText from '@/views/module/text.vue';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import Swiper2, { Pagination } from 'swiper';
Swiper2.use([Pagination]);
import 'swiper/swiper-bundle.css';
let that = null;
export default {
	props: ['module'],
	components: { moduleBg, Swiper, SwiperSlide, moduleText },
	directives: { swiper: directive },
	data() {
		return {
			nav: [],
			swiperOption1: {
				slidesPerView: 4,
				spaceBetween: 10,
				observer: true,
				observeParents: true,
				loop: false,
				on:{
					click:function(e){
						that.$util.openAttr(that.module.list,e.clickedIndex);
					}
				}
			},
			swiperOption2: {
				slidesPerView: 'auto',
				spaceBetween: 10,
				observer: true,
				observeParents: true,
				loop: false,
				on:{
					click:function(e){
						that.$util.openAttr(that.module.list,e.clickedIndex);
					}
				}
			},
			swiperOption3: {
				loop: true,
				autoplay: 3000,
				observer: true,
				observeParents: true,
				pagination: {
					el: '.swiper-pagination'
				},
				on:{
					click:function(e){
						that.$util.openAttr(that.module.list,e.clickedIndex);
					}
				}
			}
		};
	},
	
	created(){
		that = this;
	},

	computed: {
		style() {
			if (this.module.base.fc != '') {
				return `color:${this.module.base.fc}`;
			}
		},		
	},

	mounted() {},
	methods: {		
	}
};
</script>

<style></style>
