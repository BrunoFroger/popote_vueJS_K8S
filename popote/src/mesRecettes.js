export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          login : null,
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Mes recettes</h1>\
          <p>Nous somme le {{currentDateTime}}</p>\
          <p>Dans cette page, vous pouvez gérer vos recettes :</p>\
          <ul>\
          <li>liste de vos recettes</li>\
          <li>création d\'une nouvelle recette </li>\
          <li>modification d\'une recette </li>\
          <li>suppression d\'une recette </li>\
          </ul>\
        </div>\
      ',
      methods: {
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
      }
}