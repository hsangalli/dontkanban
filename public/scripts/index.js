new Vue({
  el: '#app',
  data: {
    kanbanTitle: ''
  },
  methods: {
    redirectToKanban(){
      const URL = window.location.href;
      if (this.kanbanTitle != '') {
        if (URL.endsWith('/')) {
          window.location.replace(URL.concat(this.kanbanTitle));
        } else {
          window.location.replace(URL.concat('/').concat(this.kanbanTitle));
        }
      }
    }
  }
});
