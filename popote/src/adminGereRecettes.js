

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
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
          Admin.methods.changeModeAffichage(mode);
        },
      }
}

