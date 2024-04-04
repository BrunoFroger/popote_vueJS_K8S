
export default {
  props: [], 
    data: function () {
      return {
      };
    },
    mounted() {
    },
    template: '\
      <p><button @click="setModeListe">Retour à la liste de recettes</button></p>\
      <p>Recette numéro : <button @click="decrementeIndex">précédente</button>  {{index}}  <button @click="incrementeIndex">suivante</button></p>\
      <p></p>\
      <p v-if="auteur">Cette recette est proposée par {{auteur}}\
        <span v-if="recettesPrivees"> \
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
          <td>{{titre}}</td>\
        </tr>\
        <tr>\
          <td>type</td>\
          <td>{{typeRecette}}</td>\
        </tr>\
          <tr>\
            <td>description</td>\
            <td>{{description}}</td>\
          </tr>\
          <tr>\
            <td >ingredients</td>\
            <td >\
              <thead>\
                <th>nom</th>\
                <th>quantité</th>\
                <th>unité</th>\
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
        <span v-if="modeEdition">\
          <button @click="updateRecette">Mise a jour</button>\
          <button @click="switchModeEdition">Annuler</button>\
        </span>\
      </div>\
    ',
    methods: {
    }
}
