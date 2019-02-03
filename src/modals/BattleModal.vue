<template>
  <q-modal maximized v-model="show" @show="showHandler" content-classes="bg-primary text-secondary">
    <div class="row justify-center">
      <div class="col-12">
      <q-chip color="primary" square 
        class="no-shadow full-width text-center q-display-1 lato-bi unselectable q-pa-sm"
        text-color="secondary">
        {{chosenCharas[chosenCharaIndex]}}'s Turn
      </q-chip>
      </div>
    </div>
    <!-- Exit out of modal -->
    <q-page-sticky position="top-right" :offset="[12, -65]">
      <q-btn
      color="secondary"
      text-color="primary"
      dense
      @click="closeHandler"
      icon="clear"
      class="absolute-top-right"
      />
    </q-page-sticky>
    <div class="row justify-center">
      <q-btn class="q-ma-md" color="secondary" text-color="primary" 
      label="Previous Turn" icon="skip_previous" @click="doAddChosenCharaIndex(-1)"/>
      <q-btn class="q-ma-md" color="secondary" text-color="primary" 
      label="Skip Turn" icon="skip_next" @click="doAddChosenCharaIndex(1)"/>
    </div> 
    <div class="row">
      <!-- Character in Play -->
      <div class="col-xs-12 col-sm-5 q-pa-lg">
        <character-details :chosen-chara-name="charaInPlay" :chara-index="0" :is-in-modal="true"/>
      </div>
      <!-- Enemy Duelist -->
      <div class="col-xs-12 col-sm-2 text-center vertical-aligned text-red-10">
        <span class="q-display-4">VS</span>
        <q-select class="text-red-10" color="red-10" float-label="Select an opponent" v-model="chosenEnemy" radio :options="enemyOptions" dark/>
        <q-btn class="full-width full-height" @click="performRoll" 
        size="lg" :disable="!chosenEnemy && !selfOnly">
          <div ref="dice"><q-icon name="casino" size="3em"></q-icon></div>
        </q-btn>
      </div>
      <div class="col-xs-12 col-sm-5 q-pa-lg">
        <character-details v-show="chosenEnemy && !selfOnly" :chosen-chara-name="chosenEnemy" :chara-index="1" :is-in-modal="true"/>
      </div>
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
        debuffs: [],
      },
      turnOption: "",
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
      if(this.chosenCharaIndex < 0) { 
        this.$q.notify({
          message: "This is the first turn.",
          timeout: 300,
        });
      } else if(this.chosenCharaIndex == this.chosenCharas.length) {
        this.closeHandler();
      } else {
        this.chosenEnemy = "";
      }
      this.chosenCharaIndex = this.chosenCharaIndex.clamp(0,this.chosenCharas.length-1);
    },
    closeHandler: function(){
      this.$q.dialog({
        title: "Done with these set of rolls-nyan?",
        message: "Proceeding will bring you back to Abacus proper.",
        ok: 'Doneso!',
        cancel: "Let me be able to turn the hands of time back just once more...",
        color: 'black',
        }).then(() => {
          this.reset();
          this.$emit("close-handler");
        }).catch(() => {
          this.$q.notify({
            message: 'Continuing...',
            timeout: 500,
          })
        });
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
      this.$q.dialog({
        title: this.generateWinningMessage(currRollResult),
        message: this.charaInPlay + " needed to roll " + 
          (parseFloat(10) + parseFloat(currRollResult.statDiff)) +
          " or lower to win. Roll was: " + currRollResult.roll,
        ok: 'Next Turn',
        cancel: 'Rigged as fuck, reroll!',
        color: 'black',
      }).then(() => {
        this.doAddChosenCharaIndex(1);
      }).catch(() => {
        this.$q.notify({
          message: 'Resetting turn...',
          timeout: 500,
        })
      })
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
    generateWinningMessage: function(currRollResult) {
      let winningOptions = [
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " has won!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is on a killing spree!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is dominating!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " , mega kill!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is unstoppable!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is wicked sick!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " , meow-nster kill!!!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is Godlike!",
        (currRollResult.winner == 0 ? this.charaInPlay : this.chosenEnemy) + " is beyond Godlike!",
      ]

      return winningOptions[Math.ceil(Math.random() * (winningOptions.length - 1))];
    }
  }
}
</script>