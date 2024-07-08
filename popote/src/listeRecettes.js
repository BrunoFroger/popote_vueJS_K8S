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
        typeRecetteSelected:null,
      };
    },
    mounted() {
      this.$parent.getTypesRecettes();
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
        Type de recette affichées : \
        <select @change="$parent.changeTypeSelect($event)" name="typeRecetteSelected">\
        <!--select @change="$parent.changeTypeSelect($event)" name= "typeRecetteSelected" id="typeRecetteSelected">\
          <option value="Tout">Tout</option>\
          <option value="Entree">Entrée</option>\
          <option value="Plat">Plat</option>\
          <option value="Dessert">Dessert</option!-->\
          <option v-for="typeRec in $parent.typesRecettes" :value="typeRec.nom">{{typeRec.nom}}</option>\
        </select>\
      </p>\
      <div>\
        <table>\
          <tr>\
            <th>id</th>\
            <th>titre</th>\
            <th>auteur</th>\
            <th>type</th>\
            <th>description</th>\
          </tr>\
          <tr v-for="(item, id) in $parent.listeRecettes">\
            <td @click="loadRecette(item.id)">{{item.id}}</td>\
            <td @click="loadRecette(item.id)">{{item.titre}}</td>\
            <td @click="loadRecette(item.id)">{{item.auteur}}</td>\
            <td @click="loadRecette(item.id)">{{item.type}}</td>\
            <td @click="loadRecette(item.id)">{{item.description}}</td>\
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
        this.$parent.idxDebutListeRecettes += this.nbRecettesParPage;
        if (this.idxDebutListeRecettes >= this.nbRecettes) this.idxDebutListeRecettes -= this.nbRecettesParPage;
        this.$parent.loadListeRecettes()
      },
      //---------------------------------
      //
      //  pagePrecedente
      //
      //---------------------------------
      pagePrecedente() {
        this.$parent.idxDebutListeRecettes -= this.nbRecettesParPage
        if (this.$parent.idxDebutListeRecettes <= 0) this.$parent.idxDebutListeRecettes = 0;
        this.$parent.loadListeRecettes()
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
