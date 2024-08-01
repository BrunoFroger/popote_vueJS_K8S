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

# Création du fichier declaratif pour le demployment
nomContaineur="containeur-nginx"$1
nomDeployment="deployment-"$1
mkdir -p tp/
cd tp/
cat > "deployment.yaml" <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: namespace-$1
  name: $nomDeployment
  labels:
    app: $nomDeployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: $nomDeployment
  template:
    metadata:
      labels:
        app: $nomDeployment
    spec:
      containers:
      - name: $nomDeployment
        image: $nomContaineur
        ports:
        - containerPort: 80
      imagePullSecrets:
        - name: myregistrykey
EOF

# Déploiement du Deployement
kubectl apply -f deployment.yaml

echo "Déploiement [OK]"
cd - > /dev/null
