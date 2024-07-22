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
    console.log('server_avec_mariadb.js => requete = ' + req.url);
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    //res.setHeader('Access-Control-Allow-Origin', 'http://popote_frontend:8080');
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Header', 'content-type');

    console.log("serveur => url = " + req.url);
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Hello Popote\n');

    } else if (req.url.includes('/getRecette')){
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
            JOIN Ingredients I ON I.idRecette = R.numRecette\
            WHERE R.id = "' + idRecette + '"'
        execRequete(sql, callback_getRecettes, res)
        //console.log('serveur => requete getRecette ' + idRecette);
        //console.log('serveur => ' + JSON.stringify(maRecette));
        // res.end(JSON.stringify(maRecette));

    } else if (req.url.includes('/getNbRecettes')){
        //console.log('requete getNbRecettes ');
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT MAX (numRecette) FROM Recettes'
        execRequete(sql, callback_getNbRecettes, res)

    } else if (req.url.includes('/getNbUsers')){
        //console.log('requete getNbUsers ');
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT COUNT (*) FROM Users'
        execRequete(sql, callback_getNbUsers, res)

    } else if (req.url.includes('/getTypesRecettes')){
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT * FROM TypePlats'
        execRequete(sql, callback_getTypesRecettes, res)

    } else if (req.url.includes('/updateDatas')){
        //console.log('requete updateDatas ');
        updateDatas();
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end("OK");

    } else if (req.url.includes('/getAllUsers')){
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        var sql = 'SELECT * FROM Users'
        execRequete(sql, callback_getAllUsers, res)

    } else if (req.url.includes('/getAllRecettes')){
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        var sql = 'SELECT * FROM Recettes'
        execRequete(sql, callback_getAllRecettes, res)

    }  else if (req.url.includes('/creeRecette')){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            let tmpRecette = JSON.parse(body)
            tmpRecette.numRecette = this.nbRecettes + 1
            console.log("server_avec_mariadb => requete creeRecette : tmpRecette = " + JSON.stringify(tmpRecette))
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            var sql = 'INSERT INTO Recettes (type, numRecette, titre, description, auteur, realisation) \
                VALUES (' + tmpRecette.type + ',\"' + tmpRecette.numRecette + ',\"' + tmpRecette.titre + '\",\"'
                + tmpRecette.description + '\",' + tmpRecette.auteur +',\"' + tmpRecette.realisation +'\")'
            execRequete(sql, callback_creeRecette, res)
        })

    } else if (req.url.includes('/getListeRecettes')){
        //console.log('serveur => requete getListeRecettes ');
        var selectAuteur = ''
        var selectType = ''
        debut = url.parse(req.url,true).query.index
        nb = url.parse(req.url,true).query.nb
        auteur = url.parse(req.url,true).query.user
        prive = url.parse(req.url,true).query.prive
        if ((auteur != 'null') && (prive != 'false')) selectAuteur = " AND U.nom = '" + auteur + "' "
        console.log("auteur = <" + auteur + "> : prive = <" + prive +">")
        typeRecette = url.parse(req.url,true).query.type
        console.log("type de recette demandée : " + typeRecette)
        if (typeRecette != 'Tout') selectType = " AND T.nom = '" + typeRecette + "' "
        res.setHeader('Content-Type', 'text/json; charset=utf-8');
        var sql = 'SELECT R.id, R.numRecette, titre, description, \
            coalesce(U.nom, R.auteur) as auteur, \
            coalesce(T.nom, R.type) as type \
            FROM Recettes R \
            INNER JOIN Users U ON R.auteur = U.id ' + selectAuteur + ' \
            INNER JOIN TypePlats T ON R.type = T.id ' + selectType + ' \
            ORDER BY R.id \
            LIMIT ' + nb + '\
            OFFSET ' + debut
        //  if (prive === "true")
        //      sql += ' WHERE U.nom = ' + auteur
        sql += ';'
        execRequete(sql, callback_getListeRecettes, res)
        // listTmp = getListRecettes(debut, nb, auteur, prive, typeRecette)

    } else if (req.url.includes('/requeteSql')){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            //console.log('serveur => ' + parse(body));
            console.log(body);
            let sql = JSON.parse(body).requete
            //console.log('requete requeteSql ');
            res.setHeader('Content-Type', 'text/json; charset=utf-8');
            execRequete(sql, callback_requeteSql, res)
        });
    } else if (req.url.includes('/requeteUser')){
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
                var sql = 'SELECT nom, numero, email, idRole FROM Users \
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
            } else if (typeRequette === "creation"){
                //console.log("serveur => traitement de la requete " + typeRequette)
                var sql = 'INSERT IGNORE INTO Users (nom, pwd, email, idRole) VALUES \
                    ("' + user.user + '", "' + user.pwd + '", "' + user.email + '", 1)' 
                execRequete(sql, callback_addUser,res)
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
    console.log("execRequete => " + requeteSql)

    //console.log("execRequete => tentative de connexion ......")
    db.query(requeteSql, (err, result) => {
        if (err) {
            res.end(err)
            throw err;
        } else {
            resultat=JSON.stringify(result)
            //console.log("execRequete => requete : OK => resultat = ", resultat);
            callback(resultat, res)
        }
    });
    
    //console.log("execRequete => fin")
}

