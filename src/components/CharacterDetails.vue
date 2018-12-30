<template>
  <q-page>
    {{chosenChara}}
    <!-- Start of chara details UI -->
		<div class="text-center width-30 float-left generic-side-margin">
			<q-card color="primary">
				<q-card-media>
					<img src="https://i.imgur.com/Ca6SOTc.png">
					<q-card-title slot="overlay">{{chosenChara.name}}</q-card-title>
				</q-card-media>
			</q-card>
		</div>
    <div class="row generic-top-margin generic-side-margin">
      <div class="col">
        <q-card inline color="primary" class="physical-props-title">
          <q-card-title>Physical Properties</q-card-title>
        </q-card>
      </div>
    </div>
    <div class="row inline generic-top-margin">
      <div class="col">
        <q-card inline color="primary" class="physical-props-title">
          <q-card-title>Physical Properties</q-card-title>
        </q-card>
      </div>
    </div>
    <!-- End of chara details UI -->
    <!--Start of character search UI-->
    <div class="row">
      <q-search
        float-label="Character Select"
        placeholder="Character Name"
        icon="face"
        clearable
        inverted
        v-model="placeholder"
        color="secondary"
        @input="input => showCharaList(input)"
      />
      <q-list highlight link v-if="charaNamesFiltered">
        <q-item v-for="(charaName, index) in charaNamesFiltered" v-bind:key="index">
          <q-item-main :label="charaName"/>
        </q-item>
      </q-list>
    </div>
    <!--End of character search UI-->

    <!-- physical properties -->
    <div class="row">
      <div
          class="col-lg-3 col-xs-6" 
          v-for="stat in Consts.PHYSICAL_PROPERTIES" 
          v-bind:key="stat">
        <stat :field-name="stat" :stat-name="stat" :value="chosenChara[stat]"/>
      </div>
    </div>

    <!-- occupation -->
    <div class="row" v-if="occupationCount > 0 ">
      <div class="col-lg-3 col-xs-6" v-for="i in occupationCount" 
        v-bind:key="chosenChara[Consts.OCCUPATION_ARR][i-1]">
        <stat 
            :field-name="Consts.OCCUPATION+i"
            :stat-name="chosenChara[Consts.OCCUPATION_ARR][i-1]" 
            :value="chosenChara[Consts.OCCUPATION_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- talents -->
    <div class="row" v-if="talentCount > 0 ">
      <div class="col-lg-3 col-xs-6" v-for="i in talentCount" 
        v-bind:key="chosenChara[Consts.TALENT_ARR][i-1]">
        <stat 
            :field-name="Consts.TALENT+i"
            :stat-name="chosenChara[Consts.TALENT_ARR][i-1]" 
            :value="chosenChara[Consts.TALENT_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- afflictions -->
    <div class="row" v-if="afflictionCount > 0 ">
      <div class="col-lg-3 col-xs-6" v-for="i in afflictionCount" 
        v-bind:key="chosenChara[Consts.AFFLICTION_ARR][i-1]">
        <stat
            :field-name="Consts.AFFLICTION+i"
            :stat-name="chosenChara[Consts.AFFLICTION_ARR][i-1]" 
            :value="chosenChara[Consts.AFFLICTION_SEVERITY_ARR][i-1]"/>
      </div>
    </div>

    <!-- roll -->
    <div class="row">
      <q-btn @click="doRoll" label="Roll"/>
    </div>

  </q-page>
</template>

<script>
import { 
  Consts, 
  CalcUtils
} from "utils";

import Stat from "./Stat.vue";

import { EventBus } from "store/ass-store";

export default {
  name: "CharacterDetails",
  components: {
    Stat
  },

  created() {
    this.Consts = Consts;
  },

  data() {
    return {
      charaNamesFiltered: null,
      chosenCharaName: "Eien Sonzai",
      placeholder: null,
    };
  },

  computed: {
    chosenChara(){
      if(this.charaEntries && this.chosenCharaName){
        return this.charaEntries[this.chosenCharaName];
      }
      return {};
    },
    talentCount(){
      return this.getCount(Consts.TALENT_ARR);
    },
    afflictionCount(){
      return this.getCount(Consts.AFFLICTION_ARR);
    },
    occupationCount(){
      return this.getCount(Consts.OCCUPATION_ARR);
    }
  },

  props: {
    charaEntries: Object
  },

  methods: {
    doRoll: function(){
      //save reference to stat
      let stats = {};
      EventBus.$emit('retrieveStats', stats);
      console.log(stats);
      console.log(CalcUtils.roll(stats));
    },
    getCount: function(field){
      const count = this.chosenChara[field];
      return  count ? count.length : 0;
    },
    showCharaList: function(input) {
      if (!input) {
        this.charaNamesFiltered = null;
      } else {
        let names = [];

        Object.keys(this.charaEntries).forEach(chara => {
          let charaName = chara.gsx$name.$t;
          
          if (charaName.toUpperCase().includes(input.toUpperCase())) {
            names.push(charaName);
          }
        });

        if (names.length === 0) {
          names.push("No character found.");
        }
        this.charaNamesFiltered = names;
      }
    }
  }
};
</script>

<style scoped>
.q-search {
  position: relative;
  width: 15em;
  margin-left: 1em;
  margin-top: 1em;
}
.q-list {
  width: 15em;
  margin-left: 1em;
}
.q-card-media {
  width: 100%;
}
.physical-props-title {
  width: 100%;
}
</style>

<style>
.generic-side-margin {
  margin-left: 1em;
  margin-right: 1em;
}
.generic-top-margin {
  margin-top: 1em;
}
.width-30 {
  width: 30%;
}

.width-60 {
	width: 60%;
}
</style>
