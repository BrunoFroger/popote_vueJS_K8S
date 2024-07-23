import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          mail : {},
          destinataire: 'dest',
          objet: 'obj',
          message: 'mess',
        };
      },
      mounted() {
        this.updateDateTime();
        setInterval(this.updateDateTime, 1000);
        this.updateDatas()
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
              <td>{{mail.destinataire}}</td>\
            </tr>\
            <tr>\
              <td>objet</td\
              <td>{{mail.objet}}</td>\
            </tr>\
            <tr>\
              <td>message</td\
              <td>{{mail.message}}</td>\
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
        //  updateDatas
        //
        //---------------------------------
        updateDatas() {
          console.log("formulaireMail.js => updateDatas : " + mode)
          this.mail.destinataire = 'destinataire'
          this.mail.objet = 'objet'
          this.mail.message = 'messsage'
        },
        //---------------------------------
        //
        //  changeModeAffichage
        //
        //---------------------------------
        changeModeAffichage(mode) {
          console.log("formulaireMail.js => changeModeAffichage : " + mode)
          this.$parent.modeAffichageAdmin = mode;
        },
      }
}

