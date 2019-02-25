<template>
    <q-layout-header :class="layoutClass">
      <div>
        <q-toolbar color="primary" :class="toolbarClass">
        <q-btn flat dense round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            v-show="!isLanding">
            <q-icon name="menu" color="secondary"></q-icon>
        </q-btn>
        <q-toolbar-title :class="toolbarTitleClass">
          <span :class="abacusSpanClass">
            <div ref="abacusLabel">
            ABACUS
            </div>
          </span>
        </q-toolbar-title>
        </q-toolbar>
      </div>
        <drawer :drawerOpen="leftDrawerOpen"/>
    </q-layout-header>
</template>

<script>
import Drawer from "./Drawer.vue";
import { shrinkToolbar, shrinkToolbarLabel } from "../anime.js";

export default {
  name: "Toolbar",
  props: {
    isLanding: Boolean,
  },
  components: {
    Drawer
  },
  data () {
    return {
      leftDrawerOpen: false,
      isDesktop: this.$q.platform.is.desktop,
    }
  },
  computed: {
    layoutClass() {
      return this.isLanding? 'no-shadow' : '';
    },
    toolbarClass() {
      if(this.isDesktop && this.isLanding) { return 'toolbar-dl'; }
      if(!this.isDesktop && this.isLanding) { return 'toolbar-ml'; }
      return 'toolbar';
    },
    toolbarTitleClass() {
      let titleClass = "nova absolute-center text-secondary";
      if(this.isLanding) {
        titleClass += " q-mt-lg";
      }
      return titleClass;
    },
    abacusSpanClass() {
      let spanClass = "unselectable block abacus-label";
      if(this.isDesktop && this.isLanding) {
        spanClass += "-dl";
      }
      if(!this.isDesktop && this.isLanding) {
        spanClass += "-ml";
      }
      return spanClass;
    }
  },
  mounted(){
  },
  methods: {
    land: function() {
      // TODO: Animate Land
      // shrinkToolbar(this.$refs.toolbar);
      // shrinkToolbarLabel(this.$refs.abacusLabel);
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus">
.toolbar-dl
  height 13em;

.toolbar-ml
  height 8em;

.abacus-label-dl
  font-size 10vw;

.abacus-label-ml
  font-size 20vw;

.toolbar
  height 4em;
  
.abacus-label
  font-size 40px;
</style>
