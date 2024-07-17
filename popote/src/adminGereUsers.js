import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          listeUsers:[],
        };
      },
      mounted() {
        this.updateDateTime();
        this.updateDatas();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Administration : Gestion des utilisateurs</h1>\
          <p>Cette page est accessible uniquement pour les administrateurs du site</p>\
        </div> \
        <div> \
            <table>\
                <thead> \
                    <th>id</th> \
                    <th>nom</th> \
                    <th>passwd</th> \
                    <th>email</th> \
                    <th></th> \
                </thead> \
                <tbody> \
                    <tr v-for="item in listeUsers"> \
                        <td>{{item.id}}</td> \
                        <td>{{item.nom}}</td> \
                        <td>{{item.pwd}}</td> \
                        <td>{{item.email}}</td> \
                        <td>{{item.idRole}}</td> \
                        <td><button @click="editUser(\'editUser\, {{item.id}})">Edit</button></td> \
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
          console.log("adminGereUsers.js => updateDatas")
          this.getAllUsers()
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
        //  editUser
        //
        //---------------------------------
        editUser(mode, user) {
          console.log("editUser.js => changeModeAffichage : " + mode)
          this.$parent.EditUser = user
          this.$parent.modeAffichageAdmin = mode;
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

