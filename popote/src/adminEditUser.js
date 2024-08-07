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
                        <td>Numero</td> \
                        <td>{{localUser.numero}}</td> \
                    </tr> \
                    <tr> \
                        <td>Nom</td> \
                        <td>{{localUser.nom}}</td> \
                    </tr> \
                    <tr> \
                        <td>Passwd</td> \
                        <td><input v-model="newPasswd" value="newPasswd"></td> \
                    </tr> \
                    <tr> \
                        <td>email</td> \
                        <td><input v-model="newEmail" value="newEmail"></td> \
                    </tr> \
                    <tr> \
                        <td>Role</td> \
                        <td><input v-model="newIdRole" value="newIdRole"></input></td> \
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
          this.newIdRole = this.localUser.idRole
          this.newPasswd = this.localUser.pwd
          this.newEmail = this.localUser.email
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

