<template>
  <q-item class="q-pa-xs">
    <q-item-side v-if="label">
      {{label}}
    </q-item-side>
    <q-item-main>
      <div v-if="contentIsList">
         <ul>
           <li v-for="content in centerContent" v-bind:key="content">{{content}}</li>
        </ul> 
      </div>
      <div v-else>
        {{centerContent}}
      </div>
    </q-item-main>
    <q-item-side class="text-black">
      {{content}}
    </q-item-side>
  </q-item>
</template>

<script>

export default {
  name: "CharacterProfileRow",
  props: {
    label: String,
    content: String,
    centerContent: {
      type:[String, Array],
    }
  },
  computed: {
    contentIsList: function(){
      return Array.isArray(this.centerContent);
    }
  }
}
</script>