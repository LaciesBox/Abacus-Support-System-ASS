<template>
  <image-container :name="$route.params.egg_id" />
</template>

<style>
</style>

<script>
import { ImageContainer } from "components";

export default {
  name: 'EasterEgg',
  components: {
    ImageContainer
  }
}
</script>
