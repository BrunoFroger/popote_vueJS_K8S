#!/bin/bash

#Registry
#registry="192.168.59.1:9001/repository/formation"

#Vérification argument
if [ $# -ne 1 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./01-creation-containeur.sh prenom" 
 echo "Création du containeur [NOK]"
 exit
fi

# Création du Dockerfile
mkdir -p tp/containeur-$1
cd tp/containeur-$1
cat > "index.html" <<EOF
<html>
    <body>
        Hello $1 :-)
    </body>
</html>
EOF

# Création de l'index.html
cat > "./Dockerfile" <<EOF
FROM nginx
COPY index.html /usr/share/nginx/html/index.html
EOF

# Compilation de l'image
nomContaineur="nginx"$1
sudo docker build -t $nomContaineur .
echo "Création du containeur [OK]"

# Envoie de l'image sur le registry
#docker tag $nomContaineur $registry/$nomContaineur
#docker push $registry/$nomContaineur

echo "Envoi du containeur sur le registry [OK]"


cd - > /dev/null

