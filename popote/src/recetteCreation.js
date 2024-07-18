
export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
        newTitre:'',
        newDescription:'',
        newRealisation:'',
        newIngredients:{},
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
            <select v-model="selectedType" @change"updateRecette">\
              <option v-for="type in this.$parent.typesRecettes" :value=type.nom></option>\
            </select>\
          </td>\
        </tr>\
          <tr>\
            <td>description</td>\
            <td>{{description}}</td>\
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
                <tr v-for="ingredient in ingredients">\
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
            <td>{{realisation}}</td>\
          </tr>\
        </table>\
        <span>\
          <button @click="creerRecette">Valider la recette</button>\
          <button @click="$parent.changeModeAffichage(\'listeRecettes\')">Retour</button>\
        </span>\
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
