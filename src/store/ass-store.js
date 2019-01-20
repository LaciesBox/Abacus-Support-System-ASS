import Vue from 'vue';

export const EventBus = new Vue({
  data:{
    characters: "characters",
    scrollPercentage:0
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed:{
    maxScrollHeight(){
      return Math.max(document.body.scrollHeight, document.body.offsetHeight, 
                   document.documentElement.clientHeight, document.documentElement.scrollHeight, 
                   document.documentElement.offsetHeight);
    },
    scrollHeight(){
      return this.maxScrollHeight - window.innerHeight;
    }
  },
  methods: {
    handleScroll (event) {
      this.scrollPercentage = window.pageYOffset / this.scrollHeight;
    },
    setCharacters: function(chars){
      this.characters = Object.assign({}, chars);
    }
  }
});