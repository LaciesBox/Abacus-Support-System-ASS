<template>
  <image-container :name="$route.params.egg_id" />
</template>

<style>
</style>

<script>
import ImageContainer from "../ImageContainer.vue";

export default {
  name: 'EasterEgg',
  components: {
    ImageContainer
  }
}
</script>
