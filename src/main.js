import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'

Vue.prototype.$eventHub = new Vue();

Vue.mixin({
  data: () =>  {
    return {
     
    }
  }
})


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


