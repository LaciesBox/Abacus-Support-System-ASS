import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//import screens here
import {
  MainPage,
  EasterEgg,
  Calculator,
  P001EienSonzai
} from "screens";

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
    },
    {
      name: "P001EienSonzai",
      path: "/eien-sonzai-1",
      component: P001EienSonzai
    }
  ]
})