<template>
  <q-page-container>
    <q-page class="flex flex-center">
      <img :alt="alt || name" :src="src || imgSrc">
    </q-page>
  </q-page-container>
</template>


<script>
import ImageUtils from "utils/ImageUtils.js";

export default {
  name: "ImageContainer",
  computed: {
    imgSrc() {
      return ImageUtils.getImgUrl(this.$route.params.egg_id);
    }
  },
  props: {
    alt: {
      type: String,
      required: false
    },
    src: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    }
  }
};
</script>