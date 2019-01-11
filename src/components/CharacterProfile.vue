<template>
  <div class="row text-black">
    <div class="col-12 q-pa-none">
      <q-card class="bg-grey-2">
        <q-card-title class="q-pa-sm q-pl-lg">
          <!-- TODO Change font -->
          Character Profile
        </q-card-title>
        <q-card-separator />
        <q-card-main class="q-pa-none">
          <q-list separator>
            <!-- Biometrics COLLAPSIBLE -->
            <q-collapsible icon="memory" label="Biometrics" :group="profile" 
            :opened="isDesktop" @hide="hide('biometrics')" ref="biometrics">
            <q-scroll-area style="height: 30em;" :thumb-style="{
              right: '4px',
              borderRadius: '5px',
              background: 'silver',
              width: '10px',
              opacity: 1
            }"
            :delay="1500">
            <!-- Identification SUBHEADER-->
            <div class="row">
              <section-subheader content="Identification"></section-subheader>
            </div>
            <div class="row">
            <div class="col-12">
            <character-profile-row label="Name:" :center-content="chosenChara[Consts.NAME]"></character-profile-row>
            </div>
            <div class="col-12">
            <character-profile-row label="Codename:" :center-content="chosenChara[Consts.CODENAME]"></character-profile-row>
            </div>
            <div class="col-12">
            <character-profile-row label="RPer Name:" :center-content="chosenChara[Consts.RPER_NAME]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-xs-8 col-lg-6">
            <character-profile-row label="Birthday:" :center-content="chosenChara[Consts.BIRTHDAY]"></character-profile-row>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-xs-4 col-lg-5">
            <character-profile-row label="Age:" :center-content="chosenChara[Consts.AGE]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-xs-8 col-lg-6">
            <character-profile-row label="Nationality:" :center-content="chosenChara[Consts.NATIONALITY]"></character-profile-row>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-xs-4 col-lg-5">
            <character-profile-row label="Sex:" :center-content="chosenChara[Consts.SEX]"></character-profile-row>
            </div>
            </div>

            <!-- Appearance SUBHEADER-->
            <div class="row">
              <section-subheader content="Appearance"></section-subheader>
            </div>
            <div class="row">
            <div class="col-12">
            <character-profile-row label="Faceclaim:" :center-content="chosenChara[Consts.FACECLAIM]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-xs-6 col-lg-6">
            <character-profile-row label="Eye Color:" :center-content="chosenChara[Consts.EYECOLOR]"></character-profile-row>
            </div>
            <div class="col-xs-6 col-lg-6">
            <character-profile-row label="Hair Color:" :center-content="chosenChara[Consts.HAIRCOLOR]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-xs-6 col-lg-6">
            <character-profile-row label="Height:" :center-content="chosenChara[Consts.HEIGHT]"></character-profile-row>
            </div>
            <div class="col-xs-6 col-lg-6">
            <character-profile-row label="Weight:" :center-content="chosenChara[Consts.WEIGHT]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            </div>
            </q-scroll-area>
            </q-collapsible>

            <!-- About me COLLAPSIBLE-->
            <q-collapsible icon="fas fa-address-book" label="About Me" 
            :group="profile" @hide="hide('aboutMe')" ref="aboutMe">
            <q-scroll-area style="height: 30em;" :thumb-style="{
              right: '4px',
              borderRadius: '5px',
              background: 'silver',
              width: '10px',
              opacity: 1
            }"
            :delay="1500">
            <div class="row">
            <div class="col-12"><section-subheader content="General Appeal"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.GENERAL_APPEAL]"></character-profile-row>
            </div>
            </div><div class="row">
            <div class="col-12"><section-subheader content="Personality"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.PERSONALITY]"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-12"><section-subheader content="Living Dependents"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.LIVING_DEPENDENTS]" icon="group"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-12"><section-subheader content="History"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.HISTORY]"></character-profile-row>
            </div>
            </div>
            </q-scroll-area>
            </q-collapsible>

            <!-- Talents and Proficiencies COLLAPSIBLE-->
            <q-collapsible icon="security" label="Talents & Proficiencies" 
            :group="profile" @hide="hide('talents')" ref="talents">
            <q-scroll-area style="height: 30em;" :thumb-style="{
              right: '4px',
              borderRadius: '5px',
              background: 'silver',
              width: '10px',
              opacity: 1
            }"
            :delay="1500">
            <div class="row">
            <div class="col-12"><section-subheader content="Weapons"></section-subheader></div>
            <div class="col-12">
            <character-profile-row :center-content="chosenChara[Consts.WEAPONS]" icon="fas fa-khanda"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-12"><section-subheader content="Skills"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.SKILLS]" 
            :content-description="chosenChara[Consts.SKILLS_DESC]" icon="fas fa-cogs"></character-profile-row>
            </div>
            </div><div class="row">
            <div class="col-12"><section-subheader content="Occupation"></section-subheader></div>
            <div class="col-12">
            <character-profile-row :center-content="chosenChara[Consts.OCCUPATION_ARR]"
            :content-level="chosenChara[Consts.OCCUPATION_PROFICIENCY_ARR]" icon="fab fa-joomla"></character-profile-row>
            </div>
            </div>
            <div class="row">
            <div class="col-12"><section-subheader content="Talents"></section-subheader></div>
            <div class="col-xs-12 col-lg-12">
            <character-profile-row :center-content="chosenChara[Consts.TALENT_ARR]"
            :content-level="chosenChara[Consts.TALENT_PROFICIENCY_ARR]" icon="star"></character-profile-row>
            </div>
            </div>
            </q-scroll-area>
            </q-collapsible>
            </q-list>
        </q-card-main>
      </q-card>
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
import SectionHeader from "./SectionHeader.vue";
import SectionSubheader from "./SectionSubheader.vue";
import CharacterProfileRow from "./CharacterProfileRow.vue";
import AssText from "./AssText.vue";
import { EventBus } from "store/ass-store";

export default {
  name: "CharacterProfile",
  props: {
    opened: Boolean,
    chosenChara: Object,
  },
  created: function() {
    this.Consts = Consts;
  },
  watch: {
    chosenChara() {
      console.log(Consts.SKILLS_DESC);
      console.log(chosenChara[Consts.SKILLS_DESC]);
    }
  },
  computed: {
    profile() {
      return this.chosenChara[Consts.NAME] + "Profile";
    },
    isDesktop() {
      return this.$q.platform.is.desktop;
    }
  },
  components: {
    Stat,
    AssText,
    SectionHeader,
    SectionSubheader,
    CharacterProfileRow,
  },
  methods:{
    doClose: function(){
      EventBus.$emit('closeProfile');
    },
    hide: function(ref) {
      // TODO: When hiding on desktop, disallow collapsing the entire thing (to retain size)
    },
  }
}
</script>

<style scoped>
</style>
