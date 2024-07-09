//const CryptoJS = require("crypto-js")

var userConnected=false;
var globalUser=null;
var globalAdminUser=false;
var globalNbUsers=0;

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          login : null,
          login: 'non connecté',
          passPhrase: 'sldjreioenos,soa',
          typeUser:'',
          password:'',
          repetPassword:'',
          newLogin:'', 
          newPassword:'',
          passwordCrypte:'',
          repetPassword:'', 
          newMailAddress:'',
          modePageCompte: "connexion",
          adresseMail:'',
          user:globalUser,
          connected:userConnected,
          message:"",
          //adminUser: false,
        };
      },
      mounted() {
        this.updateDateTime();
        this.getNbUsers();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Gestion de votre compte</h1>\
          <p><span v-if="connected">Bonjour {{user.nom}}.</span> Nous somme le {{currentDateTime}}</p>\
          <p><span v-if="globalAdminUser">Vous etes Administrateur de ce site</span></p>\
          <p>Cette page permet de gérer votre compte : \
            <button @click="changeMode(\'creeCompte\')">création de compte</button> / \
            <span v-if="connected"> <button @click="changeMode(\'suppCompte\')">suppression de compte</button> / </span>\
            <button @click="changeMode(\'connexion\')">connexion</button>\
            <span v-if="connected"> / \
              <button @click="changeMode(\'deconnexion\')"> déconnexion</button> / \
              <button @click="changeMode(\'infosPerso\')">infos personnelles</button>\
            </span>\
          </p>\
          <div v-if="modePageCompte === \'creeCompte\'">\
            <h2> Création de votre compte </h2>\
            <table>\
              <tr>\
                <td>Saisissez un nom d\'utilisateur</td>\
                <td> <input v-model="newLogin"> </td>\
              </tr>\
              <tr>\
                <td>choisissez votre mot de passe</td>\
                <td> <input v-model="newPassword" type=\"password\"> </td>\
              </tr>\
              <tr>\
                <td>repetez votre mot de passe</td>\
                <td> <input v-model="repetPassword" type=\"password\"> </td>\
              </tr>\
              <tr>\
                <td>adresse mail</td>\
                <td> <input v-model="newMailAddress"> </td>\
              </tr>\
            </table>\
            <button @click="creeCompte()">Valider</button>\
          </div>\
          <div v-else-if="modePageCompte === \'suppCompte\'">\
            <h2> Suppression de votre compte </h2>\
            <p>Souhaitez vous vraiment supprimer votre compte ?</p>\
            <table>\
              <tr>\
                <td>Mot de passe</td>\
                <td> <input v-model="newPassword" type=\"password\"> </td>\
              </tr>\
            </table>\
            <button @click="suppCompte()">Supprimer le compte</button>\
          </div>\
          <div v-else-if="modePageCompte === \'deconnexion\'">\
            <h2> deconnexion a votre compte </h2>\
            <p>Souhaitez vous vraiment vous deconnecter ?</p>\
            <button @click="deconnecte()">deconnexion du compte</button>\
          </div>\
          <div v-else-if="modePageCompte === \'infosPerso\'">\
            <h2> Informations personnelles de votre compte </h2>\
            <table>\
              <tr>\
                <td>Identifiant</td>\
                <td>{{user.nom}}</td>\
              </tr>\
              <tr>\
                <td>adresse mail</td>\
                <td>{{user.email}}</td>\
              </tr>\
            </table>\
          </div>\
          <div v-else-if="modePageCompte === \'connexion\'">\
            <h2> Connexion a votre compte </h2>\
            <table>\
              <tr>\
                <td>Nom d\'utilisateur</td>\
                <td> <input v-model="newLogin"> </td>\
              </tr>\
              <tr>\
                <td>Mot de passe</td>\
                <td> <input v-model="newPassword" type=\"password\"> </td>\
              </tr>\
            </table>\
            <button @click="connecte()">Valider</button>\
            <div>\
              {{message}}\
            </div>\
          </div>\
        </div>\
      ',
      methods: {
        //---------------------------------
        //
        //  UpdateTime
        //
        //---------------------------------
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
        //---------------------------------
        //
        //  changeMode
        //
        //---------------------------------
        changeMode(mode){
          console.log("changement de mode : " + mode);
          this.modePageCompte = mode;
        },
        //---------------------------------
        //
        //  creeCompte
        //
        //---------------------------------
        creeCompte(login, pwd, mail){
          console.log("création d'un compte");
          this.requeteUser("creation", this.newLogin, this.newPassword, this.repetPassword, this.newMailAddress);
        },
        //---------------------------------
        //
        //  suppCompte
        //
        //---------------------------------
        suppCompte(){
          console.log("suppression du compte " + this.user);
          this.requeteUser("suppCompte", null , this.newPassword, '', '');
        },
        //---------------------------------
        //
        //  deconnecte
        //
        //---------------------------------
        deconnecte(){
          console.log("deconexion du compte " + this.user);
          globalUser=null;
          this.user=null;
          userConnected=false;
          this.connected=false;
        },
        //---------------------------------
        //
        //  connecte
        //
        //---------------------------------
        connecte(){
          console.log("conexion au compte " + this.newLogin);
          this.requeteUser("connexion", this.newLogin, this.newPassword, '', '');
        },
        //---------------------------------
        //
        //  encrypt
        //
        //---------------------------------
        encrypt (src) {
          const passphrase = this.passPhrase
          //return CryptoJS.AES.encrypt(src, passphrase).toString()
          return src
        },
        //---------------------------------
        //
        //  decrypt
        //
        //---------------------------------
        decrypt (src) {
          const passphrase = this.passPhrase
          const bytes = CryptoJS.AES.decrypt(src, passphrase)
          const originalText = bytes.toString(CryptoJS.enc.Utf8)
          //return originalText
          return src
        },
        //---------------------------------
        //
        //  requeteUser
        //
        //---------------------------------
        requeteUser(typeRequete, login, pwd, pwdVerif, email) {
          //console.log('envoi requete ' + typeRequete);
          //console.log('user='+login+', pwd='+pwd+', verif='+pwdVerif+', email='+email)
          const stuff ={
            "type":typeRequete,
            "user": login,
            "pwd": (this.encrypt(pwd)),
            "pwdVerif": (this.encrypt(pwdVerif)),
            "email": email,
          };
          const requestOptions = {
            method: "POST",
            //headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stuff)
          };
          //console.log(stuff);
          //console.log(requestOptions.body);
          let adresse = this.$parent.serverNodeAdress + '/requeteUser'
          console.log("recette.js => : requeteUser => " + adresse)
          fetch(adresse, requestOptions).then(r => r.json()).then(response => {
            //console.log("compte.js => recuperation status commande update user ");
            let status = response.status
            console.log('compte.js => status = ' + status)
            if (status == 'OK'){
              this.message = response.message
              console.log('compte.js => message = ' + this.message)
              globalUser = response.user
              this.typeUser=globalUser.idRole
              this.user=globalUser
              console.log('compte.js => globalUser = ' + JSON.stringify(globalUser))
              console.log('compte.js => idRole = ' + this.typeUser)
              userConnected = true
              this.connected = true
              console.log ("compte.js => Utilisateur " + this.user.nom + " connecté")
              if (this.typeUser == 0){
                console.log("administarteur connecté ")
                globalAdminUser=true
              } else {
                console.log("utilisateur connecté")
                globalAdminUser=false
              }
            } else {
              console.log("echec de la connexion de " + login)
            }
            this.message = response.message
          })
          .catch(error => {
            console.error(error);
          });
        },
        //---------------------------------
        //
        //  isConnected
        //
        //---------------------------------
        isConnected(){
          // if (globalUser){
          //   console.log(" compte.js => isConnected : " + userConnected + ', username = ' + globalUser.nom)
          // }
          return globalUser;
        },
        //---------------------------------
        //
        //  isAdminUser
        //
        //---------------------------------
        isAdminUser(){
          // if (globalUser){
          //console.log(" compte.js => isAdminUser : est ce que l'utilisateur est adminUser : " + globalAdminUser )
          return globalAdminUser;
        },
        //---------------------------------
        //
        //  getUserName
        //
        //---------------------------------
        getUserName(){
          if (globalUser != null){
            console.log(" compte.js => getUserName : " + globalUser.nom)
            return globalUser.nom;
          } else {
            console.log(" compte.js => getUserName : null" )
            return null
          }
        },
        //---------------------------------
        //
        //  getNbUsers
        //
        //---------------------------------
        getNbUsers(){
          let adresse = this.$parent.serverNodeAdress + '/getNbUsers'
          console.log("recette.js => : getNbUsers => " + adresse)
          fetch(adresse, requestOptions).then(r => r.json()).then(response => {
            globalNbUsers = response.nbUsers;
          });
          return globalNbUsers;
        },
      }
}

