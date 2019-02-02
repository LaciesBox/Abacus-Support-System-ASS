<template>
  <q-page-container>
    <!-- No characters on workspace -->
    <div class="q-mt-lg text-center text-italic text-grey" v-show="charas.length == 0">
      Add some characters for some fun-nyan~ <br>
      Or you can look at my butt~ <br>
      <img src="../assets/abacus-ass.png" class="q-mt-lg margin-auto"/>
    </div>
    <div class="row">
      <div class="col-xs-6 col-sm-4 col-md-2 card-padding" v-for="(chara,index) in charas" v-bind:key="index">
        <character-card :class="chara" :chosen-chara-name="chara" :chara-index="index" @select="addToPvpList"/>
      </div>
    </div>
    <!--Character details-->
    <div class="row">
      <div class="col-xs-12 col-sm-6" v-for="(chara,index) in charas" v-bind:key="index">
        <transition
        appear
        leave-active-class="animated fadeOutLeft"
        >
        <character-details :class="chara" :chosen-chara-name="chara" :chara-index="index" v-show="charasShown.includes(chara)"/>
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
          <q-autocomplete @search="showCharaList" @selected="selected" />
        </q-search> 
      </div>
    </q-page-sticky>

    <!-- FABulous toggle -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" ref="addBtn">
      <q-btn
        round
        :color="[addMenuOpen ? 'primary' : 'secondary']"
        @click="addCharaMenu"
        :text-color="[addMenuOpen ? 'secondary' : 'primary']"
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

    <!-- Temporary fight roll -->
    <q-page-sticky position="bottom-right" :offset="[18, 126]">
      <q-btn
        round
        color="primary"
        @click="fight"
        text-color="ass-gold"
      > 
        <div><q-icon name="fas fa-bolt"></q-icon></div>
      </q-btn>
    </q-page-sticky>
    
    <!-- battle modal -->
    <battle-modal :show="showBattleModal" :chosen-charas="charasInPvp" @close-handler="battleModalCloseHandler"/>

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

import { BattleModal } from "modals";

import { CharacterCard, CharacterDetails } from "components";
import {hideSearch, showSearch, rotatePlus, rollDice} from '../anime.js';

export default {
  name: 'Calculator',
  components: {
    BattleModal,
    CharacterCard,
    CharacterDetails
  },
  data(){
    return {
      showBattleModal: false,
      charas: ["Eien Sonzai", "Hanekawa Tsubasa"],
      charasInPvp: [],
      charasShown: ["Eien Sonzai", "Hanekawa Tsubasa"],
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
      // [banonas] temporary; my internet data is sad 
      // const temp = { "Eien Sonzai": { "avatar": "https://i.imgur.com/Ca6SOTc.png", "name": "Eien Sonzai", "occupationArr": [ "Developer", "Hacker" ], "occupationProficiencyArr": [ "5", "5" ], "occupationIsgeneralistArr": [ "true", "true" ], "constitution": "2", "strength": "1", "agility": "1", "appeal": "5", "talentArr": [ "Public Speaking", "Smug", "Chess" ], "talentProficiencyArr": [ "5", "5", "4" ], "afflictionArr": [ "Gambling" ], "afflictionSeverityArr": [ "1" ], "gang": "?", "codename": "Chaos", "devas": "?" }, "Kristine Heilig Pandora": { "avatar": "https://i.pinimg.com/236x/38/06/60/380660c9bed811d7313a4f3bc1c5e837.jpg", "name": "Kristine Heilig Pandora", "occupationArr": [ "Doctor", "Engineer" ], "occupationProficiencyArr": [ "5", "5" ], "occupationIsgeneralistArr": [ "true", "true" ], "constitution": "2", "strength": "1", "agility": "5", "appeal": "5", "talentArr": [ "Piano", "Dancing", "Singing", "Painting" ], "talentProficiencyArr": [ "5", "3", "3", "3" ], "afflictionArr": [ "Inferiority Complex" ], "afflictionSeverityArr": [ "4" ], "gang": "B", "codename": "Angel", "devas": "翼 WINGS 3 - DASH" } }
      // EventBus.setCharacters(temp);
      
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
      let names = [];

      Object.keys(EventBus.characters).forEach(charaName => {
        if (charaName.toUpperCase().includes(input.toUpperCase())) {
          names.push({
            value: charaName,
            label: charaName
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
      if(this.addMenuOpen) { //if open, close
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
      if(this.charasInPvp.length > 0){
        this.showBattleModal = true;
      } else {
        this.$q.notify({
          message: "No characters selected for PVP!",
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
  padding 5px 5px 5px
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


