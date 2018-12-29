<template>
    <q-page>
        <div class="chara-component">
        </div>
        <!--Start of character search UI-->
        <q-search
        float-label="Character Select"
        placeholder="Character Name"
        icon="face"
        clearable
        inverted
        color="secondary"
        @input="input => showCharaList(input)" 
        />
        <q-list highlight link v-if="charaNamesFiltered">
        <q-item v-for="(charaName, index) in charaNamesFiltered" v-bind:key="index">
            <q-item-main :label="charaName" />
        </q-item>
        </q-list>
        <!--End of character search UI-->
    </q-page>
</template>

<script>
export default {
    name: 'CharacterSearch',
    data: function (){
        return {
            charaNamesFiltered: null,
            character: null
        }
    },
    props: {
        charaEntries: Array
    },
    methods: {
        showCharaList: function (input) {
            if(!input) {
                this.charaNamesFiltered = null;
            }
            else {
                let names = [];
                this.charaEntries.forEach(function(chara) {
                    let charaName = chara.gsx$name.$t;
                    if(charaName.toUpperCase().includes(input.toUpperCase())) {
                        names.push(charaName);
                    }
                });
                if(names.length === 0) {
                    names.push("No character found.");
                }
                this.charaNamesFiltered = names;
            }  
        }
    }
}
</script>

<style>
.q-search {
    position:relative;
    width: 15em;
    margin-left: 1em;
    margin-top: 0.5em;
}
.q-list {
    width: 15em;
    margin-left: 1em;
}
</style>
