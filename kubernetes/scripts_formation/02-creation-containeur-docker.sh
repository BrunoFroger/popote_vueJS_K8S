#!/bin/bash

#Registry
#registry="192.168.59.1:9001/repository/formation/"

#Vérification argument
if [ $# -ne 2 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./$0 prénom numéroPort" 
 echo "Déploiement du containeur [NOK]"
 exit
fi

# récupration de l'image
nomContaineur="containeur-nginx-"$1
nomDeploiement="deploiement-"$1
#sudo docker pull $registry/$nomContaineur
sudo docker run -d -p $2:80 --name $nomDeploiement $nomContaineur

echo "Déploiement du containeur [OK]"
