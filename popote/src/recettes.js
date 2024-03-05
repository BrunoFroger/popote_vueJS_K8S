export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          login : null,
          titre : null,
          description : null,
          realisation : null,
          ingredients : null,
          ingredient : "{[null]}",
          index : 0,
          nbRecettes : 0
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
        this.loadRecette(this.index);
        this.getNbRecettes();
      },
      template: '\
        <div>\
          <h1>Recettes</h1>\
          <p>Nous somme le {{currentDateTime}}</p>\
          <p>Cette page permet de visualiser l\'ensemble des recettes disponibles sur ce site ....</p>\
          <p>Recette numéro : <button @click="decrementeIndex">précédente</button>  {{index}}  <button @click="incrementeIndex">suivante</button></p>\
          <p></p>\
          <div>\
            <table>\
              <tr>\
                <td>titre</td>\
                <td>{{titre}}</td>\
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
          </div>\
        </div>\
      ',
      methods: {
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
        incrementeIndex() {
          this.index++;
          if (this.index >= this.nbRecettes) this.index = this.nbRecettes - 1;
          this.loadRecette(this.index);
        },
        decrementeIndex() {
          this.index--;
          if (this.index <= 0) this.index = 0;
          this.loadRecette(this.index);
        },
        loadRecette(indexRecette) {
          fetch('http://localhost:3000/getRecette?index=' + indexRecette).then(r => r.json()).then(response => {
            console.log("chargement de la recette " + indexRecette + ' depuis le serveur');
            console.log('titre : ' + response.titre);
            this.titre = response.titre;
            this.description = response.description;
            this.realisation = response.realisation
            this.ingredients = response.ingredients
          })
          .catch(error => {
            console.error(error);
            indexRecette--;
            console.log("chargement de la recette bidon " + indexRecette);
            this.titre = 'fausse recette numero ' + indexRecette
            this.description = 'bla bla bla';
          });
        },
        getNbRecettes() {
          fetch('http://localhost:3000/getNbRecettes').then(r => r.json()).then(response => {
            this.nbRecettes = response.nbRecettes;
            console.log("recuperation du nombre de recettes " + this.nbRecettes);
          })
          .catch(error => {
            console.error(error);
          });
        },
      }
}