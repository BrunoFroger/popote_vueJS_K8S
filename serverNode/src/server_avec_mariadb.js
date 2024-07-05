const http = require('node:http')
const url=require("url")
const fs=require("fs")
const { parse } = require('querystring');
const mysql = require('mysql');

const hostname = '';
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

const db = mysql.createConnection({
    host: "popote_mariadb",
    database: "Popote",
    user: "popote",   
    password: "popote123" 
});


//=====================================================
//
//      http.createServer
//
//=====================================================
const server = http.createServer((req, res) => {
    console.log('requete = ' + req.url);
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Origin', 'http://popote_frontend:8080');
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Header', 'content-type');

    console.log("serveur => url = " + req.url);
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Hello Popote\n');

    } else if (req.url.startsWith('/getRecette')){
        idRecette = url.parse(req.url,true).query.index 
        // let maRecette = recettes[idRecette];
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT R.id, titre, description, realisation, \
            coalesce(U.nom, R.auteur) as auteur, \
            coalesce(T.nom, R.type) as type , \
            I.nom as ingredient, \
            I.quantite, I.unite \
            FROM Recettes R \
            INNER JOIN Users U ON R.auteur = U.id  \
            INNER JOIN TypePlats T ON R.type = T.id \
            JOIN Ingredients I ON I.idRecette = R.id\
            WHERE R.id = "' + idRecette + '"'
        execRequete(sql, callback_getRecettes, res)
        //console.log('serveur => requete getRecette ' + idRecette);
        //console.log('serveur => ' + JSON.stringify(maRecette));
        // res.end(JSON.stringify(maRecette));

    } else if (req.url.startsWith('/getNbRecettes')){
        //console.log('requete getNbRecettes ');
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT COUNT (*) FROM Recettes'
        execRequete(sql, callback_getNbRecettes, res)

    } else if (req.url.startsWith('/getTypesRecettes')){
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT * FROM TypePlats'
        execRequete(sql, callback_getTypesRecettes, res)

    } else if (req.url.startsWith('/updateDatas')){
        //console.log('requete updateDatas ');
        updateDatas();
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end("OK");

    } else if (req.url.startsWith('/getListeRecettes')){
        //console.log('serveur => requete getListeRecettes ');
        var selectAuteur = ''
        var selectType = ''
        debut = url.parse(req.url,true).query.index
        nb = url.parse(req.url,true).query.nb
        auteur = url.parse(req.url,true).query.user
        if (auteur != 'null') selectAuteur = " AND U.nom = '" + auteur + "' "
        prive = url.parse(req.url,true).query.prive
        typeRecette = url.parse(req.url,true).query.type
        console.log("type de recette demandée : " + typeRecette)
        if (typeRecette != 'Tout') selectType = " AND T.nom = '" + typeRecette + "' "
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT R.id, titre, description, \
            coalesce(U.nom, R.auteur) as auteur, \
            coalesce(T.nom, R.type) as type \
            FROM Recettes R \
            INNER JOIN Users U ON R.auteur = U.id ' + selectAuteur + ' \
            INNER JOIN TypePlats T ON R.type = T.id ' + selectType + ' \
            ORDER BY R.id \
            LIMIT ' + nb + '\
            OFFSET ' + debut + '\
            ;'
        execRequete(sql, callback_getListeRecettes, res)
        // listTmp = getListRecettes(debut, nb, auteur, prive, typeRecette)

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
                var sql = 'SELECT nom, email, idRole FROM Users \
                    WHERE nom = "' + user.user + '" \
                    AND pwd = "' + user.pwd + '"'
                execRequete(sql, callback_checkUser,res)
                // let tmp = checkConnect(user)
                //console.log('serveur => valeur retour checkConnect : ' + tmp)
                // stuff.user = tmp
                //console.log("serveur => localStatus=" + localStatus + ", localMessage=" + localMessage + ', user=' + stuff.user)
                //res.end(resultat)
            //} else if (typeRequette === "deconnexion"){
                //console.log("serveur => traitement de la requete " + typeRequette)
            } else {
                console.log("serveur => requete inconnue " + typeRequette)
                stuff.status = 'KO'
                stuff.message = 'requete inconnue'
                res.end(JSON.stringify(stuff));
            }
            // res.setHeader('Content-Type', 'text/json; charset=utf-8');
            // stuff.status = localStatus
            // stuff.message =localMessage
            // //console.log("serveur => reponse envoyée : " + JSON.stringify(stuff))
            // res.end(JSON.stringify(stuff));
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
server.listen(port, () => {
    console.log('Serveur NodeJS pour popote');
    console.log('server address = ' + server.address().address)
    console.log(`serveur => Server running at http://${hostname}:${port}/`);
    //chargeRecettes();
    //chargeUsers()
    db.connect(function(err) {
        if (err) {
            console.log(" /!\\ erreur lors de la tentative de connexion sur base Popote")
            throw err;
        } else {
            console.log("connexion OK")
        }
        console.log("Connecté à la base de données MySQL Popote !");
    });
    
});



//=====================================================
//
//      function execRequete
//
//=====================================================
function execRequete(requeteSql, callback, res){
    var resultat={}
    console.log("execRequete => debut : " + requeteSql)

    console.log("execRequete => tentative de connexion ......")
    db.query(requeteSql, (err, result) => {
        if (err) {
            throw err;
        } else {
            resultat=JSON.stringify(result)
            console.log("execRequete => requete : OK => resultat = ", resultat);
            callback(resultat, res)
        }
    });
    
    console.log("execRequete => fin")
}

//=====================================================
//
//      function callback_checkUser
//
//=====================================================
function callback_checkUser(result, res){
    console.log("callback_checkUser => debut")
    console.log("callback_checkUser => parametre passe (result) = ", result)
    var stuff
    if (result == undefined){
        stuff ={
            status: 'KO',
            message: 'Utilisateur inconnu ou mauvais mot de passe',
        };
    } else {
        var resultat = JSON.parse(result)[0]
        console.log("callback_checkUser => resultat = ", JSON.stringify(resultat))
        stuff = {
            status: 'OK',
            message: 'Utilisateur connecte',
            user: resultat,
        }
    }
    console.log("callback_checkUser => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    console.log("callback_checkUser => fin")
}

//=====================================================
//
//      function callback_getNbRecettes
//
//=====================================================
function callback_getNbRecettes(result, res){
    console.log("callback_getNbRecettes => debut")
    console.log("callback_getNbRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)[0]
    console.log("callback_getNbRecettes => resultat getNbRecettes = ", resultat)
    var nbRecettes = resultat["COUNT (*)"]
    console.log("nbRecettes = " + nbRecettes)
    const stuff ={
        nbRecettes: nbRecettes,
    };
    console.log("callback_getNbRecettes => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    console.log("callback_getNbRecettes => fin")
}

//=====================================================
//
//      function callback_getListeRecettes
//
//=====================================================
function callback_getListeRecettes(result, res){
    console.log("callback_getListeRecettes => debut")
    console.log("callback_getListeRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)
    console.log("callback_getListeRecettes => resultat listRecettes = ", resultat)
    res.end(JSON.stringify(resultat))
    console.log("callback_getListeRecettes => fin")
}

//=====================================================
//
//      function callback_getTypesRecettes
//
//=====================================================
function callback_getTypesRecettes(result, res){
    console.log("callback_getTypesRecettes => debut")
    console.log("callback_getTypesRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)
    console.log("callback_getTypesRecettes => resultat typesRecettes = ", resultat)
    res.end(JSON.stringify(resultat))
    console.log("callback_getTypesRecettes => fin")
}

//=====================================================
//
//      function callback_getRecettes
//
//=====================================================
function callback_getRecettes(result, res){
    console.log("callback_getRecettes => debut")
    console.log("callback_getRecettes => parametre passe (result) = ", result)
    var recette = JSON.parse(result)[0]
    console.log("callback_getRecettes => resultat recettes = ", recette)
    var ingredients = []
    JSON.parse(result).forEach(element => {
        var ingredient = {
            nom: element.ingredient,
            quantite: element.quantite,
            unite: element.unite
        }
        console.log("callback_getRecettes => ingredient detecte = " + JSON.stringify(ingredient))
        ingredients.push(ingredient)
    });
    console.log("callback_getRecettes => liste des ingredients = " + ingredients)
    console.log("callback_getRecettes => liste des ingredients = " + JSON.stringify(ingredients))
    recette.push(JSON.parse(ingredients))
    res.end(JSON.stringify(recette))
    console.log("callback_getRecettes => fin")
}

//=====================================================
//
//      function chargeUsers
//
//=====================================================
function chargeUsers(){
    console.log("Chargement des users")
    nbUsers = 0;
    fs.readFile("src/users.json","utf-8",(err,data)=>{
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
            users.forEach ((item) =>{
                nbUsers++;
            });
        }
        console.log('serveur => nombre de Users : ' + nbUsers);
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
    console.log("Chargement des recettes")
    nbRecettes = 0;
    fs.readFile("src/recettes.json","utf-8",(err,data)=>{
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
            recettes.forEach ((item) =>{
                item.index = nbRecettes;
                nbRecettes++;
            });
        }
        console.log('serveur => nombre de recetes : ' + nbRecettes);
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
    console.log("serveur => checkConnect : user = " + JSON.stringify(user))
    localStatus = 'KO'
    localMessage = 'Utilisateur inconnu'
    // users.forEach((item) =>{
    //     if (item.nom === user.user){
    //         console.log("user " + item.nom + " existe")
    //         if (item.password === user.pwd){
    //             tmpUser = item
    //             localStatus = 'OK'
    //             localMessage = 'connexion OK'
    //             console.log("serveur => passwd ok : ")
    //         } else {
    //             localMessage = 'mauvais mot de passe'
    //             console.log("serveur => mauvais mot de passe")
    //         }
    //         return tmpUser
    //     }
    // });
    console.log("serveur => user non trouvé : " + user.user)
    return tmpUser
  }
