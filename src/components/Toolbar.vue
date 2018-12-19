<template>
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
        <drawer :drawerOpen="leftDrawerOpen"/>
    </q-layout-header>
</template>

<script>
import Drawer from './Drawer.vue'

export default {
  components: {
    Drawer
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
  
}
</script>

<style>
</style>
