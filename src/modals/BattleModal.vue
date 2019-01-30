<template>
  <q-modal maximized v-model="show">
  {{chosenCharaIndex}}
    <h4>Basic Modal</h4>
    <q-btn
      color="primary"
      @click="doAddChosenCharaIndex(-1)"
      label="Previous"
    />
    <q-btn
      color="primary"
      @click="doAddChosenCharaIndex(1)"
      label="Next"
    />
    <q-btn
      color="primary"
      @click="closeHandler"
      label="Close"
    />
    <div class="row">
      
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <character-details :chosen-chara-name="charaInPlay" :chara-index="0"/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <q-select v-model="chosenEnemy" radio :options="enemyOptions"/>
        <character-details  v-show="chosenEnemy" :chosen-chara-name="chosenEnemy" :chara-index="1"/>
      </div>
    </div>
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

export default {
  name: "BattleModal",
  components: {
    CharacterDetails
  },
  data(){
    return {
      //chosenCharaIndex increments when next is clicked
      chosenCharaIndex: 0,
      chosenEnemy: ""
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
    doAddChosenCharaIndex: function(increment){
      this.chosenCharaIndex+=increment;
      this.chosenCharaIndex = this.chosenCharaIndex.clamp(0,this.chosenCharas.length-1);
    },
    closeHandler: function(){
      this.$emit("close-handler");
    },
    doRoll: function(){
      //provide reference, then collect data from children
      let stats = [];
      //stats.mortalityNumber = this.mortalityNumber;
      chosenCharas.forEach((chara,index)=>{
        EventBus.$emit('retrieveStats', {charaIndex: index, stats});
      })
      
      
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