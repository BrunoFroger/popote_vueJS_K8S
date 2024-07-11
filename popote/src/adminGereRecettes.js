

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          listeRecettes:[],
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration : Gestion des recettes</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
        </div> \
        <div> \
            <table>\
                <thead> \
                    <th>id</th> \
                    <th>nom</th> \
                    <th></th> \
                    <th></th> \
                    <th></th> \
                </thead> \
                <tbody> \
                    <tr v-for="item in listeRecettes"> \
                        <td>{{item.id}}</td> \
                        <td>{{item.nom}}</td> \
                        <td></td> \
                        <td></td> \
                        <td></td> \
                    </tr> \
                </tbody> \
            </table>\
            <button @click = "changeModeAffichage(\' \')">Retour</button> \
        </div> \
      ',
      methods: {
        //---------------------------------
        //
        //  UpdateTime
        //
        //---------------------------------
        updateDateTime() {
          const now = new Date();
          this.currentDateTime = now.toLocaleString();
        },
        //---------------------------------
        //
        //  updateDatas
        //
        //---------------------------------
        updateDatas() {
          console.log("adminGereRecettes.js => updateDatas")
        },
        //---------------------------------
        //
        //  changeModeAffichage
        //
        //---------------------------------
        changeModeAffichage(mode) {
          console.log("adminGerRecettes.js => changeModeAffichage : " + mode)
          this.$parent.modeAffichageAdmin = mode;
        },
        //---------------------------------
        //
        //  getAllRecettes
        //
        //---------------------------------
        getAllRecettes() {
            console.log("getAllRecettes.js => getAllUsers " )
            var url = this.$parent.serverNodeAdress + '/getAllRecettes'
            console.log('getAllRecettes.js => loadListeRecettes : ' + url);
            fetch(url).then(r => r.json()).then(response => {
                this.listeRecettes = response
                console.log("liste des recetees : " + JSON.stringify(this.listeRecettes))
            })
            .catch(error => {
                console.error(error);
                console.log("erreur lors du chargement de la liste de recettes");
            });
        },
      }
}

