<template>
  <q-page-container>
      <character-details :chara-entries="dataEntries"/>
      <!-- <img alt="Bisamonten Logo" src="../../assets/bisha-logo.png"> -->
  </q-page-container>
</template>

<script>
import CharacterDetails from '../CharacterDetails.vue'
export default {
  name: 'Calculator',
  components: {
    CharacterDetails
  },
  data () {
    return {
      dataEntries:null
    }
  },
  watch: {
      currentPage: 'fetchData'
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      var sheetUrl = 'https://spreadsheets.google.com/feeds/list/1ajKZbQWjKsu5eFAZ1vTRh-jamurXSub0z7NsX3ur4t8/1/public/values?alt=json'
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', sheetUrl )
      xhr.onload = function () {        
        self.dataEntries = JSON.parse(xhr.responseText)
        self.dataEntries = self.dataEntries.feed.entry
      }
      xhr.send()
    }
  }
}
</script>

<style>
</style>

