<template>
  <div class="q-pt-xs">{{finalLabel}} {{content || "-"}}</div>
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
      }
    },

    computed: {
      finalLabel() {
        return this.label ? this.label + ":" : "";
      }
    }
  }
</script>