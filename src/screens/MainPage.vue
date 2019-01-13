<template>
<q-page-container>
  <transition
    appear
    leave-active-class="animated slideOutLeft">
  <q-page class="bg-primary text-secondary" v-show="isHere">
    <div class="q-pa-lg">
      <transition-group
        appear
        leave-active-class="animated fadeOut"
      >
      <div class="lato-l text-center" key="trans1" v-show="isLanding">
        <div class="inline-block" v-for="(word, index) in speech" :key="index">
          <div class="speech" v-for="(chara, index) in word" :key="index">
            {{chara}}
          </div>
          &nbsp;
        </div>
      </div>
      <div class="row q-pt-lg" key="trans2" v-show="isLanding">
        <img class="abacus" src="../assets/abacus-standing.png" alt="Abacus">
      </div>
      <q-list link inset-delimiter dense key="trans3" v-show="isLanding" 
      :class="{'lato-l q-ma-sm q-pa-sm': true, 'quick-links': isDesktop}">
        <q-item @click.native="openURL('https://facebook.com/groups/unboxlacie/')">
          <q-item-side icon="group"/>
          <q-item-main label="Lacie's Box Community"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://www.facebook.com/groups/1108088439350326/')">
          <q-item-side icon="people_outline"/>
          <q-item-main label="Bishamonten Group"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://www.facebook.com/Bishamonten-2162920130626725/')">
          <q-item-side icon="public"/>
          <q-item-main label="Bishamonten Page"></q-item-main>
        </q-item>
      </q-list>
      <div class="row" key="trans4" v-show="isLanding">
        <q-btn class="land-button text-black" @click="land" color="secondary">
          Enter
        </q-btn>
      </div>
      </transition-group>
    </div>
  </q-page>
  </transition>
</q-page-container>
</template>

<style>
</style>

<script>
import { 
  Consts,
  CalcUtils,
  SheetUtils,
  Converter
} from "utils";

import { EventBus } from "store/ass-store";
import { showSpeech } from "../anime.js";

export default {
  name: 'MainPage',
  data () {
    return{
      speech: [""],
      speechArr: ["Hello, my name is Abacus",
      "I will be your companion for today.",
      "I know I might seem like just a little puss",
      "But in my domain, you are my protégé.",
      "I hold all the information you seek",
      "Come, enter, child",
      "I will show you the way."],
      isDesktop: this.$q.platform.is.desktop,
      isLanding: true,
      isHere: true,
    }
  },
  created() {
  },
  mounted() {
    let self = this;
    let currDelay = 0;
    for(let i = 0; i < self.speechArr.length; i++) {
      setTimeout(function() {
        self.speech = [""];
        self.speech = self.speechArr[i].split(" ");
      }, currDelay);
      currDelay += 200;
      setTimeout(function() {
        showSpeech();
      }, currDelay);
      if(i + 1 < self.speechArr.length) {
        currDelay = currDelay + (120 * self.speechArr[i].length);
      }
    };
  },
  components: {
  },
  methods: {
    land: function() {
      let self = this;
      this.isLanding = false;
      setTimeout(function() {
        self.isHere = false;
      EventBus.$emit('land');
      }, 800);
      setTimeout(function() {
        self.$router.push("abacus");
      }, 1500);
    },
    charaIsWhiteSpace(chara) {
      return /\s/.test(chara);
    }
  },
}
</script>
<style scoped>
.land-button{
  margin: 0 auto;
}

.abacus{
  height: 9em;
  width: auto;
  margin: 0 auto;
}

.quick-links{
  width: 30%;
  margin: 10px auto;
}

.speech {
  font-size: 1.5em;
  opacity: 0;
  display: inline-block;
}
</style>

