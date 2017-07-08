new Vue({
  el: '#app',
  data: {
    kanbanTitle: ''
  },
  methods: {
    redirectToKanban(){
      alert('funfou');
    }
  },
  mounted(){
    console.log(this.kanbanTitle);
  }
});
