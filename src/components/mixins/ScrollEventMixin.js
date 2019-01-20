export default {
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data(){
    return {
      scrollPercentage:0
    }
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
    }
  }
}