//=====================================================
//
//      function callback_checkUser
//
//=====================================================
function callback_checkUser(result, res){
    //console.log("callback_checkUser => debut")
    //console.log("callback_checkUser => parametre passe (result) = ", result)
    var stuff
    if (result == undefined){
        stuff ={
            status: 'KO',
            message: 'Utilisateur inconnu ou mauvais mot de passe',
        };
    } else {
        var resultat = JSON.parse(result)[0]
        //console.log("callback_checkUser => resultat = ", JSON.stringify(resultat))
        stuff = {
            status: 'OK',
            message: 'Utilisateur connecte',
            user: resultat,
        }
    }
    //console.log("callback_checkUser => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    //console.log("callback_checkUser => fin")
}

//=====================================================
//
//      function callback_creeRecette
//
//=====================================================
function callback_creeRecette(result, res){
    console.log("callback_creeRecette => debut")
    console.log("callback_creeRecette => parametre passe (result) = ", result)
    var stuff
    if (result == undefined){
        stuff ={
            status: 'KO',
            message: 'Impossible de sauvegarder cette recette',
        };
    } else {
        var resultat = JSON.parse(result)[0]
        console.log("callback_creeRecette => resultat = ", JSON.stringify(resultat))
        stuff = {
            status: 'OK',
            message: 'Recette sauvegardee',
            recette: resultat,
        }
    }
    console.log("callback_creeRecette => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    //console.log("callback_creeRecette => fin")
}

//=====================================================
//
//      function callback_addUser
//
//=====================================================
function callback_addUser(result, res){
    //console.log("callback_addUser => debut")
    console.log("callback_addUser => parametre passe (result) = ", result)
    var stuff
    if (result == undefined){
        stuff ={
            status: 'KO',
            message: 'Impossible de creer l\'utilisateur',
        };
    } else {
        var resultat = JSON.parse(result)[0]
        //console.log("callback_addUser => resultat = ", JSON.stringify(resultat))
        stuff = {
            status: 'OK',
            message: 'Utilisateur créé',
            //user: resultat,
        }
    }
    console.log("callback_addUser => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    //console.log("callback_addUser => fin")
}

//=====================================================
//
//      function callback_getNbUsers
//
//=====================================================
function callback_getNbUsers(result, res){
    //console.log("callback_getNbUsers => debut")
    //console.log("callback_getNbUsers => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)[0]
    //console.log("callback_getNbUsers => resultat getNbRecettes = ", resultat)
    var valNbUsers = resultat["COUNT (*)"]
    console.log("callback_getNbUsers => nbUsers = " + valNbUsers)
    const stuff ={
        nbUsers: valNbUsers,
    };
    //console.log("callback_getNbUsers => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    //console.log("callback_getNbUsers => fin")
}

//=====================================================
//
//      function callback_getNbRecettes
//
//=====================================================
function callback_getNbRecettes(result, res){
    //console.log("callback_getNbRecettes => debut")
    //console.log("callback_getNbRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)[0]
    console.log("callback_getNbRecettes => resultat getNbRecettes = ", resultat)
    var nbRecettes = resultat["MAX (numRecette)"]
    console.log("callback_getNbRecettes => nbRecettes = " + nbRecettes)
    const stuff ={
        nbRecettes: nbRecettes,
    };
    this.nbRecettes = nbRecettes
    //console.log("callback_getNbRecettes => " + JSON.stringify(stuff))
    res.end(JSON.stringify(stuff))
    //console.log("callback_getNbRecettes => fin")
}

//=====================================================
//
//      function callback_getListeRecettes
//
//=====================================================
function callback_getListeRecettes(result, res){
    //console.log("callback_getListeRecettes => debut")
    //console.log("callback_getListeRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)
    console.log("callback_getListeRecettes => resultat listRecettes = ", resultat)
    res.end(JSON.stringify(resultat))
    console.log("callback_getListeRecettes => fin")
}

//=====================================================
//
//      function callback_requeteSql
//
//=====================================================
function callback_requeteSql(result, res){
    var resultat = JSON.parse(result)
    res.end(JSON.stringify(resultat))
    console.log("callback_requeteSql => fin")
}

//=====================================================
//
//      function callback_getAllUsers
//
//=====================================================
function callback_getAllUsers(result, res){
    var resultat = JSON.parse(result)
    res.end(JSON.stringify(resultat))
    console.log("callback_getAllUsers => fin")
}

//=====================================================
//
//      function callback_getAllRecettes
//
//=====================================================
function callback_getAllRecettes(result, res){
    var resultat = JSON.parse(result)
    res.end(JSON.stringify(resultat))
    console.log("callback_getAllRecettes => fin")
}

//=====================================================
//
//      function callback_getTypesRecettes
//
//=====================================================
function callback_getTypesRecettes(result, res){
    //console.log("callback_getTypesRecettes => debut")
    //console.log("callback_getTypesRecettes => parametre passe (result) = ", result)
    var resultat = JSON.parse(result)
    //console.log("callback_getTypesRecettes => resultat typesRecettes = ", resultat)
    res.end(JSON.stringify(resultat))
    console.log("callback_getTypesRecettes => fin")
}

//=====================================================
//
//      function callback_getRecettes
//
//=====================================================
function callback_getRecettes(result, res){
    //console.log("callback_getRecettes => debut")
    //console.log("callback_getRecettes => parametre passe (result) = ", result)
    let recette = JSON.parse(result)[0]
    //console.log("\ncallback_getRecettes => resultat recettes = ", recette)
    recette.ingredient = null
    delete recette["ingredient"]
    recette["quantite"] = null
    delete recette["quantite"]
    recette["unite"] = null
    delete recette["unite"]
    //console.log("\ncallback_getRecettes => resultat recettes sans ingredient = ", JSON.stringify(recette))
    var listeIngredients = []
    JSON.parse(result).forEach(element => {
        var ingredient = {
            nom: element.ingredient,
            quantite: element.quantite,
            unite: element.unite
        }
        listeIngredients.push(ingredient)
    });
    //console.log("Boucle de recuperation des ingredients => fin")
    //console.log("\ncallback_getRecettes => liste des ingredients = " + JSON.stringify(listeIngredients))
    recette.ingredients = listeIngredients
    console.log("\ncallback_getRecettes => recette avec ingredients : " + JSON.stringify(recette))
    res.end(JSON.stringify(recette))
    console.log("\ncallback_getRecettes => fin")
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
