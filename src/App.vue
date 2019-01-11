<template>
  <q-layout id="q-app" view="lHh Lpr lFf" class="bg-color txt-color" >
    <toolbar />
    <router-view></router-view>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { Toolbar } from 'components'

export default {
  name: 'LayoutDefault',
  components: {
    Toolbar
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

.luxia-lg
  font-family "Luxia"
  font-size 40px

.ptsans-sm
  font-family "PT_Sans"
  font-size 18px

img 
  width 100%
</style>
