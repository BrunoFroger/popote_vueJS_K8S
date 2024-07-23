import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          localUser:{},
          newIdRole:'',
          newPasswd:'',
          newEmail:'',
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Formulaire d\'envoi de mail</h1>\
        </div> \
        <div> \
            <button @click = "changeModeAffichage(\'\')">Retour</button> \
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
        //  changeModeAffichage
        //
        //---------------------------------
        changeModeAffichage(mode) {
          console.log("adminGereUsers.js => changeModeAffichage : " + mode)
          this.$parent.modeAffichageAdmin = mode;
        },
        //---------------------------------
        //
        //  valider
        //
        //---------------------------------
        valider() {
          this.localUser.idRole = this.newIdRole
          this.localUser.pwd = this.newPasswd
          this.localUser.email = this.newEmail
          console.log("nouvelles donnees user = " + JSON.stringify(this.localUser))
        },
        //---------------------------------
        //
        //  getAllUsers
        //
        //---------------------------------
        getAllUsers() {
            console.log("adminGereUsers.js => getAllUsers " )
            var url = this.$parent.serverNodeAdress + '/getAllUsers'
            console.log('adminGereUsers.js => loadListeRecettes : ' + url);
            fetch(url).then(r => r.json()).then(response => {
                this.listeUsers = response
                console.log("liste des users : " + JSON.stringify(this.listeUsers))
            })
            .catch(error => {
                console.error(error);
                console.log("erreur lors du chargement de la liste de users");
            });
        },
      }
}

