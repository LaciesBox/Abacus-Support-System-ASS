<template>
  <div :class="{'q-pa-sm': isDesktop, 'col-xs-12 col-sm-6 lato-r': true,}" ref="charaDetails">
    <!-- Header UI -->
    <transition
    appear
    enter-active-class="animated fadeInLeft"
    >
    <div class="ass-avatar" 
        :style="{ 'background-image': 'url(' + chosenChara.avatar + ')' }">
      <center><br>
        <span class="center luxia-lg">{{chosenChara.name}}</span><br>
        <span class="center ptsans-sm">{{chosenChara.codename}}</span>
      </center>
      <q-btn class="absolute-bottom-right" :icon="iconToggle" dense color="black" @click="toggleCalculator"></q-btn>
        <q-btn class="absolute-top-right" icon="clear" color="red" @click="deleteChara" dense v-show="!isInModal"></q-btn> 
      
      <!--stamp removed! commenting out just in case it will be used in the future-->
      <!--<div class="chara-stamp absolute-center" :class="stampClass">
        <strong>
          <span :class="[kanjiClass]">{{DEVAS[chosenChara.devas.substr(0,1)]}}</span>
          <span :class="[devasDescClass]">{{DEVAS_DESC[chosenChara.devas]}}</span>
        </strong>
      </div>-->
    </div>
    </transition>

    <!-- Character Profile UI -->
    <transition
    appear
    enter-active-class="animated fadeInLeft"
    >
      <div class="character-profile" v-show="!isCalculatorOpen">
        <character-profile :chosen-chara="chosenChara" />
      </div>
    </transition>
    
      {{storedStats}}
    <!-- Character Calculator UI -->
    <transition
    appear
    enter-active-class="animated fadeInLeft"
    >
    <div class="character-calculator" v-show="isCalculatorOpen">
    <q-card class="bg-grey-3 text-black">
      <q-card-title class="q-pa-sm q-pl-lg">
      Dice Roller
      </q-card-title>
      <q-card-separator class="bg-grey-7"/>
      <q-card-main class="q-pa-none">
        <q-list separator>
          <!-- Physical Properties COLLAPSIBLE -->
          <q-collapsible icon="ion-ios-body" label="Physical Properties" highlight>
            <div class="row">
              <div
                class="col-xs-6 col-sm-12 col-md-6 col-lg-6"
                v-for="stat in Consts.PHYSICAL_PROPERTIES" 
                v-bind:key="stat">
                <stat :chara-name ="chosenCharaName"
                    :roll-listener="rollListener"
                    @stat-data-handler="statDataHandler"
                    :base-class="['col-lg-4','col-md-5','col-xs-4','text-center']" 
                    :btn-class="['col-lg-6','col-md-5', 'col-xs-6']" 
                    :display-name="Consts[stat+'Display']"
                    :field-name="stat" :stat-name="stat.substr(0,3)" 
                    :value="chosenChara[stat]"/>
              </div>
            </div>
          </q-collapsible>
          <!-- Occupation COLLAPSIBLE -->
          <q-collapsible icon="fas fa-user-secret" label="Occupation" highlight>
            <div class="row">
              <div class="col-xs-12 col-lg-6" v-for="i in occupationCount" 
                  v-bind:key="chosenChara[Consts.OCCUPATION_ARR][i-1]">
                  <stat :chara-name ="chosenCharaName"
                      :roll-listener="rollListener"
                      @stat-data-handler="statDataHandler"
                      :field-name="Consts.OCCUPATION+i"
                      :stat-name="chosenChara[Consts.OCCUPATION_ARR][i-1]" 
                      :value="chosenChara[Consts.OCCUPATION_PROFICIENCY_ARR][i-1]"/>
              </div>
            </div>
          </q-collapsible>
          <!-- Talents COLLAPSIBLE -->
          <q-collapsible icon="star" label="Talents" highlight>
            <div class="row">
              <div class="col-xs-12 col-lg-6" v-for="i in talentCount" 
                v-bind:key="chosenChara[Consts.TALENT_ARR][i-1]">
                <stat :chara-name ="chosenCharaName"
                    :roll-listener="rollListener"
                    @stat-data-handler="statDataHandler"
                    :field-name="Consts.TALENT+i"
                    :stat-name="chosenChara[Consts.TALENT_ARR][i-1]" 
                    :value="chosenChara[Consts.TALENT_PROFICIENCY_ARR][i-1]"/>
              </div>
            </div>
          </q-collapsible>
          <!-- Afflictions COLLAPSIBLE -->
          <q-collapsible icon="fas fa-heartbeat" label="Afflictions" highlight>
            <div class="row">
              <div class="col-xs-12 col-lg-6" v-for="i in afflictionCount" 
                v-bind:key="chosenChara[Consts.AFFLICTION_ARR][i-1]">
                <stat :chara-name ="chosenCharaName"
                    :roll-listener="rollListener"
                    @stat-data-handler="statDataHandler"
                    :field-name="Consts.AFFLICTION+i"
                    :stat-name="chosenChara[Consts.AFFLICTION_ARR][i-1]" 
                    :value="chosenChara[Consts.AFFLICTION_SEVERITY_ARR][i-1]"/>
              </div>
            </div>
          </q-collapsible>
          <div class="row q-pa-sm">
            <strong class="col-auto q-pt-md">MORTALITY NUMBER: </strong>
            <q-input class="col-1" align="center" v-model="stats.mortalityNumber"/>
          </div>
          <div class="row" v-if="showRoller">
            <div class="col-2">
            <q-btn class="full-width full-height" @click="doRoll" 
              size="lg">
              <div ref="dice"><q-icon name="casino" size="3em"></q-icon></div>
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
        </q-list>
      </q-card-main>
    </q-card>
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

