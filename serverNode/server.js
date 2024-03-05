const http = require('node:http')
const url=require("url")
const fs=require("fs")

const hostname = 'localhost';
const port = 3000;
var idRecette;
var nbRecettes = 0;
var recettes=[];

const server = http.createServer((req, res) => {
    //console.log('requete = ' + req.url);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    if (req.url === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello Popote\n');
    } else if (req.url.startsWith('/getRecette')){
        idRecette = url.parse(req.url,true).query.index 
        let maRecette = recettes[idRecette];
        res.setHeader('Content-Type', 'text/json');
        console.log('requete getRecette ' + idRecette);
        console.log(maRecette);
        res.end(JSON.stringify(maRecette));
    } else if (req.url.startsWith('/getNbRecettes')){
        console.log('requete getNbRecettes ');
        res.setHeader('Content-Type', 'text/json');
        const stuff ={
            "nbRecettes": nbRecettes,
        };
        res.end(JSON.stringify(stuff));
    } else {
        res.end('page not found')
    }   
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    fs.readFile("recettes.json","utf-8",(err,data)=>{
        if(err){
            const stuff ={
                titre: 'impossible de lire le fichier de recettes',
                description: 'Sans objet',
            };
            recettes = JSON.stringify(stuff);
            //res.end(jsonContent);
        } else {
            console.log('lecture du fichier contenant les recettes');
            recettes = JSON.parse(data);
            nbRecettes = 0;
            recettes.forEach ((item) =>{
                nbRecettes++;
            });
            console.log('nombre de recetes : ' + nbRecettes);
        }
    });
  });