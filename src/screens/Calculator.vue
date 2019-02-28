<template>
  <q-page-container>
    <!-- No characters on workspace -->
    <div class="q-mt-lg text-center text-italic text-grey" v-show="charas.length == 0">
      Add some characters for some fun-nyan~ <br>
      Or you can look at my butt~ <br>
      <img src="../assets/abacus-ass.png" class="q-mt-lg margin-auto"/>
    </div>

    <!-- Duel View -->
    <div class="bg-grey-9" v-show="charas.length > 0">
      <div class="row justify-center">
        <div class="col-12">
        <q-chip color="red-4" square 
          class="no-shadow full-width text-center q-display-1 lato-bi unselectable"
          text-color="primary">
          PVP Arena
        </q-chip>
        </div>
      </div>
      <div class="row justify-center">
      <div class="col-xs-6 col-sm-4 col-md-2 card-padding" v-for="(chara,index) in charas" v-bind:key="index">
        <character-card :class="chara" :chosen-chara-name="chara" :chara-index="index" @select="addToPvpList"/>
      </div>
      </div>
      <div class="row justify-center">
        <q-btn color="red-10" class="q-ma-sm"
        @click="fight">
          BRAWL!
        </q-btn>
      </div> 
    </div>

    <!--Character details-->
    <div class="row">
      <div class="col-xs-12 col-sm-6" v-for="(chara,index) in charas" v-bind:key="index">
        <transition
        appear
        leave-active-class="animated fadeOutLeft"
        >
        <character-details show-roller :class="chara" :chosen-chara-name="chara" :chara-index="index" v-show="charasShown.includes(chara)"/>
        </transition>
      </div>
    </div>

    <!-- Character add UI -->
    <q-page-sticky position="bottom-right" :offset="[18, 17]">
      <div ref="search">
      <q-search
        placeholder="Add Character"
        icon="search"
        clearable
        v-model="chosenChara"
        v-show="addMenuOpen"
        class="bg-primary"
        dark
        style="height: 2.7em; border-radius: 5px; max-width: 14.3em;"
        >
          <q-autocomplete @search="showCharaList" @selected="selected" :max-results="7"/>
        </q-search> 
      </div>
    </q-page-sticky>

    <!-- FABulous toggle -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" ref="addBtn">
      <q-btn
        round
        :color="addMenuOpen ? 'primary' : 'secondary'"
        @click="addCharaMenu"
        :text-color="addMenuOpen ? 'secondary' : 'primary'"
        :class="{'no-shadow': addMenuOpen}"
      > 
        <div ref="addIcon"><q-icon name="add"></q-icon></div>
      </q-btn>
    </q-page-sticky>

    <!-- FABulous d20 roll -->
    <q-page-sticky position="bottom-right" :offset="[18, 72]">
      <q-btn
        round
        color="primary"
        @click="d20Roll"
        text-color="ass-gold"
      > 
        <div ref="d20Dice"><q-icon name="casino"></q-icon></div>
        <q-tooltip :delay="300" anchor="top middle" 
            self="bottom middle" :offset="[10, 5]" v-show="d20RollResult">
            <strong>Roll: {{d20RollResult}}</strong>
          </q-tooltip>
      </q-btn>
    </q-page-sticky>

    <!-- battle modal -->
    <battle-modal :show="showBattleModal" :chosen-charas="charasInPvp" @close-handler="battleModalCloseHandler"/>

    <!-- Notes Modal -->
    <notes-modal :show="true"/>

    <!-- Fight result modal -->
    <q-modal v-model="showFightResult" minimized ref="modalRef">
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md">Fight Result</div>
        <p v-for="result in fightResult" :key="result">{{result}}</p>
        <q-btn color="red" @click="hideFightResult" label="Close" />
      </div>
    </q-modal>

    
  </q-page-container>

</template>

<script>
import { 
  Consts,
  CalcUtils,
  SheetUtils,
  Converter
} from "utils";

import { EventBus } from "store/ass-store";

import { BattleModal, NotesModal } from "modals";

import { CharacterCard, CharacterDetails } from "components";
import {hideSearch, showSearch, rotatePlus, rollDice} from '../anime.js';

