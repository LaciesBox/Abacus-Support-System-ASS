<template>
  <q-page-container>
    <!--Start of character addition UI-->
    <div class="row q-pr-sm q-pt-sm q-ma-sm">
      <div class="col-xs-12 col-lg-3">
        <q-search
        placeholder="Select a character"
        icon="face"
        clearable
        v-model="placeholder"
        >
          <q-autocomplete @search="showCharaList" @selected="selected" />
        </q-search>
      </div>
    </div>
    <!--End of character addition UI-->
    <div class="row">
      <character-details/>
      <character-details chosen-chara-name="Kristine Heilig Pandora"/>
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
          names.push(charaName);
        }
      });

      if (names.length === 0) {
        names.push("No character found.");
      }
      done(names);
    }
  }
}
</script>

<style>
</style>

