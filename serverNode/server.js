const http = require('node:http')
const url=require("url")
const fs=require("fs")
const { parse } = require('querystring');

const hostname = 'localhost';
const port = 3000;
var idRecette;
var nbRecettes = 0;
var nbUsers = 0;
var recettes=[];
var users=[];
var localStatus='';
var localMessage='';
var passPhrase = 'sldjreioenos,soa';
var tmpUser=null

//=====================================================
//
//      http.createServer
//
//=====================================================
const server = http.createServer((req, res) => {
    //console.log('requete = ' + req.url);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Header', 'content-type');
    console.log("serveur => url = " + req.url);
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Hello Popote\n');
    } else if (req.url.startsWith('/getRecette')){
        idRecette = url.parse(req.url,true).query.index 
        let maRecette = recettes[idRecette];
        res.setHeader('Content-Type', 'text/json');
        //console.log('serveur => requete getRecette ' + idRecette);
        //console.log('serveur => ' + JSON.stringify(maRecette));
        res.end(JSON.stringify(maRecette));
    } else if (req.url.startsWith('/getNbRecettes')){
        //console.log('requete getNbRecettes ');
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        const stuff ={
            "nbRecettes": nbRecettes,
        };
        res.end(JSON.stringify(stuff));
    } else if (req.url.startsWith('/updateDatas')){
        //console.log('requete updateDatas ');
        updateDatas();
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end("OK");
    } else if (req.url.startsWith('/getListeRecettes')){
        //console.log('serveur => requete getListeRecettes ');
        debut = url.parse(req.url,true).query.index
        nb = url.parse(req.url,true).query.nb
        auteur = url.parse(req.url,true).query.user
        prive = url.parse(req.url,true).query.prive
        typeRecette = url.parse(req.url,true).query.type
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        listTmp = getListRecettes(debut, nb, auteur, prive, typeRecette)
        res.end(JSON.stringify(listTmp));
    } else if (req.url.startsWith('/requeteUser')){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            //console.log('serveur => ' + parse(body));
            //console.log(body);
            let user = JSON.parse(body)
            let typeRequette = user.type
            //console.log(typeRequette)
            stuff ={
                "status": localStatus,
                "message": localMessage,
                "user": null
            };
            if (typeRequette === "connexion"){
                //console.log("serveur => traitement de la requete " + typeRequette)
                let tmp = checkConnect(user)
                //console.log('serveur => valeur retour checkConnect : ' + tmp)
                stuff.user = tmp
                //console.log("serveur => localStatus=" + localStatus + ", localMessage=" + localMessage + ', user=' + stuff.user)
                //res.end(resultat)
            //} else if (typeRequette === "deconnexion"){
                //console.log("serveur => traitement de la requete " + typeRequette)
            } else {
                console.log("serveur => requete inconnue " + typeRequette)
            }
            res.setHeader('Content-Type', 'text/json; charset=utf-8');
            stuff.status = localStatus
            stuff.message =localMessage
            //console.log("serveur => reponse envoyée : " + JSON.stringify(stuff))
            res.end(JSON.stringify(stuff));
        });
        //console.log('requete requeteUser ');
    } else {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('page not found')
    }   
});

//=====================================================
//
//      server.listen
//
//=====================================================
server.listen(port, hostname, () => {
    console.log(`serveur => Server running at http://${hostname}:${port}/`);
    chargeRecettes();
    chargeUsers()
  });

  //=====================================================
  //
  //      function chargeUsers
  //
  //=====================================================
  function chargeUsers(){
    fs.readFile("users.json","utf-8",(err,data)=>{
        if(err){
            const stuff ={
                titre: 'impossible de lire le fichier de users',
                description: 'Sans objet',
            };
            recettes = JSON.stringify(stuff);
            //res.end(jsonContent);
        } else {
            console.log('serveur => lecture du fichier contenant les users');
            users = JSON.parse(data);
            nbUsers = 0;
            users.forEach ((item) =>{
                nbUsers++;
            });
            console.log('serveur => nombre de Users : ' + nbUsers);
        }
    });
  }

  //=====================================================
  //
  //      function updateDatas
  //
  //=====================================================
  function updateDatas(){
    chargeUsers();
    chargeRecettes();
  }

  //=====================================================
  //
  //      function chargeRecettes
  //
  //=====================================================
  function chargeRecettes(){
    fs.readFile("recettes.json","utf-8",(err,data)=>{
        if(err){
            const stuff ={
                titre: 'impossible de lire le fichier de recettes',
                description: 'Sans objet',
            };
            recettes = JSON.stringify(stuff);
            //res.end(jsonContent);
        } else {
            console.log('serveur => lecture du fichier contenant les recettes');
            recettes = JSON.parse(data);
            nbRecettes = 0;
            recettes.forEach ((item) =>{
                item.index = nbRecettes;
                nbRecettes++;
            });
            console.log('serveur => nombre de recetes : ' + nbRecettes);
        }
    });
  }

//=====================================================
//
//      function getListRecettes
//
//=====================================================
function getListRecettes(debut, nb, auteur, prive, type){
    var liste = []
    let index = 0;
    let cpt=0
    /*console.log("server.js => lecture de " + nb + " recettes a partir de " + debut)
    console.log("server.js => auteur = " + auteur + ", prive =  " + prive)  
    if (auteur == 'null'){
        console.log('auteur non defini')
    } else {
        console.log('auteur = ' +auteur)
    }
    if (prive == 'false'){
        console.log('liste de toutes les recettes') 
    } 
    else {
        console.log('liste des recettes de ' + auteur) 
    }*/
    while (cpt < nb){
        let idx = Number(index++) + Number(debut);
        //console.log("server.js => lecture recette " + idx)
        item = recettes[idx]
        if (!item){
            //console.log('server.js => fin de la liste des recettes')
            break
        }
        if (prive == 'false' || (prive == 'true' && auteur == item.auteur)){
            if ((type == 'Tout') || (type == item.type)){
                liste.push(item)
                cpt++
            }
            //console.log("server.js => ajout recette " + idx + " : " + item.titre)
        } else {
            //console.log('server.js => cette recette ne correspond pas aux criteres de selection')
            //console.log ('      auteur      =  ' + auteur)
            //console.log ('      prive       =  ' + prive)
            //console.log ('      item.nom    =  ' + item.nom)
            //console.log ('      item.auteur =  ' + item.auteur)
        }
    }
    console.log (cpt + ' recettes trouvées')
    return liste
}

//=====================================================
//
//      function checkConnect
//
//=====================================================
  function checkConnect(user){
    //console.log("serveur => fonction checkConnect")
    localStatus = 'KO'
    localMessage = 'Utilisateur inconnu'
    users.forEach((item) =>{
        if (item.nom === user.user){
            if (item.password === user.pwd){
                tmpUser = item
                localStatus = 'OK'
                localMessage = 'connexion OK'
                //console.log("serveur => user trouvé : " + tmpUser)
                return tmpUser
            } else {
                localMessage = 'mauvais mot de passe'
            }
        }
    });
    return tmpUser
  }
