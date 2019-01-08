<template>
  <div class="q-mt-sm">
    <strong>{{content}}</strong>
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