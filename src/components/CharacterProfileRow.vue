<template>
  <q-item class="q-pa-xs">
    <q-item-side v-if="label">
      {{label}}
    </q-item-side>
    <q-item-main>
      <div v-if="contentIsList">
        <div v-for="(content, index) in centerContent" v-bind:key="index">
          <q-list inset-separator>
          <q-item multiline dense>
            <q-item-side inverted :icon="icon" color="primary"/>
            <q-item-main
              v-if="descriptionIsList && (index <= contentDescription.length - 1)"
              :label="content"
              label-lines="1"
              :sublabel="contentDescription[index]"
              sublabel-lines="10"
            />
            <q-item-main
              v-else
              :label="content"
              label-lines="1"
            />
            <q-item-side v-if="contentLevel && (index <= contentLevel.length -1)" inverted :letter="contentLevel[index]"/>
          </q-item>
          </q-list>
        </div>
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
    },
    contentDescription: {
      type: [String, Array],
    },
    contentLevel: {
      type: [String, Array],
    },
    icon: {
      type: [String],
    },
  },
  computed: {
    contentIsList(){
      return Array.isArray(this.centerContent);
    },
    descriptionIsList() {
      return Array.isArray(this.contentDescription);
    }
  }
}
</script>