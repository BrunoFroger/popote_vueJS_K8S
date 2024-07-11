import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          requetteSql:'',
          reponseSql:'',
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration : envoi de requetes SQL en base</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
        </div> \
        <div> \
            <span>Votre requete :</span> \
            <br> \
            <input v-model="requeteSql"/>\
            <!--button @click = "envoiRequeteSql(requeteSql)">Envoi requete</button--> \
            <span> Reponse :</span> \
            <textArea v-model= "reponseSql> </textArea\
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
          console.log("adminRequetteSql.js => updateDatas")
        },
        //---------------------------------
        //
        //  changeModeAffichage
        //
        //---------------------------------
        changeModeAffichage(mode) {
          console.log("adminRequetteSql.js => changeModeAffichage : " + mode)
          this.$parent.modeAffichageAdmin = mode;
        },
        //---------------------------------
        //
        //  envoiRequetteSql
        //
        //---------------------------------
        envoiRequetteSql(requete) {
            console.log("adminRequetteSql.js => envoiRequetteSql " )
            var url = this.$parent.serverNodeAdress + '/requetteSql&requette=' + requette
            console.log('adminRequetteSql.js => loadListeRecettes : ' + url);
            fetch(url).then(r => r.json()).then(response => {
                this.reponseSql = response
                console.log("liste des users : " + JSON.stringify(this.reponseSql))
            })
            .catch(error => {
                console.error(error);
                console.log("erreur lors de l'execution de la requette SQL");
            });
        },
      }
}

