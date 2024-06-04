#!/bin/bash

echo "==========================="
echo "|                         |"
echo "|       FRONTEND          |"
echo "|                         |"
echo "==========================="

#echo root123 | su -c "/etc/init.d/ssh start" 
npm run build
#npm start
npm run