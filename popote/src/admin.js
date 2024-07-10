import Recettes from './recettes.js'
import Compte from './compte.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          nbRecettes:null,
          nbUsers:null,
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
                    <td>AdminGereUsers</td> \
                </tr> \
                <tr> \
                    <td>nombre de recettes</td> \
                    <td>{{nbRecettes}}</td> \
                    <td>AdminGereRecettes</td> \
                </tr> \
            </tbody> \
          </table> \
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
      }
}

