const { createApp } = Vue;

import Home from './home.js';
import Recettes from './recettes.js';
import Compte from './compte.js';

const app = createApp({
    data() {
        return {
	    page: 'home',
      connected: false,
	    copyright: 'Bruno Froger (c) depuis 2024',
        }
    },
    mounted() {
    },
    template: '\
        <div class="entete">\
          <table>\
            <tr>\
              <td><a href="#" @click.prevent="page=\'home\'">Acceuil</a></td>\
              <td><a href="#" @click.prevent="page=\'recettes\'">Recettes</a></td>\
              <td><a href="#" @click.prevent="page=\'compte\'">Mon compte</a></td>\
            </tr>\
          </table>\
        </div>\
        <div>\
          <component v-bind:is="page"></component>\
        </div>\
        <div class="piedPage">\
          <i>Créé par : {{copyright}}</i>\
        </div>\
      ',
    methods: {
    }
});

app.component('home', Home);
app.component('recettes', Recettes);
app.component('compte', Compte);
app.mount('#app');
