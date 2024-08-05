#!/bin/bash

#Vérification argument
if [ $# -ne 1 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./$0 prénom" 
 echo "Déploiement [NOK]"
 exit
fi

# Création du fichier declaratif pour l'ingress
nomService="service"$1
nomIngress="ingress"$1
mkdir -p tp/kubernetes-$1
cd tp/kubernetes-$1
cat > "ingress.yaml" <<EOF
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: namespace-$1
  name: $nomIngress
spec:
  rules:
  - host: $1.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: $nomService
            port:
              number: 80
EOF

# Application de l'ingress
kubectl apply -f ingress.yaml

echo "Déploiement [OK]"
cd - > /dev/null
