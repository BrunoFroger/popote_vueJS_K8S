import Admin from './admin.js'

export default {
    props: [], 
      data: function () {
        return {
          currentDateTime: '',
          mail : {
            destinataire: 'dest',
            objet: 'obj',
            message: 'mess',
          },
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
              <td>Destinataire</td>\
              <td><input v-model="mail.destinataire"></input></td>\
            </tr>\
            <tr>\
              <td>objet</td>\
              <td><input v-model="mail.objet"></input></td>\
            </tr>\
            <tr>\
              <td>message</td>\
              <td><textarea v-model="mail.message"></textarea></td>\
            </tr>\
          </table>\
        </div> \
        <div> \
            <button @click = "envoiMail(\'\')">Envoi du mail</button> \
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
          console.log("formulaireMail.js => updateDatas : ")
          this.mail.destinataire = 'sdfq@sdfq.com'
          this.mail.objet = 'test de mail'
          this.mail.message = 'ceci est le message de test'
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
        //---------------------------------
        //
        //  envoiMail
        //
        //---------------------------------
        envoiMail() {
          console.log("formulaireMail.js => envoiMail : " + JSON.stringify(this.mail))
          const requestOptions = {
            method: "POST",
            //headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.mail)
          };
          console.log("envoiMail.js => envoiMail " )
          var url = this.$parent.serverNodeAdress + '/envoiMail' 
          console.log('envoiMail.js => envoiMail : ' + url);
          fetch(url, requestOptions).then(r => r.json()).then(response => {
              console.log("reponse a l'envoi de mail : " + JSON.stringify(response))
              alert(response.message)
          })
          .catch(error => {
              alert("impossible d\'envoyer le message : " + error)
              console.error(error);
              console.log("erreur lors de l'envoi de mail");
          });
        },
      }
}

