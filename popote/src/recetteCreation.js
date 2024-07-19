
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
                  <td>\
                  <td><input v-model="ingredient.quantite" value="ingredient.quantite" @change="updateRecette"></td>\
                  </td>\
                  <td>\
                  <td><input v-model="ingredient.unite" value="ingredient.unite" @change="updateRecette"></td>\
                  </td>\
              </tr>\
            </td>\
          </tr>\
          <tr>\
            <td>realisation</td>\
            <!--td><input v-model="newRealisation" value="newRealisation" @change="updateRecette"></td-->\
            <td><textarea v-model="newRealisation" @change="updateRecette"></textarea></td>\
          </tr>\
        </table>\
        <div>\
          <button @click="creerRecette">Valider la recette</button>\
          <button @click="$parent.changeModeAffichage(\'listeRecettes\')">Retour</button>\
        </div>\
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
        requeteSql = "INSERT INTO Recettes (titre, "
        this.envoiRequeteSql(requtesql)
      },
      //---------------------------------
      //
      //  envoiRequetteSql
      //
      //---------------------------------
      envoiRequeteSql(requete) {
          const requestOptions = {
            method: "POST",
            //headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.recette)
          };
          console.log("recetteCreation.js => creeRecette " )
          var url = this.$parent.serverNodeAdress + '/creeRecette' 
          console.log('recetteCreation.js => creeRecette : ' + url);
          fetch(url, requestOptions).then(r => r.json()).then(response => {
              this.reponseSql = response
              console.log("recetteCreation => reponse a la requete SQL: " + JSON.stringify(this.reponseSql))
          })
          .catch(error => {
              console.error(error);
              console.log("recetteCreation => erreur lors de l'execution de la requete SQL");
          });
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
