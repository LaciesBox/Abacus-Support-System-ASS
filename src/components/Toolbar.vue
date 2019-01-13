<template>
    <q-layout-header :class="{'no-shadow': isLanding, 'lb-bg': isLanding}"
    >
      <div>
        <q-toolbar
        color="primary"
        :class="{'toolbar-dl': isDesktop && isLanding, 'toolbar-ml': !isDesktop && isLanding,
        'toolbar': !isLanding}"
        >
        <q-btn
            flat
            dense
            round
            @click="leftDrawerOpen = !leftDrawerOpen"
            aria-label="Menu"
            v-show="!isLanding"
        ><q-icon name="menu" color="secondary"></q-icon></q-btn>
        <q-toolbar-title :class="{'nova absolute-center text-secondary': true,
        'q-mt-lg': isLanding}">
          <span :class="{'unselectable block': true, 'abacus-label-dl': isDesktop && isLanding,
          'abacus-label-ml': !isDesktop && isLanding, 'abacus-label': !isLanding}">
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
  mounted(){
  },
  methods: {
    land: function() {
      shrinkToolbar(this.$refs.toolbar);
      shrinkToolbarLabel(this.$refs.abacusLabel);
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
