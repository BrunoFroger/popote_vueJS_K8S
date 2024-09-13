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
node src/server_avec_mariadb
