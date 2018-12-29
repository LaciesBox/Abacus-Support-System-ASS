<template>
  <q-page>
    {{charaEntries}}
    <!-- Start of chara details UI -->
		<div class="text-center width-30 float-left generic-side-margin">
			<q-card color="primary">
				<q-card-media>
					<img src="https://i.imgur.com/Ca6SOTc.png">
					<q-card-title slot="overlay">Eien Sozai</q-card-title>
				</q-card-media>
			</q-card>
		</div>
    <div class="row generic-top-margin generic-side-margin">
      <div class="col">
        <q-card inline color="primary" class="physical-props-title">
          <q-card-title>Physical Properties</q-card-title>
        </q-card>
      </div>
    </div>
    <div class="row inline generic-top-margin">
      <div class="col">
        <q-card inline color="primary" class="physical-props-title">
          <q-card-title>Physical Properties</q-card-title>
        </q-card>
      </div>
    </div>
    <!-- End of chara details UI -->
    <!--Start of character search UI-->
    <div class="row">
      <q-search
        float-label="Character Select"
        placeholder="Character Name"
        icon="face"
        clearable
        inverted
        v-model="character"
        color="secondary"
        @input="input => showCharaList(input)"
      />
      <q-list highlight link v-if="charaNamesFiltered">
        <q-item v-for="(charaName, index) in charaNamesFiltered" v-bind:key="index">
          <q-item-main :label="charaName"/>
        </q-item>
      </q-list>
    </div>
    <!--End of character search UI-->
  </q-page>
</template>

<script>
import {Consts} from "utils";

export default {
  name: "CharacterDetails",
  
  created() {
    console.log(this.charaEntries);
  },

  data() {
    return {
      charaNamesFiltered: null,
      character: null
    };
  },

  props: {
    charaEntries: Array
  },

  methods: {
    showCharaList: function(input) {
      if (!input) {
        this.charaNamesFiltered = null;
      } else {
        let names = [];
        this.charaEntries.forEach(function(chara) {
          let charaName = chara.gsx$name.$t;
          if (charaName.toUpperCase().includes(input.toUpperCase())) {
            names.push(charaName);
          }
        });
        if (names.length === 0) {
          names.push("No character found.");
        }
        this.charaNamesFiltered = names;
      }
    }
  }
};
</script>

<style scoped>
.q-search {
  position: relative;
  width: 15em;
  margin-left: 1em;
  margin-top: 1em;
}
.q-list {
  width: 15em;
  margin-left: 1em;
}
.q-card-media {
  width: 100%;
}
.physical-props-title {
  width: 100%;
}
</style>

<style>
.generic-side-margin {
  margin-left: 1em;
  margin-right: 1em;
}
.generic-top-margin {
  margin-top: 1em;
}
.width-30 {
  width: 30%;
}

.width-60 {
	width: 60%;
}
</style>
