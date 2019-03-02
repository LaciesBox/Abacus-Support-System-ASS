<template>
  <q-modal v-model="show" position="right" 
  content-classes="bg-primary text-secondary full-height lato-l"
  @hide="closeWorkArea">
  {{charaChips}}
    <q-list separator no-border :class="{'desktop-width': isDesktop}" dark>
      <!-- NOTES COLLAPSIBLE -->
      <q-collapsible highlight opened
      label="Notes" header-class="text-center lato-bi" >
        <q-field class="text-primary q-px-lg q-pb-lg" dark>
          <q-input inverted-light placeholder="Dear Love,"
          v-model="notes" color="grey-3" type="textarea" />
        </q-field>
      </q-collapsible>
      <!-- STATUS FORMATTER COLLAPSIBLE -->
      <q-collapsible highlight
      label="Status Formatter" header-class="text-center lato-bi">
      <div class="row q-px-sm q-pb-sm lato-r">
        <div class="col-3">
          Character Name
        </div>
        <div class="col-9">
          Status Conditions
        </div>
      </div>
      <div v-if="charas.length <= 0" class="q-pl-lg q-pb-md lato-r q-headline text-red-10">
        You haven't any characters!
      </div>
      <div v-for="(chara, index) in charas" :key="index">
        <div class="row q-pb-sm unselectable">
          <div class="col-3">
            <q-chip square class="full-width">
              {{chara}}
            </q-chip>
          </div>
          <div class="col-9 q-pl-sm">
            <q-chips-input inverted-light dark placeholder="I'd love to have your STDs, baby."
            color="secondary" v-model="charaChips[index]" add-icon="add"/>
          </div>
        </div>
      </div>
      <q-btn color="red-9" label="Format!" @click="formatStatusEffects" />
      <div class="lato-r q-pa-sm"> Formatted Message</div>
      <q-field class="text-primary" dark>
        <q-input inverted-light clearable readonly
        v-model="formattedMessage" color="secondary" type="textarea" />
      </q-field>
      </q-collapsible>
      <!-- ROLL HISTORY COLLAPSIBLE -->
      <q-collapsible highlight
      label="Logs" header-class="text-center lato-bi" >
      <q-scroll-area style="height: 100px;">
        <div class="row">
          <div class="col-12" style="white-space: pre-wrap">
            <p v-html="rollHistory"></p>
          </div>
        </div>
      </q-scroll-area>        
      </q-collapsible>
    </q-list>
  </q-modal>
</template>

<script>
import { EventBus } from "store/ass-store";

export default {
  name: "WorkArea",
  data(){
    return {
      rollHistory: EventBus.getRollHistory(),
      notes: EventBus.getNotes(),
      isDesktop: this.$q.platform.is.desktop,
      charaChips: [[]],
      formattedMessage: "",
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    charas: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatStatusEffects: function() {
      let formattedMessage = "";
      let mortalityNumber = "";
      for(let i = 0; i < this.charas.length; i++) {
        mortalityNumber = EventBus.getStoredStat(this.charas[i], "mortalityNumber", "mortalityNumber") || 0;
        mortalityNumber *= 5;

        formattedMessage += this.charas[i] + ": "+ mortalityNumber +"%; ";

        this.charaChips[i].forEach(statusEffect => {
          formattedMessage += " [" + statusEffect.toUpperCase() + "]";
        });

        if(i + 1 < this.charas.length) { formattedMessage +=  "\n"; }
      }
      
      this.formattedMessage = formattedMessage;
    },
    closeWorkArea: function() {
      this.formattedMessage = "";
      EventBus.$emit('closeWorkArea');
    }
  },
  mounted(){
    EventBus.$on("modify-local-storage-rollHistory", localStorage => this.rollHistory = localStorage.rollHistory);
    EventBus.$on("modify-local-storage-notes", localStorage => this.notes = localStorage.notes);
  },
  watch: {
    charas: function(characters) {
      this.charaChips = [];
      for(let i = 0; i < characters.length; i++) {
        this.charaChips.push([]);
      }
    }, 
    notes: function(newNotes) {
      EventBus.saveNotes(newNotes)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .desktop-width
    width 55vw
</style>
