// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/') return next()
  const tokenStr = window.sessionStorage.getItem('name')
  if (!tokenStr) return next('/')

  const type = window.sessionStorage.getItem('type')
  console.log(to, from, type);
  if (to.path === '/index/findManage') {
    if (type === '1') {
      return next(false)
    }
  }
  next()
})

import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.filter('capitalize', function (value) {

  value = Number(value);
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  return y + "-" + MM + "-" + d + " ";

})


import './common/css/reset.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
