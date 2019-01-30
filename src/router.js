import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//import screens here
import {
  EasterEgg,
  Calculator,
  P001EienSonzai,
  LandingPage,
} from "screens";

//add imported screen here
export default new VueRouter({
  routes: [
    {
      name: 'LandingPage',
      path: '*', 
      component: LandingPage 
    },
    {
      name: 'Calculator',
      path: '/abacus', 
      component: Calculator 
    },
    {
      name: 'EasterEgg',
      path: '/easteregg/:egg_id',
      component: EasterEgg
    }
  ]
})