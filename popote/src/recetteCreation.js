
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
                <option v-for="localType in this.$parent.typesRecettes" :value="localType.id">{{localType.nom}}</option>\
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
          type: this.selectedType.id,
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
        console.log("test si des ingredients sont vide dans ingredients : " + this.newIngredients)
        for(var item in this.newIngredients){
          console.log("test de l'ingredient " + JSON.stringify(item))
          if (item.nom == ""){
            this.newIngredients.delete(item)
            console.log("suppression d'un ingredient vide")
          }
        }
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
        console.log("types de recettes : " + JSON.stringify(this.$parent.typesRecettes))
        console.log("updateDatas : " + JSON.stringify(this.recette))
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
