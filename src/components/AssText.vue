<template>
  <div class="q-pt-xs">
    <span v-if="link">
      {{finalLabel}} <a href="#" @click="click"> {{link || "-"}} </a>
    </span>
    <span v-else>
      {{finalLabel}} {{content || "-"}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "AssText",
    
    props: {
      label: {
        type: [String, Number],
        default: ""
      },
      content: {
        type: [String, Number],
        default: "-"
      },
      link: {
        type: [String, Number],
        default: ""
      }
    },

    computed: {
      finalLabel() {
        return this.label ? this.label + ":" : "";
      }
    },
     
    methods: {
      click() {
        this.$emit("click");
      }
    }
  }
</script>