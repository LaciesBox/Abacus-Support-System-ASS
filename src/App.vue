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

.bg-color
  background-color $ass-app-bg

.txt-color
  color $secondary

img 
  width 100%
</style>
