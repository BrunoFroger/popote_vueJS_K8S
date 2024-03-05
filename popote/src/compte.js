export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          login : null,
          modePageCompte:"connexion",
          login: 'non connecté',
          password:null,
          repetPassword:null,
          adresseMail:null,
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Gestion de votre compte</h1>\
          <p>Nous somme le {{currentDateTime}}</p>\
          <p>Cette page permet de gérer votre compte : \
            <button @click="changeMode(\'creeCompte\')">création de compte</button> / \
            <button @click="changeMode(\'suppCompte\')">suppression de compte</button> / \
            <button @click="changeMode(\'connexion\')">connexion</button> / \
            <button @click="changeMode(\'deconnexion\')">déconnexion</button> / \
            <button @click="changeMode(\'infosPerso\')">infos personnelles</button>\
          </p>\
          <div v-if="modePageCompte === \'creeCompte\'">\
            <h2> Création de votre compte </h2>\
            <table>\
              <tr>\
                <td>Saisissez un nom d\'utilisateur</td>\
                <td> <input name="newLogin"> </td>\
              </tr>\
              <tr>\
                <td>choisissez votre mot de passe</td>\
                <td> <input name="newPassword" type=\"password\"> </td>\
              </tr>\
              <tr>\
                <td>repetez votre mot de passe</td>\
                <td> <input name="repetPassword" type=\"password\"> </td>\
              </tr>\
              <tr>\
                <td>adresse mail</td>\
                <td> <input name="newMailAdress"> </td>\
              </tr>\
            </table>\
            <button>Valider</button>\
          </div>\
          <div v-else-if="modePageCompte === \'suppCompte\'">\
            <h2> Suppression de votre compte </h2>\
            <p>Souhaitez vous vraiment supprimer votre compte ?</p>\
            <button @click="suppCompte()">Supprimer le compte</button>\
          </div>\
          <div v-else-if="modePageCompte === \'connexion\'">\
            <h2> Connexion a votre compte </h2>\
          </div>\
          <div v-else-if="modePageCompte === \'deconnexion\'">\
            <h2> deconnexion a votre compte </h2>\
            <p>Souhaitez vous vraiment vous deconnecter ?</p>\
            <button @click="suppCompte()">deconnexion du compte</button>\
          </div>\
          <div v-else-if="modePageCompte === \'infosPerso\'">\
            <h2> Informations personnelles de votre compte </h2>\
            <table>\
              <tr>\
                <td>Login</td>\
                <td>{{login}}</td>\
              </tr>\
              <tr>\
                <td>adresse mail</td>\
                <td>{{adresseMail}}</td>\
              </tr>\
            </table>\
          </div>\
        </div>\
      ',
      methods: {
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
        changeMode(mode){
          console.log("changement de mode : " + mode);
          this.modePageCompte = mode;
        },
        suppCompte(){
          console.log("suppression du compte");
          this.login = 'non connecté';
          this.adresseMail = null;
        },
        deconnecte(){
          console.log("deconexion du compte");
          this.login = 'non connecté';
          this.adresseMail = null;
        },
        connecte(){
          console.log("conexion au compte");
          this.login = newLogin;
          this.adresseMail = newMailAddress;
        }
      }
}