import { rollDice, rollNumber } from "../anime.js";

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
    this.storedStats = EventBus.storedStats[this.charaName];
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
      isCalculatorOpen: true,
      showBreakdown: false,
      isDesktop: this.$q.platform.is.desktop,
      select: "1",
      rollResult: {
        roll: "",
        finalRoll: "",
        status: "",
        chanceOfDying: "",
        verdict: "",
        buffs: [],
        debuffs: [],
      },
      rollListener: true,
      stats: {
        mortalityNumber: EventBus.getStoredStat(this.chosenCharaName, "mortalityNumber", "mortalityNumber") || 0
      }
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
      return this.isCalculatorOpen ? "help" : "casino";
    },
    pvpColor() {
      return this.pvpCheck ? "red" : "primary";
    },
    team() {
      return this.select;
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
    },
    isInModal: {
      type: Boolean,
      default: false,
    },
    showRoller: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    "stats.mortalityNumber": function(){
      EventBus.storeStat(this.chosenCharaName, "mortalityNumber", "mortalityNumber", this.stats.mortalityNumber);
    },
    chosenCharaName: function(){
      this.stats.mortalityNumber = EventBus.getStoredStat(this.chosenCharaName, "mortalityNumber", "mortalityNumber") || 0;
    }
  },
  
  methods: {
    getStats: function(){
      this.rollListener = !this.rollListener;
      return this.stats;
    },
    toggleBreakdown: function(){
      this.showBreakdown = !this.showBreakdown;
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
      EventBus.$emit('deleteCharacter', this.charaIndex);
    },
    toggleCalculator: function() {
      this.isCalculatorOpen = !this.isCalculatorOpen;
    },
    doRoll: function(){
      //EventBus.$emit('retrieveStats', {charaIndex: 0, stats});
      
      this.rollListener = !this.rollListener;

      console.log(this.stats);

      rollDice(this.$refs.dice);

      let currRollResult = Object.assign({},CalcUtils.roll(this.stats));

      //define callback upon complete
      this.rollResult.verdict = "...";
      rollNumber(this.rollResult, currRollResult, () => {
        this.rollResult.verdict = currRollResult.verdict;
        this.rollResult.buffs =  currRollResult.buffs;
        this.rollResult.debuffs =  currRollResult.debuffs;
      })
    },
    statDataHandler(statName, statData){
      this.stats[statName] = statData;
    }
  }
};
</script>

<style lang="stylus" scoped>

@import "~variables"

a
  cursor pointer
  
// div
//   background-color $ass-app-bg

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

.avatar
  vertical-align: middle;
  width: 5em;
  height: 5em;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;

.text-align-right
  text-align right

.subtext
  font-size 12px

</style>
