import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import '@/styles.scss';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.use(VueAxios, axios);

