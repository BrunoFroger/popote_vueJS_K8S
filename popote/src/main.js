const { createApp } = Vue;

import Home from './home.js';
import Recettes from './recettes.js';
import Compte from './compte.js';
import ListeRecettes from './listeRecettes.js'
import AfficheRecette from './afficheRecette.js'
import EditeRecette from './editeRecette.js'
import CreationRecette from './creationRecette.js'

const app = createApp({
    data() {
        return {
          page: 'home',
          connected: false,
          copyright: 'Bruno Froger (c) depuis 2024',
          isAdmin: false,
          currentDateTime: '',
          //serverNodeAdress: 'http://localhost:3000',
          //serverNodeAdress: 'http://backend.local:3000',
          serverNodeAdress: 'http://popote.zapto.org:3000',
        }
    },
    mounted() {
      this.updateTypeUser();
      this.updateDateTime();
      setInterval(this.updateDateTime, 1000);
    },
    template: '\
        <div class="entete">\
          <table>\
            <tr>\
              <td><a href="#" @click.prevent="page=\'home\'">Acceuil</a></td>\
              <td><a href="#" @click.prevent="page=\'recettes\'">Recettes</a></td>\
              <td><a href="#" @click.prevent="page=\'compte\'">Mon compte</a></td>\
              <td v-if="isAdmin"><a href="#" @click.prevent="page=\'admin\'">Admin</a></td>\
              <td>{{currentDateTime}}</td>\
            </tr>\
          </table>\
        </div>\
        <div>\
        <span @load="updateTypeUser"></span>\
          <component v-bind:is="page"></component>\
        </div>\
        <div class="piedPage">\
          <i>Créé par : {{copyright}}</i>\
        </div>\
      ',
    methods: {
      updateTypeUser(){
        this.isAdmin = Compte.methods.isAdminUser();
        console.log('isAdmin : ' + this.isAdmin)
      },
      //---------------------------------
      //
      //  updateDateTime
      //
      //---------------------------------
      updateDateTime() {
        const now = new Date();
        this.currentDateTime = now.toLocaleString();
      },
    }
});

app.component('home', Home);
app.component('recettes', Recettes);
app.component('compte', Compte);
app.component('listeRecettes', ListeRecettes);
app.component('afficheRecette', AfficheRecette);
app.component('editeRecette', EditeRecette);
app.component('creationRecette', CreationRecette);
app.mount('#app');
