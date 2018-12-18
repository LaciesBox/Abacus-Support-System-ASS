<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        height=300px
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          毘沙門天
          <div slot="subtitle">Bishamonten</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list no-border link inset-delimiter>
          <q-list-header>Directory</q-list-header>
          <q-item @click.native="openURL('https://facebook.com/groups/unboxlacie/')">
            <q-item-side icon="group" />
            <q-item-main label="Lacie's Box Community"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://www.facebook.com/groups/1108088439350326/')">
            <q-item-side icon="people_outline" />
            <q-item-main label="Bishamonten Group"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('https://www.facebook.com/Bishamonten-2162920130626725/')">
            <q-item-side icon="public" />
            <q-item-main label="Bishamonten Page"></q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <HelloWorld />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'LayoutDefault',
  components: {
    HelloWorld
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
