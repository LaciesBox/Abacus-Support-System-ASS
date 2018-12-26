<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <toolbar />
    <router-view></router-view>
  </q-layout>
</template>

<script>
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'LayoutDefault',
  components: {
    Toolbar
  }
}
</script>

<style>
  img {
    width: 100%;
  }
</style>
