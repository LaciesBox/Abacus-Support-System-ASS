<template>
  <q-page-container>
    <q-modal v-model="maximizedModal" maximized>
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md">Maximized Modal</div><p>This one is maximized on bigger screens too.</p>
        <q-btn color="tertiary" @click="maximizedModal = false" label="Close" />
      </div>
    </q-modal>
  </q-page-container>
</template>

<script>
import { 
  Consts,
  CalcUtils,
  SheetUtils,
  Converter
} from "utils";

import { EventBus } from "store/ass-store";
import { CharacterDetails } from "components";

export default {
  name: 'LandingPage',
  components: {
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  watch: {
  },
  created: function () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>


