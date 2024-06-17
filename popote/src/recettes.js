import Compte from './compte.js'

//var priveSelected = false;

export default {
  props: [], 
    data: function () {
      return {
        currentDateTime: '',
        indexRecette:0,
        modeAffichage:'listeRecettes',
        auteur : null,
        titre : null,
        typeRecette:null,
        description : null,
        realisation : null,
        ingredients : null,
        ingredient : "{[null]}",
        index : 0,
        nbRecettes : 0,
        nbRecettesParPage:10,
        idxDebutListeRecettes:0,
        listeRecettes:[],
        recette:[],
        recettesPrivees:false,
        userName:null,
        userConnected:false,
        typesRecettes:{},
        typeRecetteSelected:'Tout',
      };
    },
    mounted() {
      this.getTypesRecettes();
      this.getNbRecettes();
      this.updateDateTime();
      setInterval(this.updateDateTime, 1000);
    },
    template: '\
      <div>\
        <span v-if="modeAffichage == \'listeRecettes\'">\
          <listeRecettes/>\
        </span>\
        <span v-if="modeAffichage == \'afficheRecette\'">\
          <afficheRecette/>\
        </span>\
        <span v-if="modeAffichage == \'editeRecette\'">\
          <editeRecette/>\
        </span>\
        <span v-if="modeAffichage == \'creationRecette\'">\
          <creationRecette/>\
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
      setModeListe(valeur) {
        console.log('recettes.js => setmodeListe : ' + valeur)
        this.modeListe=valeur
        this.$forceUpdate();      
      },
      //---------------------------------
      //
      //  incrementeIndex
      //
      //---------------------------------
      incrementeIndex() {
        this.index++;
        if (this.index >= this.nbRecettes) this.index = this.nbRecettes;
        this.loadRecette(this.index);
        console.log("recette.js : incrementeIndex : " + this.index)
      },
      //---------------------------------
      //
      //  decrementeIndex
      //
      //---------------------------------
      decrementeIndex() {
        this.index--;
        if (this.index <= 0) this.index = 1;
        this.loadRecette(this.index);
        console.log("recette.js : decrementeIndex : " + this.index)
      },
      //---------------------------------
      //
      //  getNbRecettes
      //
      //---------------------------------
      getNbRecettes() {
        let adresse = this.$parent.serverNodeAdress + '/getNbRecettes'
        console.log("recette.js => : getNbRecette => " + adresse)
        // todo : retourner nb de recettes dans listeRecettes plutot que le nombre de recettes en base
        fetch(adresse).then(r => r.json()).then(response => {
          this.nbRecettes = response.nbRecettes;
          console.log("recuperation du nombre de recettes " + this.nbRecettes);
        }).catch(error => {
          console.error(error);
        });
      },
      //---------------------------------
      //
      //  getNbRecettes
      //
      //---------------------------------
      getTypesRecettes() {
        let adresse = this.$parent.serverNodeAdress + '/getTypesRecettes'
        console.log("recette.js => : getTypesRecettes => " + adresse)
        fetch(adresse).then(r => r.json()).then(response => {
          this.typesRecettes = response;
          console.log("recuperation des types de recettes " + JSON.stringify(this.typesRecettes));
        }).catch(error => {
          console.error(error);
        });
      },
      //---------------------------------
      //
      //  switchModeEdition
      //
      //---------------------------------
      switchModeEdition() {
        //console.log("recettes.js (switchModeEdition) =>")
        this.modeEdition = !this.modeEdition
      },
      //---------------------------------
      //
      //  updateRecette
      //
      //---------------------------------
      updateRecette() {
        console.log("recettes.js : updateRecette => TODO")
        this.switchModeEdition()
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
      //  loadListeRecettes
      //
      //---------------------------------
      loadListeRecettes() {
        console.log('loadListeRecettes .....')
        var prive = this.recettesPrivees;
        var index = this.idxDebutListeRecettes;
        var nb = this.nbRecettesParPage;
        var auteur = this.userName;
        var type = this.typeRecetteSelected;
        var url = this.$parent.serverNodeAdress + '/getListeRecettes?index=' + index 
            + '&nb=' + nb + '&user=' + auteur 
            + '&prive=' + prive + '&type=' + type;
        console.log('recettes.js => loadListeRecettes : ' + url);
        //var url = 'http://localhost:3000/getListeRecettes?index=' + index 
        //          + '&nb=' + nb + '&user=' + auteur 
        //          + '&prive=' + prive + '&type=' + type;
        //console.log('   index      : ' + index)
        //console.log('   nbRecettes : ' + nb)
        //console.log('   auteur     : ' + auteur)
        //console.log('   prive      : ' + prive)
        fetch(url).then(r => r.json()).then(response => {
          //console.log("chargement de " + nb + " recettes a partir de  " + index);
          this.listeRecettes = response
          console.log("listeRecettes => " + response)
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
      loadRecette(index) {
        //this.indexRecette = item.index
        //if (this.modeListe) indexRecette += this.idxDebutListeRecettes;
        var url = this.$parent.serverNodeAdress + '/getRecette?index=' + index
        console.log('recette.js => loadRecette : ' + url)
        fetch(url).then(r => r.json()).then(response => {
          //console.log("recettes.js (loadRecette) => chargement de la recette " + this.indexRecette + ' depuis le serveur');
          //console.log('     titre : ' + response.titre);
          this.recette = response
          // this.titre = this.$parent.titre = response.titre;
          // this.typeRecette = this.$parent.typeRecette = response.type;
          // this.auteur = this.$parent.auteur = response.auteur
          // this. description = this.$parent.description = response.description;
          // this.realisation = this.$parent.realisation = response.realisation
          // this.ingredients = this.$parent.ingredients = response.ingredients
          console.log('listeRecette.js => recette ' + JSON.stringify(this.recette))
          this.modeAffichage = 'afficheRecette'
        })
        .catch(error => {
          console.error(error);
          this.indexRecette--;
          console.log("chargement de la recette bidon " + this.indexRecette);
          this.titre = 'fausse recette numero ' + this.indexRecette
          this.description = 'bla bla bla';
        });
      },
    }
}
