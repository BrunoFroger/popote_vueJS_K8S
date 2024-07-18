
export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
      };
    },
    mounted() {
    },
    template: '\
    <h1>Création d\'une recettes</h1>\
    <p>Remplissez les champs suivant et validez quand votre recette sera complète</p>\
    \
      <p><button @click="setModeListe">Retour à la liste de recettes</button></p>\
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
          <button @click="$parent.changeModeAffichage(\'listeRecettes\')">Retour</button>\
        </span>\
      </div>\
    ',
    methods: {
    }
}
