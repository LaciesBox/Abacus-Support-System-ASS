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
      var sheetUrl = SheetUtils.buildSheetUrl(SheetUtils.CHARA_HEADERS_SHEET);
      var xhr = new XMLHttpRequest();
      xhr.open('GET', sheetUrl );
      xhr.onload = function () {
        const response  = JSON.parse(xhr.responseText);
        EventBus.setCharacters(Converter.gsxToAss(response.feed.entry));
      }
      xhr.send()
    }
  }
}
</script>

<style>
</style>

