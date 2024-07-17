import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          localUser:{},
          newIdRole:'',
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration : Edition d\'un utilisateur</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
        </div> \
        <div> \
            <table>\
                <thead> \
                    <th>item</th> \
                    <th>Valeur</th> \
                </thead> \
                <tbody> \
                    <tr> \
                        <td>Nom</td> \
                        <td>{{localUser.nom}}</td> \
                    </tr> \
                    <tr> \
                        <td>Passwd</td> \
                        <td>{{localUser.pwd}}</td> \
                    </tr> \
                    <tr> \
                        <td>email</td> \
                        <td>{{localUser.email}}</td> \
                    </tr> \
                    <tr> \
                        <td>Role</td> \
                        <td><input v-model="newIdRole" placeholder="{{localUser.idRole}}"></input></td> \
                    </tr> \
                </tbody> \
            </table>\
            <button @click = "valider">Valider</button> \
            <br> \
            <button @click = "changeModeAffichage(\'gereUsers\')">Retour</button> \
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
          console.log("adminEditUsers.js => updateDatas")
          this.localUser = this.$parent.editUser
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
          console.log("adminGereUsers.js => valider : newIdRole = " + this.newIdRole)
          this.localUser.idRole = this.newIdRole
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

