<template>
  <q-layout-drawer v-model="drawerOpen" overlay :content-class="$q.theme === 'mat' ? 'bg-primary' : null">
    <q-list no-border link inset-delimiter>
      <q-list no-border link inset-delimiter>
        <q-list-header>Directory</q-list-header>
        <q-item @click.native="openURL('https://facebook.com/groups/unboxlacie/')">
          <q-item-side icon="group"/>
          <q-item-main label="Lacie's Box Community"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://www.facebook.com/groups/1108088439350326/')">
          <q-item-side icon="people_outline"/>
          <q-item-main label="Bishamonten Group"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://www.facebook.com/Bishamonten-2162920130626725/')">
          <q-item-side icon="public"/>
          <q-item-main label="Bishamonten Page"></q-item-main>
        </q-item>
      </q-list>
    </q-list>
    
    <img class="abacus" src="../assets/abacus-walking.png" alt="Abacus">
  </q-layout-drawer>
</template>

<script>
import { openURL } from "quasar";
export default {
  name: "Drawer",
  props: {
      drawerOpen: Boolean
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>
.abacus {
  height: 10em;
  width: auto;
  position: absolute;

  bottom: 0px;
}
</style>
