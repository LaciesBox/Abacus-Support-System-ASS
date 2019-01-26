<template>
  <q-page-container>
    <!-- No characters on workspace -->
    <div class="q-mt-lg text-center text-italic text-grey" v-show="charas.length == 0">
      Add some characters for some fun-nyan~ <br>
      Or you can look at my butt~ <br>
      <img src="../assets/abacus-ass.png" class="q-mt-lg margin-auto"/>
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
        :color="fabColor"
        @click="addCharaMenu"
        :text-color="fabTextColor"
        :class="blend"
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
            self="bottom middle" :offset="[10, 5]" v-show="true">
            <strong>Roll: {{rollHistory[rollHistory.length - 1]}}</strong>
          </q-tooltip>
        <!-- TODO: Implement caching of rolls -->
        <!-- <q-tooltip :delay="300" anchor="top middle"  
              v-show="rollHistory.length > 0"
              v-for="(roll, index) in rollHistory"
              :key="index"
              self="bottom middle" :offset="[0, (index * 40) + 5]"
              :ref="'dice' + index">
              <strong>Roll: {{rollHistory[index]}}</strong>
        </q-tooltip> -->
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

import { CharacterDetails } from "components";
import {hideSearch, showSearch, rotatePlus, rollDice} from '../anime.js';

export default {
  name: 'Calculator',
  components: {
    CharacterDetails
  },
  data(){
    return {
      charas: ["Eien Sonzai", "Kristine Heilig Pandora"],
      charasShown: ["Eien Sonzai", "Kristine Heilig Pandora"],
      chosenChara: "",
      addMenuOpen: false,
      blend: "",
      fabColor: "secondary",
      fabTextColor: "primary",
      rollHistory: [],
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
    toggleFabColor: function(){
        this.fabColor = this.fabColor == "primary" ? "secondary" : "primary";
        this.fabTextColor = this.fabTextColor == "primary" ? "secondary" : "primary";
    },
    addCharaMenu: function() {
      let self = this;
      if(this.addMenuOpen) { //if open, close
        this.blend="";
        hideSearch(this.$refs.search);
        setTimeout(function() {
        self.addMenuOpen = !self.addMenuOpen;
        }, 300);
      } else {
        this.blend="no-shadow";
        showSearch(this.$refs.search);
        this.addMenuOpen = !this.addMenuOpen;
      }
      this.toggleFabColor();
      rotatePlus(this.$refs.addIcon);
    },
    d20Roll: function() {
      let rollResult = CalcUtils.d20();
      if(rollResult < 10) {
        rollResult = "0" + rollResult;
      }
      if(this.rollHistory.length < 5) {
        this.rollHistory.push(rollResult);
      } else {
        this.rollHistory.shift();
        this.rollHistory.push(rollResult);
      }
      rollDice(this.$refs.d20Dice);
    },
    fight: function() {
      let teams = [];
      let team1 = {};
      team1.name = "1";
      team1.members = [];
      let team2 = {};
      team2.name = "2";
      team2.members = [];
      let team3 = {};
      team3.name = "3";
      team3.members = [];
      let team4 = {};
      team4.name = "4";
      team4.members = [];
      let team5 = {};
      team5.name = "5";
      team5.members = [];
      teams.push(team1, team2, team3, team4, team5);
      EventBus.$emit('getFighters', teams);
      this.fightResult = CalcUtils.pvpRoll(teams);
      this.showFightResult = true;
    },
    hideFightResult: function() {
      this.showFightResult = false;
    }
  }
}
</script>

<style scoped>
img {
  height: 12em;
  width: auto;
}
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


