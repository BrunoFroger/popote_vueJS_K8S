#!/bin/bash

#Registry
#registry="192.168.59.1:9001/repository/formation/"

#Vérification argument
if [ $# -ne 1 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./$0 prénom"
 echo "Déploiement [NOK]"
 exit
fi

# Création du namespace
nomNamespace="namespace-"$1

# creation du namespace
kubectl create namespace $nomNamespace
echo "Création namespace [OK]"

#cd - > /dev/null

