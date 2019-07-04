// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import VueCookie from 'vue-cookie'
import { http, blobDownload } from '@/utils/httpRequest'
import cloneDeep from 'lodash/cloneDeep'
//typical import
import { TweenMax, Power2, TimelineLite } from "gsap";

// import Draggable from "gsap/Draggable";
// import ScrollToPlugin from "gsap/ScrollToPlugin";
import '@/muse-ui'
import '@/assets/scss/index.scss'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.config.productionTip = false

window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

// 挂载全局
Vue.prototype.$http = http


if ("WebSocket" in window) {
  Vue.prototype.$socket = new WebSocket(
    window.SITE_CONFIG["webSocketUrl"] + "/webSocket"
  );
} else {
  alert("浏览器不支持");
}
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
