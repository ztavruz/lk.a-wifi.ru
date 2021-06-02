import Vue from 'vue';
import vuelidate from 'vuelidate';
import VueMeta from 'vue-meta'
import App from './App.vue';
import store from './vuex/store';
import router from "./router/router";
import vuetify from './plugins/vuetify';
import './registerServiceWorker'




Vue.config.productionTip = false
Vue.use(vuelidate);
Vue.use(VueMeta);

export const eventBus = new Vue();

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')