#!/bin/bash

echo "==========================="
echo "|                         |"
echo "|       BACKEND           |"
echo "|                         |"
echo "==========================="

#echo root123 

#echo root123 | su -c "/etc/init.d/ssh start" 
#node src/server
#sleep 1000
echo "Lancement du server node desactivé temporairement"
echo "connectez vous sur le pod et taper la commande : "
echo "<node src/server_avec_mariadb> pour le relancer"
while :
do
    sleep 10
done
# node src/server_avec_mariadb
