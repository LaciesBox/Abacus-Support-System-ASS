<template>
  <q-layout @scroll="handleScroll">
    <div style="background:#111111;height:23000px;" ref="background">
      <div style="transform: translate(-50%, 0);
                  position:fixed; opacity:0;
                  top:40%;
                  left: 50%;
                  align:center;
                  width:100%"
                  ref="tongue">
        <img src="../../assets/cut2.jpg" width="100%">
      </div>
      <div style="transform: translate(-50%, 0);
                  position:fixed; opacity:0;
                  top:40%;
                  left: 50%;
                  align:center;
                  text-align:center;
                  font-size: 78px"
                  ref="tagline">
        <span class="center luxia-lg">Vengence is Justice</span>
        <hr>
      </div>
      <div style="background:#3b3536;
                  position:fixed; opacity:0;
                  top:13%;
                  align:center;
                  height:2000px"
                  ref="header">
        <img src="../../assets/suzaku_header.png" width="100%">
      </div>
      <div style="position:fixed; opacity:0;
                  bottom: 0%;
                  right: 0%;
                  align:center;"
                  ref="saeko">
        <img src="../../assets/saeko2.png" width="100%">
      </div>
      <div style="transform: translate(-50%, 0);
                  position:fixed; opacity:0;
                  top:40%;
                  left: 50%;
                  align:center;
                  text-align:center;
                  color:white;
                  font-size: 100px;" ref="bishaLogo">
        毘沙<br>
        門天
      </div>
      <div style="transform: translate(-50%, 0);
                  position:fixed; opacity:0;
                  top:10%;
                  left: 50%;
                  align:center;"
                  ref="splatter">
        <img src="../../assets/splatter.png" width="150">
      </div>
    </div>
  </q-layout>
</template>

<script>

import {
  QLayoutScrollEventMixin
} from "components";

import anime from 'animejs';

/**
 * [BANONAS]
 * HIGH PRIORITY. CONTINUE AFTER DEMO. EXTERNALIZE TO ANIMEUTILS.JS.
 * THE FCKING IF-ELSE CHAIN SUCKS SO BAD I CANT EVEN. BUT I NEED TO
 * SHOW PROGRESS TOMORROW. Everything is in my head, and I know how
 * to eliminate the if-else chain and make it readable. But lol fck
 * not enough time i need some sleep help me Elon Musk and Billy 
 * Gates
 */
let animManager = {
  totalLength: 0,
  anims: []
}

const pushAnim = function(duration){
  let anim = {};
  anim.duration = duration;
  animManager.totalLength += duration;
  // readjust previous anims
  anim.percentage = duration / animManager.totalLength;
  anim.ref = "animRef" + anims.length;

  anim.condition = anims.length > 0 ? 
  (scrollPos, scrollHeight) => {
    return scrollPos >= scrollHeight * animManager.anims[anims.length-2].percentage && 
    scrollPos < scrollHeight * .75
  } : 
  (scrollPos, scrollHeight) => {
    return scrollPos < scrollHeight * .50
  }
  animManager.anims.push(Object.assign({},anim));
}

const properties = [
  {
    top: "-=50",
    opacity: "1"
  },
  {
    top: "+=0",
    opacity: "1"
  },
  {
    top: "-=50",
    opacity: "0"
  }
]

const displayProperties = [
  {
    top: "-=50",
    opacity: "1"
  },
  {
    top: "+=0",
    opacity: "1"
  }
]

const display = function(element, easing = "easeInOutSine"){
  return anime({
    targets: element,
    autoplay: false,
    opacity: displayProperties.map(p => ({value: p.opacity})),
    easing,
    top: displayProperties.map(p => ({value: p.top})),
  })
}

const displayShortly = function(element){
  return anime({
    targets: element,
    autoplay: false,
    opacity: properties.map(p => ({value: p.opacity})),
    easing: 'easeInOutSine',
    top: properties.map(p => ({value: p.top})),
  })
}

const displayShortlyRight = function(element){
  return anime({
    targets: element,
    autoplay: false,
    duration:1000,
    opacity: properties.map(p => ({value: p.opacity})),
    easing: 'easeInOutSine',
    right: properties.map(p => ({value: p.right})),
  })
}

