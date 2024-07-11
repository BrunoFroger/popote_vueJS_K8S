import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          requeteSql:'',
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
            <input v-model="requeteSql"/>\
            <button @click = "envoiRequeteSql(requeteSql)">Envoi requete</button> \
            <br/> \
            <span> Reponse :</span> \
            <textArea v-model= "reponseSql">{{reponseSql}}</textArea>\
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
        envoiRequeteSql(requete) {
            const stuff ={
              "requete":requete,
            };
            const requestOptions = {
              method: "POST",
              //headers: { "Content-Type": "application/json" },
              body: JSON.stringify(stuff)
            };
            console.log("adminRequeteSql.js => envoiRequeteSql " )
            var url = this.$parent.serverNodeAdress + '/requeteSql' 
            console.log('adminRequeteSql.js => envoiRequeteSql : ' + url);
            fetch(url, requestOptions).then(r => r.json()).then(response => {
                this.reponseSql = response
                console.log("reponse a la requete SQL: " + JSON.stringify(this.reponseSql))
            })
            .catch(error => {
                console.error(error);
                console.log("erreur lors de l'execution de la requete SQL");
            });
        },
      }
}

