<template>
  <q-layout id="q-app" view="lHh Lpr lFf" 
  class="bg-color txt-color" >
    <toolbar :is-landing="isLanding" ref="toolbar"></toolbar>
    <router-view></router-view>
  </q-layout>
</template>

<script>
import { 
  Consts,
  CalcUtils,
  SheetUtils,
  Converter
} from "utils";
import { EventBus } from "store/ass-store";
import { openURL } from 'quasar';
import { Toolbar } from 'components';
import { shrink } from './anime.js';

export default {
  name: 'LayoutDefault',
  data() {
    return {
      isLanding: this.$route.path != "/abacus" && this.$route.path != "/eien-sonzai-1"
      ? true : false,
    }
  },
  mounted(){
    EventBus.$on('land', () => {
      this.isLanding = false;
    });
  },
  components: {
    Toolbar
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  
@import '~variables'

@font-face 
  font-family Adobe
  src url("./assets/fonts/Adobe_Fangsong/AdobeFangsongStd-Regular.otf")

@font-face
  font-family Luxia
  src url("./assets/fonts/Luxia/Luxia-Display.otf")

@font-face
  font-family PT_Sans
  src url("./assets/fonts/PT_Sans/PT_Sans-Web-Regular.ttf")

@font-face 
  font-family Nova-Mono
  src url("./assets/fonts/Nova_Mono/NovaMono.ttf")

@font-face 
  font-family Lato-BI
  src url("./assets/fonts/Lato/Lato-BoldItalic.ttf")
  
@font-face 
  font-family Lato-L
  src url("./assets/fonts/Lato/Lato-Light.ttf")

@font-face 
  font-family Lato-R
  src url("./assets/fonts/Lato/Lato-Regular.ttf")

.bg-color
  background-color $ass-app-bg

.bg-ass-gold
  background-color $ass-gold

.txt-color
  color $secondary

.inline 
  display: inline;

.suzaku-red
  background-color $suzaku-red

.byakko-black
  background-color $byakko-black

.seiryuu-pink
  background-color $seiryuu-pink

.genbu-purple
  background-color $genbu-purple

.panopticon-grey
  background-color $panopticon-grey

.unselectable 
  -webkit-user-select: none;        
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

.nova
  font-family "Nova-Mono"

.lato-bi
  font-family "Lato-BI"

.lato-l
  font-family "Lato-L"
  
.lato-r
  font-family "Lato-R"

.luxia-lg
  font-family "Luxia"
  font-size 40px

.ptsans-sm
  font-family "PT_Sans"
  font-size 18px

img 
  width 100%
</style>