export default {
  name: 'Calculator',
  components: {
    BattleModal,
    CharacterCard,
    CharacterDetails,
    NotesModal,
  },
  beforeRouteLeave(to, from, next) {
    this.$q.dialog({
      title: "Are you sure you wanna leave?",
      message: "I'd hate to see you go :<",
      ok: 'Get me out of here!',
      cancel: 'Sorry, misclick.',
      color: 'black',
    }).then(() => {
      next();
    }).catch(() => {
      next(false);
    })
  },
  data(){
    return {
      showBattleModal: false,
      charas: [],
      charasInPvp: [],
      charasShown: [],
      chosenChara: "",
      d20RollResult: "",
      addMenuOpen: false,
      showFightResult: false,
      fightResult: [],
    }
  },
  mounted(){
    EventBus.$on('deleteCharacter', charaIndex => {
      this.charasShown.splice(charaIndex, 1);
      let self = this;
      setTimeout(function() {
        self.charas.splice(charaIndex, 1);
      }, 1000); 
    });
  },
  watch: {
      currentPage: 'fetchData',
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    addToPvpList: function(chara, selected){
      //this method is called when user clicks on a card
      //therefore, if a card is selected already, chara will
      //have to be removed from the charasInPvp array
      if(selected){
        const index = this.charasInPvp.indexOf(chara);
        if (index > -1) {
          this.charasInPvp.splice(index, 1);
        }
      } else{
        this.charasInPvp.push(chara);
      }
    },
    doAddChara: function(chara) {
      if(!this.charas.includes(chara)) {
        this.charas.push(chara);
        this.charasShown.push(chara);
      }
    },
    fetchData: function () {
      var sheetUrl = SheetUtils.buildSheetUrl(SheetUtils.CHARA_HEADERS_SHEET);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', sheetUrl );
      xhr.onload = function () {
        const response  = JSON.parse(xhr.responseText);
        EventBus.setCharacters(Converter.gsxToAss(response.feed.entry));
      }
      xhr.send()
    },
    showCharaList: function(input, done) {
      const regex = new RegExp("\\b" + input,"gim");
      let names = [];
      let chara = {};
      
      Object.keys(EventBus.characters).forEach(charaName => {
        chara = EventBus.characters[charaName];
        if (chara.name.match(regex) || chara.codename.match(regex)) {
          names.push({
            value: chara.name,
            label: chara.name,
            sublabel: chara.codename
          });
        }
      });

      done(names);
    },
    selected: function(item, keyboard){
      if(!keyboard){
        this.doAddChara(item.value);
        this.chosenChara = "";
      }
    },
    addCharaMenu: function() {
      let self = this;
      if(this.addMenuOpen) {
        hideSearch(this.$refs.search);
        setTimeout(function() {
        self.addMenuOpen = !self.addMenuOpen;
        }, 300);
      } else {
        showSearch(this.$refs.search);
        this.addMenuOpen = !this.addMenuOpen;
      }
      rotatePlus(this.$refs.addIcon);
    },
    d20Roll: function() {
      let rollResult = CalcUtils.d20();
      if(rollResult < 10) {
        rollResult = "0" + rollResult;
      }
      this.d20RollResult = rollResult;
      rollDice(this.$refs.d20Dice);
    },
    fight: function() {
      if(this.charasInPvp.length > 1){
        let charaWithAgiArr = [];
        this.charasInPvp.forEach(charaInPvp => {
          let chara = {};
          chara.name = charaInPvp;
          chara.agility = EventBus.characters[charaInPvp][Consts.AGILITY];
          charaWithAgiArr.push(chara);
        })
        this.charasInPvp = CalcUtils.precedenceRoll(charaWithAgiArr);
        this.showBattleModal = true;
      } else {
        this.$q.notify({
          message: "Must select 2 or more characters for PVP!",
          timeout: 300,});
      }
    },
    hideFightResult: function() {
      this.showFightResult = false;
    },
    battleModalCloseHandler: function(){
      this.showBattleModal = false;
    }
  }
}
</script>

<style lang="stylus" scoped>
img
  height 12em
  width auto

.card-padding
  padding 0.7em 0.7em 0.7em
</style>

<style>
::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 15px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 15px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
    background-color:light-grey;
}
</style>


