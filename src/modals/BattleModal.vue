<template>
  <q-modal maximized v-model="show" @show="showHandler" class="text-secondary">
    <q-btn
      v-show="!selfOnly && !duelOnly"
      color="primary"
      @click="doAddChosenCharaIndex(-1)"
      label="Previous"
    />
    <q-btn
      v-show="!selfOnly && !duelOnly"
      color="primary"
      @click="doAddChosenCharaIndex(1)"
      label="Next"
    />
    <q-btn
      color="primary"
      @click="closeHandler"
      label="Close"
    />

    <!-- duelists, side by side -->
    <div class="row">
      <div class="col-xs-12 col-sm-5">
        <character-details :chosen-chara-name="charaInPlay" :chara-index="0"/>
      </div>
      <div class="col-xs-12 col-sm-2 q-display-4 text-center vertical-aligned">VS</div>
      <div class="col-xs-12 col-sm-5">
        <q-select v-show="!selfOnly && !duelOnly" v-model="chosenEnemy" radio :options="enemyOptions"/>
        <character-details  v-show="chosenEnemy && !selfOnly" :chosen-chara-name="chosenEnemy" :chara-index="1"/>
      </div>
    </div>
    
    <!-- roll -->
    <div class="row">
      <q-btn class="full-width full-height" @click="performRoll" 
      size="lg" :disable="!chosenEnemy && !selfOnly">
      <div ref="dice"><q-icon name="casino" size="3em"></q-icon></div>
    </q-btn>
    </div>

    <!-- DONT DELETE! THIS IS ALSO CODE FOR SINGLE-ROLL. -->
    <!--<div class="row">
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
              and total when color has been decided on
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
    </div>-->
  </q-modal>
</template>

<script>
import {
  CalcUtils
} from "utils";

import {
  CharacterDetails
} from "components";

import { EventBus } from "store/ass-store";

import { rollDice, rollNumber } from "../anime.js";

export default {
  name: "BattleModal",
  components: {
    CharacterDetails
  },
  data(){
    return {
      //chosenCharaIndex increments when next is clicked
      chosenCharaIndex: 0,
      chosenEnemy: "",
      rollResult: {
        roll: "",
        finalRoll: "",
        status: "",
        chanceOfDying: "",
        verdict: "",
        buffs: [],
        debuffs: []
      },
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    chosenCharas: {
      type: Array,
      required: true
    }
  },
  computed: {
    selfOnly(){
      return this.chosenCharas.length == 1;
    },
    duelOnly(){
      return this.chosenCharas.length == 2;
    },
    charaInPlay(){
      return this.chosenCharas[this.chosenCharaIndex];
    },
    enemyOptions(){
      let options = [];
      this.chosenCharas.forEach(chara => {
        if(this.charaInPlay != chara){
          options.push({
            label: chara,
            value: chara
          })
        }
      })
      return options;
    }
  },
  methods: {
    showHandler: function(){
      // this method runs when the modal opens
      if(this.duelOnly){
        this.chosenEnemy = this.chosenCharas[1];
      }
    },
    doAddChosenCharaIndex: function(increment){
      this.chosenCharaIndex+=increment;
      this.chosenCharaIndex = this.chosenCharaIndex.clamp(0,this.chosenCharas.length-1);
      this.chosenEnemy = "";
    },
    closeHandler: function(){
      this.reset();
      this.$emit("close-handler");
    },
    reset: function(){
      this.chosenEnemy = "";
      this.chosenCharaIndex = 0;
    },
    performRoll: function(){
      if(this.selfOnly){
        this.doRoll();
      } else {
        this.doPvpRoll();
      }
    },
    doPvpRoll: function(){
      let duelistA = {}, duelistB = {};
      EventBus.$emit('retrieveStats', {charaIndex: 0, stats: duelistA});
      EventBus.$emit('retrieveStats', {charaIndex: 1, stats: duelistB});

      rollDice(this.$refs.dice);

      let currRollResult = Object.assign({},CalcUtils.pvpRoll([duelistA, duelistB]));
      console.log(currRollResult);
    },
    doRoll: function(){
      //provide reference, then collect data from children
      let stats = {};
      //stats.mortalityNumber = this.mortalityNumber;
      EventBus.$emit('retrieveStats', {charaIndex: 0, stats});
      
      rollDice(this.$refs.dice);

      let currRollResult = Object.assign({},CalcUtils.roll(stats));

      //define callback upon complete
      this.rollResult.verdict = "...";
      rollNumber(this.rollResult, currRollResult, () => {
        this.rollResult.verdict = currRollResult.verdict;
        this.rollResult.buffs =  currRollResult.buffs;
        this.rollResult.debuffs =  currRollResult.debuffs;
      })
    },
  }
}
</script>