const { createApp } = Vue;

import Home from './home.js';
import Recettes from './recettes.js';
import MesRecettes from './mesRecettes.js';
import Compte from './compte.js';

const app = createApp({
    data() {
        return {
	    page: 'home',
	    copyright: 'Bruno Froger (c) depuis 2024',
        }
    },
    mounted() {
    },
    template: '\
        <div class="entete">\
          <table>\
            <tr>\
              <td><a href="#" @click.prevent="page=\'home\'">page d\'acceuil</a></td>\
              <td><a href="#" @click.prevent="page=\'recettes\'">recettes</a></td>\
              <td><a href="#" @click.prevent="page=\'mesRecettes\'">mes recettes</a></td>\
              <td><a href="#" @click.prevent="page=\'compte\'">mon compte</a></td>\
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
app.component('mesRecettes', MesRecettes);
app.component('compte', Compte);
app.mount('#app');
