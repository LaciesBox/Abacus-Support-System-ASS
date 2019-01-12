<template>
  <q-layout @scroll="handleScroll">
    <div style="color:black;height:2000px;">
      <div style="background:black;height:150px;width:150px" ref="demo">
      </div>
      asdfasdfasfjakblajsdgiuoadsfasdhfkasjdfhasdkj
      {{scrollData}}
    </div>
  </q-layout>
</template>

<script>
import {
  ScrollEventMixin
} from "components";

import anime from 'animejs';

const parallax = function(element){
  return anime({
    targets: element,
    translateY: 1500,
    easing: 'linear',
    borderRadius: ['0%', '50%'],
    autoplay: false
  })
}

export default {
  name: "P001EienSonzai",
  created(){
    console.log("refs",this.$refs.demo);
    this.$nextTick(()=>{
      this.demo = parallax(this.$refs.demo)
    });
  },
  data(){
    return{
      scrollData:{},
      scrollPercentage:0
    }
  },
  computed:{
    maxScrollHeight(){
      return Math.max(document.body.scrollHeight, document.body.offsetHeight, 
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, 
                   document.documentElement.offsetHeight);
    },
    scrollHeight(){
      return this.maxScrollHeight - window.innerHeight;
    }
  },
  methods: {
    handleScroll: function(event) {
      this.scrollPercentage = event.position/this.scrollHeight;
      this.scrollData = Object.assign({},event);
      this.demo.seek(this.scrollPercentage * this.demo.duration);
    }
  }
}
</script>