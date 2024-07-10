import Recettes from './recettes.js'
import Compte from './compte.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          nbRecettes:null,
          nbUsers:null,
          modeAffichage:'',
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration du site</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
          <span v-if="modeAffichage == \'gereUsers\'">\
            <adminGereUsers/>\
          </span>\
          <span v-else-if="modeAffichage == \'gererecettes\'">\
            <adminGereRecettess/>\
          </span>\
          <span v-else> \
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
                    <td @onClick = "changeModeAffichage(\'gereUsers\')">Gestion des Users</td> \
                </tr> \
                <tr> \
                    <td>nombre de recettes</td> \
                    <td>{{nbRecettes}}</td> \
                    <td@onClick = "changeModeAffichage(\'gereRecettes\')">Gestion des recettes</td> \
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
          this.modeAffichage = mode
        },
      }
}

