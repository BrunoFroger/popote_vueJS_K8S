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
        //console.log('serveur => ' + maRecette);
        res.end(JSON.stringify(maRecette));
    } else if (req.url.startsWith('/getNbRecettes')){
        //console.log('requete getNbRecettes ');
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        const stuff ={
            "nbRecettes": nbRecettes,
        };
        res.end(JSON.stringify(stuff));
    } else if (req.url.startsWith('/getListeRecettes')){
        console.log('serveur => requete getListeRecettes ');
        debut = url.parse(req.url,true).query.index
        nb = url.parse(req.url,true).query.nb
        auteur = url.parse(req.url,true).query.auteur
        prive = url.parse(req.url,true).query.prive
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        listTmp = getListRecettes(debut, nb, auteur, prive)
        res.end(JSON.stringify(listTmp));
    } else if (req.url.startsWith('/requeteUser')){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            //console.log('serveur => ' + parse(body));
            console.log(body);
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
                nbRecettes++;
            });
            console.log('serveur => nombre de recetes : ' + nbRecettes);
        }
    });
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
  });


//=====================================================
//
//      function getListRecettes
//
//=====================================================
function getListRecettes(debut, nb, auteur, prive){
    var liste = []
    let index = 0;
    let cpt=0
    console.log("server => lecture de " + nb + " recettes a partir de " + debut)
    for (let i = 0 ; i <  nb ; i++){
        let idx = Number(i) + Number(debut);
        console.log("lecture recette " + idx)
        item = recettes[idx]
        if (!item){
            break
        }
        if (auteur == null || (prive && auteur == item.nom)){
            liste.push(item)
            console.log("ajout recette " + idx + " : " + item.titre)
        }
    }
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
