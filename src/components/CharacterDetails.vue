<template>
  <div v-bind:class="{'q-pa-xs': isDesktop, 'col-xs-12': true,
   'col-sm-6': true,}" ref="charaDetails">
    <!-- Start of chara details UI -->
    <div class="ass-avatar" 
        :style="{ 'background-image': 'url(' + chosenChara.avatar + ')' }">
      <center><br>
        <span class="center chara-name">{{chosenChara.name}}</span><br>
        <span class="center chara-codename">{{chosenChara.codename}}</span>
      </center>
      <q-btn class="absolute-bottom-right" :icon="iconToggle" dense color="black" @click="toggleCalculator"></q-btn>
        <q-btn class="absolute-top-right" icon="clear" color="red" @click="deleteChara" dense></q-btn> 
      <div class="chara-stamp absolute-center" :class="stampClass">
        <strong>
          <span :class="[kanjiClass]">{{DEVAS[chosenChara.devas.substr(0,1)]}}</span>
          <span :class="[devasDescClass]">{{DEVAS_DESC[chosenChara.devas]}}</span>
        </strong>
      </div>
    </div>

    <transition
    appear
    enter-active-class="animated bounceInLeft"
    leave-active-class="animate bounceOutRight"
    >
    <div class="character-profile" v-show="!isCalculatorOpen">
      <character-profile :chosen-chara="chosenChara"></character-profile>
    </div>
    </transition>

    <transition
    appear
    enter-active-class="animated bounceInLeft"
    leave-active-class="animate bounceOutRight"
    >
    <div class="character-calculator" v-show="isCalculatorOpen">
    <!-- physical properties -->
    <div class="row q-pr-sm q-pt-sm q-ma-sm q-mt-lg">
      <div class="col-12">
        <section-header content="Physical Properties"/>
      </div>
      <div
        class="col-md-3 col-xs-6"
        v-for="stat in Consts.PHYSICAL_PROPERTIES" 
        v-bind:key="stat">
        <stat :chara-index ="charaIndex" 
            :base-class="['col-lg-4','col-md-5','col-xs-4','text-center']" 
            :btn-class="['col-lg-6','col-md-5', 'col-xs-6']" :display-name="Consts[stat+'Display']"
            :field-name="stat" :stat-name="stat.substr(0,3)" :value="chosenChara[stat]"/>
      </div>
    </div>

    <!-- occupation -->
    <div class="row q-pr-sm q-pt-sm q-ma-sm" v-if="occupationCount > 0 ">
      <div class="col-12">
        <section-header content="Occupations"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in occupationCount" 
        v-bind:key="chosenChara[Consts.OCCUPATION_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.OCCUPATION+i"
            :stat-name="chosenChara[Consts.OCCUPATION_ARR][i-1]" 
            :value="chosenChara[Consts.OCCUPATION_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- talents -->
    <div class="row q-pr-sm q-pt-sm q-ma-sm" v-if="talentCount > 0 ">
      <div class="col-12">
        <section-header content="Talents"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in talentCount" 
        v-bind:key="chosenChara[Consts.TALENT_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.TALENT+i"
            :stat-name="chosenChara[Consts.TALENT_ARR][i-1]" 
            :value="chosenChara[Consts.TALENT_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- afflictions -->
    <div class="row q-pr-sm q-pt-sm q-ma-sm" v-if="afflictionCount > 0 ">
      <div class="col-12">
        <section-header content="Afflictions"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in afflictionCount" 
        v-bind:key="chosenChara[Consts.AFFLICTION_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.AFFLICTION+i"
            :stat-name="chosenChara[Consts.AFFLICTION_ARR][i-1]" 
            :value="chosenChara[Consts.AFFLICTION_SEVERITY_ARR][i-1]"/>
      </div>
    </div>
    
    <!-- mortality number -->
    <div class="row q-pr-sm q-ma-sm">
      <strong class="col-auto q-mt-md q-mr-sm">MORTALITY NUMBER: </strong>
      <q-input class="col-1" align="center" v-model="mortalityNumber"/>
    </div>

    <!-- roll -->
    <div class="row q-pr-sm q-pt-sm q-ma-sm">
      <div class="col-2">
      <q-btn class="full-width" @click="doRoll" size="lg">
        <div ref="dice"><q-icon name="casino" class=""></q-icon></div>
      </q-btn>
      </div>
      <div class="col-10 q-pl-sm">
        <ass-text label="Roll" :content="appendPercentageToValue(rollResult.roll)" ref="roll"/>
        <ass-text label="Final Roll" :content="appendPercentageToValue(rollResult.finalRoll)" ref="finalRoll">
          <a class="subtext" @click="toggleBreakdown()">Show breakdown</a>
        </ass-text>
        <q-slide-transition>
          <div v-show="showBreakdown">
            <!-- apply subtle color changes between Base Roll, buffs, debuffs,
                 and total when color has been decided on -->
            <stat-breakdown :buffs="[{name:'Base Roll',value:rollResult.roll}]"/>
            <stat-breakdown :buffs="rollResult.buffs" />
            <stat-breakdown :buffs="rollResult.debuffs"/>
            <hr width="100%">
            <stat-breakdown :buffs="[{name:'Total',value:rollResult.finalRoll}]"/>
          </div>
        </q-slide-transition>
        <ass-text label="Chance of Dying" :content="rollResult.chanceOfDying" ref="roll"/>
        <ass-text label="Verdict" :content="rollResult.verdict" ref="finalRoll"/>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import { 
  Consts,
  CalcUtils,
  Lookups
} from "utils";

