import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import util from '@/util/util.js'
Vue.prototype.$util = util;

import api from '@/api/api.js'
Vue.prototype.$api = api;

/***标题***/
import moduleTitle from './views/module/title.vue';
Vue.component("moduleTitle",moduleTitle);

/***标题2***/
import moduleTwtit from './views/module/twtit.vue';
Vue.component("moduleTwtit",moduleTwtit);

/***颜色选择***/
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
