<template>
  <div class="subheader q-py-sm q-pl-sm">
    {{content}}
  </div>
</template>

<script>

export default {
  name: "SectionSubheader",

  props: {
    content:{
      type: [String, Number],
      default: "Please provide subheader content"
    }
  }
}
</script>

<style>
.subheader {
    font-style: italic;
    text-decoration: underline;
}
</style>
