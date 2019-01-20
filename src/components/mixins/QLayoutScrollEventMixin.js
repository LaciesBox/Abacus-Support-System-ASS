export default {
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
  }
}