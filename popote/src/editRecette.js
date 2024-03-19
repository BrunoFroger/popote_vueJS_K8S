
export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
      };
    },
    mounted() {
      this.updateDateTime();
    },
    template: '\
      <div>\
        <h1>Edition d\'une recette</h1>\
        <p>Nous somme le {{currentDateTime}}</p>\
        <p>Cette page permet d\'editer une de vos recette ....</p>\
      </div>\
    ',
    methods: {
      //---------------------------------
      //
      //  updateDateTime
      //
      //---------------------------------
      updateDateTime() {
        const now = new Date();
        this.currentDateTime = now.toLocaleString();
      },
    }
}
