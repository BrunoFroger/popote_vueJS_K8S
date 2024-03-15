import Compte from './compte.js'

//var priveSelected = false;

export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
        auteur : null,
        titre : null,
        description : null,
        realisation : null,
        ingredients : null,
        ingredient : "{[null]}",
        index : 0,
        nbRecettes : 0,
        modeListe:true,
        nbRecettesParPage:10,
        idxDebutListeRecettes:0,
        listeRecettes:[],
        recettesPrivees:false,
        userName:null,
        userConnected:false,
      };
    },
    mounted() {
      this.updateConnected();
      this.updateDateTime();
      setInterval(this.updateDateTime, 1000);
      //this.loadRecette(this.index);
      this.loadListeRecettes();
      this.getNbRecettes();
    },
    template: '\
      <div>\
        <h1>Recettes</h1>\
        <p>Nous somme le {{currentDateTime}}</p>\
        <p>Cette page permet de visualiser l\'ensemble des {{nbRecettes}} recettes disponibles sur ce site ....</p>\
        <span v-if="userConnected" >\
          <input @change="loadListeRecettes" type="checkbox" v-model="recettesPrivees"> Mes recettes (visualisation de vos créations)\
        </span>\
        \
        <span v-if="modeListe">\
        <p>Liste des recettes</p>\
        <div>\
        <table>\
        <tr>\
        <th>titre</th>\
        <th>description</th>\
        </tr>\
        <tr v-for="(item, index) in listeRecettes">\
        <td @click="loadRecette(index)">{{item.titre}}</td>\
        <td>{{item.description}}</td>\
        </tr>\
        </table>\
        <button @click="pagePrecedente">recettes précédentes</button>\
        <button @click="pageSuivante">recettes suivantes</button>\
        </div>\
        \
        </span>\
        <span v-else>\
        <p><button @click="setModeListe">Retour à la liste de recettes</button></p>\
        <p>Recette numéro : <button @click="decrementeIndex">précédente</button>  {{index}}  <button @click="incrementeIndex">suivante</button></p>\
        <p></p>\
        <p v-if="auteur">Cette recette est proposée par {{auteur}}</p>\
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
      //  setModeListe
      //
      //---------------------------------
      setModeListe() {
        this.modeListe=true
      },
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
      //  incrementeIndex
      //
      //---------------------------------
      incrementeIndex() {
        this.index++;
        if (this.index >= this.nbRecettes) this.index = this.nbRecettes - 1;
        this.loadRecette(this.index);
      },
      //---------------------------------
      //
      //  decrementeIndex
      //
      //---------------------------------
      decrementeIndex() {
        this.index--;
        if (this.index <= 0) this.index = 0;
        this.loadRecette(this.index);
      },
      //---------------------------------
      //
      //  loadListeRecettes
      //
      //---------------------------------
      loadListeRecettes() {
        var prive = this.recettesPrivees;
        var index = this.idxDebutListeRecettes;
        var nb = this.nbRecettesParPage;
        var auteur = this.userName;
        var url = 'http://localhost:3000/getListeRecettes?index=' + index + '&nb=' + nb + '&user=' + auteur + '&prive=' + prive;
        console.log('recettes.js => loadListeRecettes : ');
        console.log('   index      : ' + index)
        console.log('   nbRecettes : ' + nb)
        console.log('   auteur     : ' + auteur)
        console.log('   prive      : ' + prive)
        fetch(url).then(r => r.json()).then(response => {
          //console.log("chargement de " + nb + " recettes a partir de  " + index);
          this.listeRecettes = response
        })
        .catch(error => {
          console.error(error);
          console.log("erreur lors du chargement de la liste de recettes" + this.idxDebutListeRecettes);
        });
      },
      //---------------------------------
      //
      //  loadRecette
      //
      //---------------------------------
      loadRecette(indexRecette) {
        if (this.modeListe) indexRecette += this.idxDebutListeRecettes;
        this.modeListe= false
        fetch('http://localhost:3000/getRecette?index=' + indexRecette).then(r => r.json()).then(response => {
          console.log("chargement de la recette " + indexRecette + ' depuis le serveur');
          console.log('titre : ' + response.titre);
          this.titre = response.titre;
          this.auteur = response.auteur
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
      //---------------------------------
      //
      //  getNbRecettes
      //
      //---------------------------------
      getNbRecettes() {
        fetch('http://localhost:3000/getNbRecettes').then(r => r.json()).then(response => {
          this.nbRecettes = response.nbRecettes;
          console.log("recuperation du nombre de recettes " + this.nbRecettes);
        })
        .catch(error => {
          console.error(error);
        });
      },
      //---------------------------------
      //
      //  updateConnected
      //
      //---------------------------------
      updateConnected() {
        console.log("recettes.js (updateConnected) => test si a user is connected .... ")
        var connectedUser = Compte.methods.isConnected()
        if (connectedUser != null){
          this.userName = connectedUser.nom;
          this.userConnected = true;
          //this.recettesPrivees = priveSelected;
          console.log('recettes.js (updateConnected) => userConnected = ' + this.userName)
        } else {
          console.log('recettes.js (updateConnected) => pas de user connecte ')
        }
      },
    }
}
