<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <toolbar />
    

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import HelloWorld from './components/HelloWorld.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    HelloWorld,
    Toolbar
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
