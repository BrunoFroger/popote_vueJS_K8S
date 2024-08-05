#!/bin/bash

#Vérification argument
if [ $# -ne 1 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./$0 <namespace>" 
 exit
fi

kubectl config set-context --current --namespace=$1