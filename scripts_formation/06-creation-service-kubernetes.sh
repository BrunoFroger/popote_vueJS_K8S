#!/bin/bash

#Vérification argument
if [ $# -ne 2 ]; then
 echo "Le nombre d'argument est invalide : $#"
 echo "Commande attendue : ./$0 prénom numéro"
 echo "Déploiement [NOK]"
 exit
fi

# Création du fichier declaratif pour le service
nomService="service-"$1
nomDeployment="deployment-"$1
mkdir -p tp/
cd tp/
cat > "service.yaml" <<EOF
apiVersion: v1
kind: Service
metadata:
  namespace: namespace-$1
  name: $nomService
spec:
  type: NodePort
  selector:
    app: $nomDeployment
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: $2
EOF

# Application du service
kubectl apply -f service.yaml

echo "Déploiement [OK]"
cd - > /dev/null
