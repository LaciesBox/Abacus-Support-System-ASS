<template>
    <q-layout-header>
        <q-toolbar
        color="primary"
        style="height: 4em;"
        >
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
        ><q-icon name="menu" color="secondary"></q-icon></q-btn>

        <q-toolbar-title class="nova absolute-center text-secondary">
            <span style="font-size: 30px;" class="unselectable">ABACUS</span>
        </q-toolbar-title>
        </q-toolbar>
        <drawer :drawerOpen="leftDrawerOpen"/>
    </q-layout-header>
</template>

<script>
import Drawer from "./Drawer.vue";

export default {
  name: "Toolbar",
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

<style lang="stylus">
</style>
