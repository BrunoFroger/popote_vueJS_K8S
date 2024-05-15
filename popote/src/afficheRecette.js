
export default {
  // props: {
  //   recetteAffichee:{
  //     required: true,
  //   },
  // }, 
    data: function () {
      return {
        // auteur : null,
        // titre : null,
        // typeRecette:null,
        // description : null,
        // realisation : null,
        // ingredients : null,
        // ingredient : "{[null]}",
        // //index : 0,
        recette:{},
        modeEdition:false,
      };
    },
    mounted() {
      this.loadDatas();
    },
    template: '\
      <h1>Recette</h1>\
      <p><button @click="setModeListe(\'listeRecettes\')">Retour à la liste de recettes</button></p>\
      <p>Recette numéro : <button @click="decrementeIndex">précédente</button>  {{$parent.index}}  <button @click="incrementeIndex">suivante</button></p>\
      <p></p>\
      <p v-if="$parent.recette.auteur">Cette recette est proposée par {{$parent.recette.auteur}}\
        <span v-if="$parent.recettesPrivees"> \
          <button @click="switchModeEdition">Editer</button>\
          <span v-if="modeEdition"> Edition en cours .... </span>\
          </span>\
      </p>\
      <p></p>\
      <div>\
        <table>\
        <!--tr>\
          <td>index</td>\
          <td>{{indexRecette}}</td>\
        </tr-->\
        <tr>\
          <td>titre</td>\
          <td>{{$parent.recette.titre}}</td>\
        </tr>\
        <tr>\
          <td>type</td>\
          <td>{{$parent.recette.typeRecette}}</td>\
        </tr>\
          <tr>\
            <td>description</td>\
            <td>{{$parent.recette.description}}</td>\
          </tr>\
          <tr>\
            <td >ingredients</td>\
            <td >\
              <thead>\
                <th>nom</th>\
                <th>quantité</th>\
                <th>unité</th>\
              </thead>\
                <tr v-for="ingredient in $parent.recette.ingredients">\
                  <td>\
                    {{ingredient.nom}}\
                  </td>\
                  <td>\
                    {{ingredient.quantite}}\
                  </td>\
                  <td>\
                    {{ingredient.unite}}\
                  </td>\
              </tr>\
            </td>\
          </tr>\
          <tr>\
            <td>realisation</td>\
            <td>{{$parent.recette.realisation}}</td>\
          </tr>\
        </table>\
        <span v-if="modeEdition">\
          <button @click="updateRecette">Mise a jour</button>\
          <button @click="switchModeEdition">Annuler</button>\
        </span>\
      </div>\
    ',
    methods: {
      //---------------------------------
      //
      //  setModeListe
      //
      //---------------------------------
      setModeListe(valeur) {
        console.log('afficheRecette.js => setmodeListe : ' + valeur)
        this.$parent.modeAffichage = valeur
      },
      // //---------------------------------
      // //
      // //  incrementeIndex
      // //
      // //---------------------------------
      // incrementeIndex() {
      //   this.index++;
      //   if (this.index >= this.$parent.nbRecettes) this.index = this.$parent.nbRecettes - 1;
      //   this.recette = this.loadRecette(this.$parent.listeRecettes[this.index]);
      // },
      // //---------------------------------
      // //
      // //  decrementeIndex
      // //
      // //---------------------------------
      // decrementeIndex() {
      //   this.index--;
      //   if (this.index <= 0) this.index = 0;
      //   this.recette = this.loadRecette(this.$parent.listeRecettes[this.index]);
      // },
      //---------------------------------
      //
      //  loadDatas
      //
      //---------------------------------
      loadDatas() {
        console.log('afficheRecette.js => loadDatas')
        this.recette = this.$parent.recette
        this.index = this.$parent.index
        // this.auteur = this.$parent.auteur
        // this.titre = this.$parent.titre
        // this.typeRecette = this.$parent.typeRecette
        // this.description = this.$parent.description
        // this.realisation = this.$parent.realisation
        // this.ingredients = this.$parent.ingredients
        // this.ingredient = this.$parent.ingredient
        console.log('afficheRecette => loadDatas : recette (' + this.recette.titre + ') recupérée')
      },
      //---------------------------------
      //
      //  loadRecette
      //
      //---------------------------------
      loadRecette(index) {
        console.log('afficheRecette.js => loadRecette ' + index)
        this.$parent.loadRecette(index)
        return this.$parent.recette
      },
      //---------------------------------
      //
      //  incrementeIndex
      //
      //---------------------------------
      incrementeIndex() {
        this.$parent.incrementeIndex()
        this.recette = this.$parent.recette
      },
      //---------------------------------
      //
      //  decrementeIndex
      //
      //---------------------------------
      decrementeIndex() {
        this.$parent.decrementeIndex()
        this.recette = this.$parent.recette
      },
    },
}
