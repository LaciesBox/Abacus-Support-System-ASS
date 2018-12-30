<template>
  <div class="q-pt-sm">
    {{content}}
    <hr width="100%">
  </div>
</template>

<script>

export default {
  name: "SectionHeader",

  props: {
    content:{
      type: [String, Number],
      default: "Please provide header content"
    }
  }
}
</script>