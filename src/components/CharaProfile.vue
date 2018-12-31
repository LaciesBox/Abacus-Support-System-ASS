<template>
  <q-page class="q-pa-sm col-xs-12 col-sm-6">
    <div class="row">
      <div class="col-12">
      <ass-text link="X" @click="doClose"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import AssText from "./AssText.vue";
import { EventBus } from "store/ass-store";

export default {
  name: "CharaProfile",
  components: {
    AssText
  },
  methods:{
    doClose: function(){
      EventBus.$emit('closeProfile');
    }
  }
}
</script>