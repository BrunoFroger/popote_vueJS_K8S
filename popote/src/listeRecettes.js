import Recettes from './recettes.js'
import Compte from './compte.js'

export default {
  props: [], 
    data: function () {
      return {
        //auteur : null,
        //titre : null,
        //typeRecette:null,
        //description : null,
        //realisation : null,
        //ingredients : null,
        //ingredient : "{[null]}",
        //index : 0,
        nbRecettes : 0,
        nbRecettesParPage:10,
        idxDebutListeRecettes:0,
        //listeRecettes:[],
        //recette:"{[null]}",
        recettesPrivees:false,
        //userName:null,
        userConnected:false,
        typeRecetteSelected:'Tout',
      };
    },
    mounted() {
      this.$parent.loadListeRecettes();
      this.updateConnected();
    },
    template: '\
    <h1>Liste des recettes</h1>\
    <p>Parcourez la liste des recettes disponibles et selectionnez celle que vous voulez préparer</p>\
    <span v-if="userConnected" >\
      <input @change="loadListeRecettes" type="checkbox" v-model="recettesPrivees"> Mes recettes (visualisation de vos créations)\
    </span>\
    \
      <p>\
        Liste des recettes : type de recette \
        <select @change="$parent.changeTypeSelect($event)" name= "typeRecetteSelected" id="typeRecetteSelected">\
          <option value="tout">Tout</option>\
          <option value="Entree">Entrée</option>\
          <option value="Plat">Plat</option>\
          <option value="Dessert">Dessert</option>\
        </select>\
      </p>\
      <div>\
        <table>\
          <tr>\
            <th>titre</th>\
            <th>type</th>\
            <th>description</th>\
          </tr>\
          <tr v-for="(item, index) in $parent.listeRecettes">\
            <td @click="loadRecette(item.index)">{{item.titre}}</td>\
            <td>{{item.type}}</td>\
            <td>{{item.description}}</td>\
          </tr>\
        </table>\
        <button @click="pagePrecedente">recettes précédentes</button>\
        <button @click="pageSuivante">recettes suivantes</button>\
      </div>\
    ',
    methods: {
      //---------------------------------
      //
      //  pageSuivante
      //
      //---------------------------------
      pageSuivante() {
        this.idxDebutListeRecettes+=this.nbRecettesParPage;
        if (this.idxDebutListeRecettes >= this.nbRecettes) this.idxDebutListeRecettes -= this.nbRecettesParPage;
        this.loadListeRecettes();
      },
      //---------------------------------
      //
      //  pagePrecedente
      //
      //---------------------------------
      pagePrecedente() {
        this.idxDebutListeRecettes-=this.nbRecettesParPage;
        if (this.idxDebutListeRecettes <= 0) this.idxDebutListeRecettes = 0;
        this.loadListeRecettes();
      },
      //---------------------------------
      //
      //  changeTypeSelect
      //
      //---------------------------------
      changeTypeSelect(event) {
        console.log("recettes.js (changeTypeSelect) => TODO")
        this.typeRecetteSelected = event.target.value
        console.log("type selectionné : " + this.typeRecetteSelected)
        this.loadListeRecettes();
      },
      //---------------------------------
      //
      //  updateConnected
      //
      //---------------------------------
      updateConnected() {
        //console.log("recettes.js (updateConnected) => test si a user is connected .... ")
        var connectedUser = Compte.methods.isConnected()
        if (connectedUser != null){
          this.userName = connectedUser.nom;
          this.userConnected = true;
          //this.recettesPrivees = priveSelected;
        //   console.log('recettes.js (updateConnected) => userConnected = ' + this.userName)
        // } else {
        //   console.log('recettes.js (updateConnected) => pas de user connecte ')
        }
      },
      //---------------------------------
      //
      //  loadRecette
      //
      //---------------------------------
      loadRecette(index) {
        console.log('listeRecette.js : listeRecette.js => loadRecette')
        this.$parent.loadRecette(index)
      },
      //---------------------------------
      //
      //  loadListeRecette
      //
      //---------------------------------
      loadListeRecette() {
        console.log('listeRecette.js : loadListeRecette.js => loadListeRecette')
        this.$parent.recettesPrivees = this.recettesPrivees
        this.$parent.auteur = this.auteur
        this.$parent.loadListeRecette(index)
      },
    }
}
