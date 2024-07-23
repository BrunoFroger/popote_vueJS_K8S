import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          destinataire: 'dest',
          objet: 'obj',
          message: 'mess',
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
      },
      template: '\
        <div>\
          <h1>Formulaire d\'envoi de mail</h1>\
          Ce formulaire permet d\'envoyer un mail\
        </div> \
        <div>\
          <table>\
            <tr>\
              <td>Destinataire</td\
              <td>{{destinataire}}</td>\
            </tr>\
            <tr>\
              <td>objet</td\
              <td>{{objet}}</td>\
            </tr>\
            <tr>\
              <td>message</td\
              <td>{{message}}</td>\
            </tr>\
          </table>\
        </div> \
        <div> \
            <button @click = "envoiMail(\'\')">Envoi du mail</button> \
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
      }
}

