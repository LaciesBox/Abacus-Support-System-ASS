<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <toolbar />
    <q-page-container>
      <MainPage />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import MainPage from './components/MainPage.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    MainPage,
    Toolbar
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
