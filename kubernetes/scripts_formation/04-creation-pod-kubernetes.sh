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

# Création du fichier declaratif pour le pod
nomContaineur="containeur-nginx"$1
nomPod="pod-"$1
mkdir -p tp/
cd tp/
cat > "pods.yaml" <<EOF
apiVersion: v1
kind: Pod
metadata:
  namespace: namespace-$1
  name: $nomPod
spec:
  containers:
  - name: $nomPod
    image: $nomContaineur
    ports:
    - containerPort: 80
  imagePullSecrets:
  - name: myregistrykey
EOF

# Déploiement du Pod
kubectl apply -f pods.yaml
echo "Déploiement [OK]"

cd - > /dev/null

