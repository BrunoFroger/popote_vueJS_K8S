export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Popote (vos meilleures recettes)</h1>\
          <p>Nous somme le {{currentDateTime}}</p>\
          <p>Ce site permet de consulter des recettes de cuisine et enregistrer vos propres recettes</p>\
          <p>Le bandeau en haut de cette page permet d\'acceder aux différetes pages de ce site : </p>\
          <ul>\
          <li>Acceuil : cette page (présentation du site)</li>\
          <li>Recettes : accès a l\'ensemble des recettes disponibles</li>\
          <li>Mon compte : gestion de votre conpte (connexion / deconnexion / données personnelles</li>\
          </ul>\
          <p><font color="red">Site experimental en cours de construction (support de formation) aucune données n\'est valide ni conservée</font></p>\
        </div>\
      ',
      methods: {
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
      }
}