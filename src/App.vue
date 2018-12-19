<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <toolbar />
    <router-view></router-view>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    Toolbar
  },
  methods: {
    openURL
  }
}
</script>

<style>
  img {
    width: 100%;
  }
</style>
