import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//import screens here
import MainPage from './components/screens/MainPage.vue';
import EasterEgg from './components/screens/EasterEgg.vue';
import Calculator from './components/screens/Calculator.vue';

//add imported screen here
export default new VueRouter({
  routes: [
    {
      name: 'MainPage',
      path: '/mainpage', 
      component: MainPage 
    },
    {
      name: 'Calculator',
      path: '*', 
      component: Calculator 
    },
    {
      name: 'EasterEgg',
      path: '/easteregg/:egg_id',
      component: EasterEgg
    }
  ]
})