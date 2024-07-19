
export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
        newTitre:'',
        newDescription:'',
        newRealisation:'',
        newIngredients:[],
        recette:{},
        selectedType:'',
        localTypes:{},
      };
    },
    mounted() {
      this.updateDateTime();
      this.updateDatas();
    },
    template: '\
    <h1>Création d\'une recette</h1>\
    <p>Remplissez les champs suivant et validez quand votre recette sera complète</p>\
    \
      <div>\
        <table>\
          <tr>\
            <td>titre</td>\
            <td><input v-model="newTitre" value="newTitre" @change="updateRecette"></td>\
          </tr>\
          <tr>\
            <td>type</td>\
            <td> \
              <select v-model="selectedType" @change="updateRecette">\
                <option v-for="localType in this.localTypes" :value="localType.id">{{localType.nom}}</option>\
              </select>\
            </td>\
          </tr>\
          <tr>\
            <td>description</td>\
            <td><input v-model="newDescription" value="newDescription" @change="updateRecette"></td>\
          </tr>\
          <tr>\
            <td>ingredients</td>\
            <td >\
              <thead>\
                <th>nom</th>\
                <th>quantité</th>\
                <th>unité</th>\
                <th><button @click="ajoutIngredient">+</button></th>\
              </thead>\
                <tr v-for="ingredient in newIngredients">\
                  <td><input v-model="ingredient.nom" value="ingredient.nom" @change="updateRecette"></td>\
                  <!--td>\
                    {{ingredient.nom}}\
                  </td-->\
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
            <td><input v-model="newRealisation" value="newRealisation" @change="updateRecette"></td>\
          </tr>\
        </table>\
        <button @click="creerRecette">Valider la recette</button>\
        <button @click="$parent.changeModeAffichage(\'listeRecettes\')">Retour</button>\
      </div>\
    ',
    methods: {
      //---------------------------------
      //
      //  updateDateTime
      //
      //---------------------------------
      updateDateTime() {
        const now = new Date();
        this.currentDateTime = now.toLocaleString();
      },
      //---------------------------------
      //
      //  creerRecette
      //
      //---------------------------------
      creerRecette() {
        this.recette={
          titre: this.newTitre,
          type: this.selectedType,
          description: this.newDescription,
          ingredients: this.newIngredients,
          realisation: this.newRealisation,
        }
        console.log("recette cree : " +JSON.stringify(this.recette))
      },
      //---------------------------------
      //
      //  updateRecette
      //
      //---------------------------------
      updateRecette() {
        //console.log("test si des ingredients sont vide dans ingredients : " + JSON.stringify(this.newIngredients))
        //var tmpIngredient = {}
        this.newIngredients.forEach((tmpIngredient, index) => {
          //console.log("test de l'ingredient " + JSON.stringify(tmpIngredient))
          if (tmpIngredient.nom == ""){
            this.newIngredients.splice(index,1)
            //console.log("suppression d'un ingredient vide " + JSON.stringify(tmpIngredient))
          }
        })
        this.recette={
          titre: this.newTitre,
          type: this.selectedType,
          description: this.newDescription,
          ingredients: this.newIngredients,
          realisation: this.newRealisation,
        }
        console.log("updateRecette : " +JSON.stringify(this.recette))
      },
      //---------------------------------
      //
      //  updateDatas
      //
      //---------------------------------
      updateDatas() {
        console.log("recetteCreation => updateDatas : types de recettes : " + JSON.stringify(this.$parent.typesRecettes))
        console.log("recetteCreation => updateDatas : types de recettes originale : " + JSON.stringify(this.$parent.typesRecettes))
        this.localTypes = this.$parent.typesRecettes
        console.log("recetteCreation => updateDatas : types de recettes locale : " + JSON.stringify(this.localTypes))
        this.localTypes.splice(0,1)
        console.log("recetteCreation => updateDatas : types de recettes locale apres suppresion item tout : " + JSON.stringify(this.localTypes))
      },
      //---------------------------------
      //
      //  ajouteIngredient
      //
      //---------------------------------
      ajoutIngredient() {
        this.newIngredients.push({"nom":"", "quantite":"", "unite":""})
        console.log("ajoutIngredient : " + JSON.stringify(this.newIngredients))
      },
    }
}