import Stat from "./Stat.vue";
import AssText from "./AssText.vue";
import SectionHeader from "./SectionHeader.vue";
import StatBreakdown from './StatBreakdown.vue';
import CharacterProfile from './CharacterProfile.vue';

import { EventBus } from "store/ass-store";

import {rollDice, rollNumber, sendOffscreenUp} from "../anime.js";

export default {
  name: "CharacterDetails",
  components: {
    Stat,
    AssText,
    SectionHeader,
    StatBreakdown,
    CharacterProfile
  },
  created() {
    this.Consts = Consts;
    this.GANGS = Lookups.GANGS;
    this.DEVAS = Lookups.DEVAS;
    this.DEVAS_DESC = Lookups.DEVAS_DESC;
    this.appendPercentageToValue = CalcUtils.appendPercentageToValue;
  },

  data() {
    return {
      charaNamesFiltered: null,
      placeholder: null,
      mortalityNumber: 0,
      rollResult: {
        roll: "",
        finalRoll: "",
        status: "",
        chanceOfDying: "",
        verdict: "",
        buffs: [],
        debuffs: []
      },
      isCalculatorOpen: true,
      showBreakdown: false,
      isDesktop: this.$q.platform.is.desktop
    };
  },

  computed: {
    stampClass(){
      return {
        "suzaku-red": this.chosenChara.gang == this.GANGS.SUZAKU,
        "byakko-black": this.chosenChara.gang == this.GANGS.BYAKKO,
        "panopticon-grey": this.chosenChara.gang == this.GANGS.PANOPTICON,
        "genbu-purple": this.chosenChara.gang == this.GANGS.GENBU,
        "seiryuu-pink": this.chosenChara.gang == this.GANGS.SEIRYUU
        };
    },
    kanjiClass(){
      return [{
          "devas": this.chosenChara.gang != this.GANGS.BYAKKO,
          "devas-light": this.chosenChara.gang == this.GANGS.BYAKKO,
          "devas-panopticon": this.chosenChara.gang == this.GANGS.PANOPTICON
        },
        "absolute-center",
        "devas-font"
      ]
    },
    devasDescClass(){
      return [{
          "devas-desc": this.chosenChara.gang != this.GANGS.PANOPTICON,
          "devas-desc-dark": this.chosenChara.gang == this.GANGS.PANOPTICON
        },
        "absolute-center"
      ]
    },
    chosenChara(){
      if(EventBus.characters && this.chosenCharaName){
        return EventBus.characters[this.chosenCharaName];
      }
      return {};
    },
    talentCount(){
      return this.getCount(Consts.TALENT_ARR);
    },
    afflictionCount(){
      return this.getCount(Consts.AFFLICTION_ARR);
    },
    occupationCount(){
      return this.getCount(Consts.OCCUPATION_ARR);
    },
    iconToggle() {
      return this.isCalculatorOpen ? "help" : "fas fa-calculator";
    }
  },

  props: {
    //temporary; please move to data when search will be implemented
    chosenCharaName: {
      type: String,
      default: "Eien Sonzai"
    },
    charaIndex: {
      type: Number,
      required: true
    }
  },

  methods: {
    toggleBreakdown: function(){
      this.showBreakdown = !this.showBreakdown;
    },
    doRoll: function(){
      //provide reference, then collect data from children
      let stats = {};
      stats.mortalityNumber = this.mortalityNumber;

      EventBus.$emit('retrieveStats', {charaIndex: this.charaIndex, stats});
      
      rollDice(this.$refs.dice);

      let currRollResult = Object.assign({},CalcUtils.roll(stats));

      //define callback upon complete
      rollNumber(this.rollResult, currRollResult, () => {
        this.rollResult.verdict = currRollResult.verdict;
        this.rollResult.buffs =  currRollResult.buffs;
        this.rollResult.debuffs =  currRollResult.debuffs;
      })
    },
    getCount: function(field){
      const count = this.chosenChara[field];
      return  count ? count.length : 0;
    },
    showCharaList: function(input) {
      if (!input) {
        this.charaNamesFiltered = null;
      } else {
        let names = [];

        Object.keys(EventBus.characters).forEach(charaName => {
          if (charaName.toUpperCase().includes(input.toUpperCase())) {
            names.push(charaName);
          }
        });

        if (names.length === 0) {
          names.push("No character found.");
        }
        this.charaNamesFiltered = names;
      }
    },
    deleteChara: function() {
      //TODO: Chara delete animation.
      EventBus.$emit('deleteCharacter', this.charaIndex);
    },
    toggleCalculator: function() {
      this.isCalculatorOpen = !this.isCalculatorOpen;
    }
  }
};
</script>

