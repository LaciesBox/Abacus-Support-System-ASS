<template>
  <q-page-container>
      <character-details :chara-entries="dataEntries"/>
  </q-page-container>
</template>

<script>
import { 
  Consts,
  CalcUtils,
  SheetUtils,
  Converter
} from "utils";

import { CharacterDetails } from "components";

export default {
  name: 'Calculator',
  components: {
    CharacterDetails
  },
  data () {
    return {
      dataEntries:null
    }
  },
  watch: {
      currentPage: 'fetchData'
  },
  created: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      var sheetUrl = SheetUtils.buildSheetUrl(SheetUtils.CHARA_HEADERS_SHEET);
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', sheetUrl )
      xhr.onload = function () {
        self.dataEntries = JSON.parse(xhr.responseText);
        self.dataEntries = Converter.gsxToAss(self.dataEntries.feed.entry);
      }
      xhr.send()
    }
  }
}
</script>

<style>
</style>

