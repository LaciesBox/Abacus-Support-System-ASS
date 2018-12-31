<template>
  <q-page-container>
    <!-- <q-btn 
        round
        color="primary"
        @click="doAddChara"
        icon="add"
        class="fixed"
        style="left: 18px; bottom: 18px; z-index:5"
        />-->
    <!--Start of character addition UI-->
    <div class="row q-pr-sm q-pt-sm q-pa-sm">
      <div class="col-xs-12 col-lg-3">
        <q-search
        placeholder="Add Character"
        icon="face"
        clearable
        v-model="chosenChara"
        >
          <q-autocomplete @search="showCharaList" @selected="selected" />
        </q-search>
      </div>
    </div>
    <!--End of character addition UI-->
    <div class="row">
      
      <div v-for="(chara, index) in charas" v-bind:key="index">
        <character-details :chosen-chara-name="chara" :chara-index="index"/>
      </div>
    </div>
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

export default {
  name: 'Calculator',
  components: {
    CharacterDetails
  },
  data(){
    return {
      charas: [],
      chosenChara: ""
    }
  },
  watch: {
      currentPage: 'fetchData'
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    doAddChara: function(chara) {
      this.charas.push(chara);
    },
    fetchData: function () {
      // [banonas] temporary; my internet data is sad 
      const temp = { "Eien Sonzai": { "avatar": "https://i.imgur.com/Ca6SOTc.png", "name": "Eien Sonzai", "occupationArr": [ "Developer", "Hacker" ], "occupationProficiencyArr": [ "5", "5" ], "occupationIsgeneralistArr": [ "true", "true" ], "constitution": "2", "strength": "1", "agility": "1", "appeal": "5", "talentArr": [ "Public Speaking", "Smug", "Chess" ], "talentProficiencyArr": [ "5", "5", "4" ], "afflictionArr": [ "Gambling" ], "afflictionSeverityArr": [ "1" ], "gang": "?", "codename": "Chaos", "devas": "?" }, "Kristine Heilig Pandora": { "avatar": "https://i.pinimg.com/236x/38/06/60/380660c9bed811d7313a4f3bc1c5e837.jpg", "name": "Kristine Heilig Pandora", "occupationArr": [ "Doctor", "Engineer" ], "occupationProficiencyArr": [ "5", "5" ], "occupationIsgeneralistArr": [ "true", "true" ], "constitution": "2", "strength": "1", "agility": "5", "appeal": "5", "talentArr": [ "Piano", "Dancing", "Singing", "Painting" ], "talentProficiencyArr": [ "5", "3", "3", "3" ], "afflictionArr": [ "Inferiority Complex" ], "afflictionSeverityArr": [ "4" ], "gang": "B", "codename": "Angel", "devas": "翼 WINGS 3 - DASH" } }

      EventBus.setCharacters(temp);
      // var sheetUrl = SheetUtils.buildSheetUrl(SheetUtils.CHARA_HEADERS_SHEET);
      // var xhr = new XMLHttpRequest();
      // xhr.open('GET', sheetUrl );
      // xhr.onload = function () {
      //   const response  = JSON.parse(xhr.responseText);
      //   EventBus.setCharacters(Converter.gsxToAss(response.feed.entry));
      // }
      // xhr.send()
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
      console.log(item, keyboard);
    }
  }
}
</script>

<style>
</style>

