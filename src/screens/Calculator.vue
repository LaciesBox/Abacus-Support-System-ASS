<template>
  <q-page-container class="row">
    <q-btn 
        round
        color="primary"
        @click="doAddChara"
        icon="add"
        class="fixed"
        style="left: 18px; bottom: 18px; z-index:5"
        />
    <div v-for="n in charaIndex" v-bind:key="n">
      <character-details :chara-index="n"/>
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
      charaIndex: 1
    }
  },
  watch: {
      currentPage: 'fetchData'
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    doAddChara: function() {
      this.charaIndex+=1;
    },
    fetchData: function () {
      

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
    }
  }
}
</script>

<style>
</style>