const changeBgColor = function(element, color){
  return anime({
    targets: element,
    autoplay: false,
    duration:1000,
    backgroundColor: color,
    easing: 'easeInOutSine'
  })
}

const bishaLogoBlack = function(element){
  return anime({
    targets: element,
    autoplay: false,
    duration:1000,
    color: '#111',
    easing: 'easeInOutSine'
  })
}

const TOTAL_ANIM_LENGTH = 23000;

let anims = [
  {
    ref: "tongue",
    percentage: 2000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "tagline",
    percentage: 4000 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 2000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "header",
    percentage: 8000 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 6000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "saeko",
    percentage: 2000 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 14000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "bishaLogo",
    percentage: 500 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 16000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "splatter",
    percentage: 500 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 16500 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "background",
    percentage: 3000 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 17000 / TOTAL_ANIM_LENGTH
  },
  {
    ref: "bishaLogoBlack",
    percentage: 3000 / TOTAL_ANIM_LENGTH,
    totalPrevPercentages: 20000 / TOTAL_ANIM_LENGTH
  }
]
/**
 * doScroll: function(anim, event){
      if(anim.condition){
        this.scrollPercentage = event.position/(this.scrollHeight * anim.percentage);
        this["ref"].seek(this.scrollPercentage * this["animRef"].duration);
      } else {
        doScroll()
      }
    }
 */

export default {
  name: "P001EienSonzai",
  mixins:[QLayoutScrollEventMixin],
  created(){
    this.$nextTick(()=>{
      this.tongue = displayShortly(this.$refs.tongue);
      this.tagline = displayShortly(this.$refs.tagline);
      this.header = displayShortly(this.$refs.header);
      this.bishaLogo = display(this.$refs.bishaLogo);
      this.saeko = displayShortlyRight(this.$refs.saeko);
      this.splatter = display(this.$refs.splatter, "linear");
      this.background = changeBgColor(this.$refs.background,"#d04444");
      this.bishaLogoBlack = bishaLogoBlack(this.$refs.bishaLogo);
    });
  },
  data(){
    return{
      tagline:""
    }
  },
  methods: {
    handleScroll: function(event) {
      if(!this.background){
        return;
      }

      let i = 0;
      anims.some(anim =>{
        if((i++) == 0 && event.position < this.scrollHeight * anim.percentage){

          this.scrollPercentage = event.position/(this.scrollHeight * anim.percentage);
          this[anim.ref].seek(this.scrollPercentage * this[anim.ref].duration);

          return true;
        }
        else if(event.position >= this.scrollHeight * anim.totalPrevPercentages &&
                event.position < this.scrollHeight * (anim.totalPrevPercentages + anim.percentage)) {
          //keep these commented for reference and debugging.
          //console.log(anim.ref);
          //console.log("position",event.position);
          //console.log("must be greater than", this.scrollHeight * anim.totalPrevPercentages);
          //console.log("must be less than ", this.scrollHeight * (anim.totalPrevPercentages + anim.percentage));
          //console.log(anim.percentage);
          this.scrollPercentage = 
              (event.position - (this.scrollHeight * anim.totalPrevPercentages)) /
              (this.scrollHeight * anim.percentage);
              
          this[anim.ref].seek(this.scrollPercentage * this[anim.ref].duration);

          return true;
        }
      })
      //keep this commented for reference

      /*if(event.position < this.scrollHeight * .50){
        console.log("50%");

        this.scrollPercentage = event.position/(this.scrollHeight * .50);
        this.tagline.seek(this.scrollPercentage * this.tagline.duration);

      }else if(event.position >= this.scrollHeight * .50 && event.position < this.scrollHeight * .75){
        console.log("75%");

        this.scrollPercentage = (event.position - (this.scrollHeight * .50))/(this.scrollHeight * .25);
        this.ref1.seek(this.scrollPercentage * this.eien.duration);

      } else {
        console.log("75% - 100%");

        this.scrollPercentage = (event.position - (this.scrollHeight * .75))/(this.scrollHeight * .25);
        this.eien2.seek(this.scrollPercentage * this.eien2.duration);

      }
      
      console.log("scrollPercentage: ",this.scrollPercentage);*/
    }
  }
}
</script>