<style lang="stylus" scoped>

@import "~variables"

@font-face 
  font-family Adobe
  src url("../assets/fonts/Adobe_Fangsong/AdobeFangsongStd-Regular.otf")

@font-face
  font-family Luxia
  src url("../assets/fonts/Luxia/Luxia-Display.otf")

@font-face
  font-family PT_Sans
  src url("../assets/fonts/PT_Sans/PT_Sans-Web-Regular.ttf")

.ass-avatar
  width 100%
  height $chara-header-height
  background-size cover
  background-position center
  background-repeat no-repeat
  box-shadow inset 0 0 0 2000px rgba(80,80,80,0.5)
  position relative

.chara-stamp
  border-radius 50%
  border 2px solid white
  top $chara-header-height
  width 75px
  height 75px
  z-index 5

.devas-font
  font-family: "Adobe"

.devas
  color rgba(40,40,40,0.55)
  font-size 45px

.devas-light
  color rgba(255,255,255,0.4)
  font-size 45px

.devas-dark
  color rgba(80,80,80,0.7)
  font-size 45px

.devas-panopticon
  color white

.devas-desc
  font-size 15px
  color white

.devas-desc-dark
  font-size 15px
  color black

div
  background-color $ass-app-bg

.avatar
  vertical-align: middle;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;

.inline 
  display: inline;

.suzaku-red
  background-color $suzaku-red

.byakko-black
  background-color $byakko-black

.seiryuu-pink
  background-color $seiryuu-pink

.genbu-purple
  background-color $genbu-purple

.panopticon-grey
  background-color $panopticon-grey

.chara-name
  font-family "Luxia"
  font-size 40px

.chara-codename
  font-family "PT_Sans"
  font-size 18px

.text-align-right
  text-align right

.subtext
  font-size 12px

a
  cursor pointer

#delete-button
  position: relative;
  right: 0em;

</style>
