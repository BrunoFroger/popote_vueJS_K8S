import Recettes from './recettes.js'
import Compte from './compte.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          nbRecettes:null,
          nbUsers:null,
          modeAffichageAdmin:'',
          serverNodeAdress:null,
          editUser:{},
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <span v-if="modeAffichageAdmin == \'gereUsers\'">\
            <adminGereUsers/>\
          </span>\
          <span v-else-if="modeAffichageAdmin == \'gereRecettes\'">\
            <adminGereRecettes/>\
          </span>\
          <span v-else-if="modeAffichageAdmin == \'adminRequeteSql\'">\
            <adminRequeteSql/>\
          </span>\
          <span v-else-if="modeAffichageAdmin == \'formulaireMail\'">\
            <formulaireMail/>\
          </span>\
          <span v-else-if="modeAffichageAdmin == \'editionUser\'">\
            <adminEditUser/>\
          </span>\
          <span v-else> \
          <h1>Administration du site</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
          <button @click = "changeModeAffichage(\'adminRequeteSql\')">Requete SQL</button> \
          <button @click = "changeModeAffichage(\'adminFormulaireMail\')">Envoi d\'un mail</button> \
          <table> \
            <thead> \
                <th>Variable</th> \
                <th>Valeur</th> \
                <th></th> \
            </thead> \
            <tbody> \
                <tr> \
                    <td>nombre de users</td> \
                    <td>{{nbUsers}}</td> \
                    <td><button @click = "changeModeAffichage(\'gereUsers\')">Gestion des Users</button></td> \
                </tr> \
                <tr> \
                    <td>nombre de recettes</td> \
                    <td>{{nbRecettes}}</td> \
                    <td><button @click = "changeModeAffichage(\'gereRecettes\')">Gestion des recettes</button></td> \
                </tr> \
            </tbody> \
          </table> \
          </span> \
        </div> \
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
          this.serverNodeAdress = this.$parent.serverNodeAdress;
        },
        //---------------------------------
        //
        //  updateDatas
        //
        //---------------------------------
        updateDatas() {
          console.log("admin.js => updateDatas")
          this.nbRecettes = Recettes.methods.getNombreRecettes();
          this.nbUsers = Compte.methods.getNombreUsers();
        },
        //---------------------------------
        //
        //  changeModeAffichage
        //
        //---------------------------------
        changeModeAffichage(mode) {
          console.log("admin.js => changeModeAffichage : " + mode)
          this.modeAffichageAdmin = mode
        },
      }
}

