<template>
  <q-modal maximized v-model="showModal" content-classes="bg-secondary">
    <!-- <section class="splash">
      <div class="content animated fadeIn">
        <h1><span>Vue</span>Medium<span>Editor</span></h1>
        <div id="toolbar-placeholder" class="toolbar-placeholder" style="height: 74.4px;">
        </div>
        <medium-editor :text='text' :options='options' v-on:edit='processEditOperation' custom-tag='div'>
        </medium-editor>
        <code class='data'>
          {{text}}
        </code>
      </div>
    </section> -->
    <q-btn color="orange" @click="showModal = false" label="Close" />
  </q-modal>
</template>

<script>
import MediumEditor from 'vue2-medium-editor'

import 'medium-editor/dist/css/medium-editor.min.css'

export default {
  name: "NotesModal",
  data(){
    return {
      showModal: this.show,
    }
  },
  components: {
    MediumEditor
  },
  methods: {
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
</style>
