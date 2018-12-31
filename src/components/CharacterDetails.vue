<template>
  <div class="q-pa-sm col-xs-12 col-sm-12">
    <!-- Start of chara details UI -->
    <div>
      <div>
        <img class="avatar float-left q-mr-sm" :src="chosenChara.avatar">
      </div>
      <div class="row">
        <div class="col-xs-12 col-lg-6">
          <ass-text :link="chosenChara[Consts.NAME]" @click="openProfileModal"/>
          <ass-text :content="chosenChara[Consts.CODENAME]"/>
        </div>

        <div class="col-xs-12 col-lg-6">
          <div class="row">
            <ass-text class="col-xs-5 col-lg-12" 
                :label="Consts.LB_GANG" :content="Gangs[chosenChara[Consts.GANG]]"/>
            <ass-text class="col-xs-7 col-lg-12" 
                :label="Consts.LB_DEVAS" :content="chosenChara[Consts.DEVAS]"/>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <!--Start of character search UI-->
        <q-search
          placeholder="Character Name"
          icon="face"
          clearable
          v-model="placeholder"
          class="full-width"
          @input="input => showCharaList(input)"
        />
        <q-list highlight link v-if="charaNamesFiltered">
          <q-item v-for="(charaName, index) in charaNamesFiltered" v-bind:key="index">
            <q-item-main :label="charaName"/>
          </q-item>
        </q-list>
        <!--End of character search UI-->
      </div>
    </div>

    <!-- physical properties -->
    <div class="row">
      <div class="col-12">
        <section-header content="Physical Properties"/>
      </div>
      <div
        class="col-md-3 col-xs-6"
        v-for="stat in Consts.PHYSICAL_PROPERTIES" 
        v-bind:key="stat">
        <stat :chara-index ="charaIndex" 
            :field-name="stat" :stat-name="stat.substr(0,3)" :value="chosenChara[stat]"/>
      </div>
    </div>

    <!-- occupation -->
    <div class="row" v-if="occupationCount > 0 ">
      <div class="col-12">
        <section-header content="Occupations"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in occupationCount" 
        v-bind:key="chosenChara[Consts.OCCUPATION_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.OCCUPATION+i"
            :stat-name="chosenChara[Consts.OCCUPATION_ARR][i-1]" 
            :value="chosenChara[Consts.OCCUPATION_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- talents -->
    <div class="row" v-if="talentCount > 0 ">
      <div class="col-12">
        <section-header content="Talents"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in talentCount" 
        v-bind:key="chosenChara[Consts.TALENT_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.TALENT+i"
            :stat-name="chosenChara[Consts.TALENT_ARR][i-1]" 
            :value="chosenChara[Consts.TALENT_PROFICIENCY_ARR][i-1]"/>
      </div>
    </div>

    <!-- afflictions -->
    <div class="row" v-if="afflictionCount > 0 ">
      <div class="col-12">
        <section-header content="Afflictions"/>
      </div>
      <div class="col-lg-4 col-xs-6" v-for="i in afflictionCount" 
        v-bind:key="chosenChara[Consts.AFFLICTION_ARR][i-1]">
        <stat :chara-index ="charaIndex" 
            :field-name="Consts.AFFLICTION+i"
            :stat-name="chosenChara[Consts.AFFLICTION_ARR][i-1]" 
            :value="chosenChara[Consts.AFFLICTION_SEVERITY_ARR][i-1]"/>
      </div>
    </div>

    <!-- roll -->
    <div class="row q-pt-sm">
      <div class="col-2">
      <q-btn class="full-width" @click="doRoll" size="lg" label="Roll"/>
      </div>
      <div class="col-10 q-pl-sm">
          <ass-text label="Roll" :content="rollResult.roll"/>
          <ass-text label="Final Roll" :content="rollResult.finalRoll"/>
      </div>
    </div>

  </div>
</template>

<script>
import { 
  Consts,
  CalcUtils,
  Lookups
} from "utils";

import Stat from "./Stat.vue";
import AssText from "./AssText.vue";
import SectionHeader from "./SectionHeader.vue";

import { EventBus } from "store/ass-store";

export default {
  name: "CharacterDetails",
  components: {
    Stat,
    AssText,
    SectionHeader
  },

  created() {
    this.Consts = Consts;
    this.Gangs = Lookups.GANGS;
  },

  data() {
    return {
      charaNamesFiltered: null,
      placeholder: null,
      rollResult: {
        roll: "",
        finalRoll: "",
        status: ""
      }
    };
  },

  computed: {
    chosenChara(){
      if(EventBus.characters && this.chosenCharaName){
        return EventBus.characters[this.chosenCharaName];
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
    //temporary; please move to data when search will be implemented
    chosenCharaName: {
      type: String,
      default: "Eien Sonzai"
    },
    charaIndex: {
      type: Number,
      required: true
    }
  },

  methods: {
    doRoll: function(){
      //provide reference, then collect data from children
      let stats = {};
      EventBus.$emit('retrieveStats', {charaIndex: this.charaIndex, stats});

      this.rollResult = Object.assign({},CalcUtils.roll(stats));
    },
    openProfileModal: function(){
      console.log("hehe");
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

        Object.keys(EventBus.characters).forEach(charaName => {
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
.generic-side-padding {
  padding-left: 1em;
  padding-right: .5em;
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
