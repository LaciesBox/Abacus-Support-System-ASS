<template>
  <div class="row bg-white">
    <div class="col-12" style="white-space: pre-wrap">
      <p v-html="rollHistory"></p>
    </div>
  </div>
</template>

<script>
import { EventBus } from "store/ass-store";

export default {
  name: "WorkArea",
  data(){
    return {
      rollHistory: EventBus.getRollHistory(),
      notes: ""
    }
  },
  mounted(){
    EventBus.$on("modify-local-storage-rollHistory", localStorage => this.rollHistory = localStorage.rollHistory);
    EventBus.$on("modify-local-storage-notes", localStorage => this.notes = localStorage.notes);
  }
}
</script>