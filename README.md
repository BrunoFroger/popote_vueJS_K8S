# Popote en VUE JS sur Kubernetes
Ce projet décrit le mode opératoire du développement en VueJS et du déploiement de l'application popote (serveur de recettes de cuisine) sur une architecture Kubernetes en utilisant Docker pour la production des conteneur.  
Un serveur NodeJS (avec données locales) est proposé dans des fin de tests des dev VueJS


Voici une vue de l'architecture choisie

![architecture](architecture_popote.pdf)

# 1. Installation

Pour procéder à cette installation, il est nécessaire de disposer des éléments suivants :  
- 1 ou plusieurs machines capables d'exécuter Linux  
- 1 connexion à internet (via une routeur de type Livebox par exemple)  
- 1 switch, pour connecter entre elles toutes les machines et les raccorder au routeur d'accès a internet  

## 1.1 Installation de Linux 

Télécharger [ici](https://www.ubuntu-fr.org/download/) la dernière version de Linux (ici exemple avec Ubuntu)

Suivre ensuite les recommandations proposées pour installer l'OS sur votre machine :  
- flasher clé USB avec la distribution ; doc [ici](https://doc.ubuntu-fr.org/live_usb)  
- brancher la machine cible sur le secteur  
- raccorder 1 câble réseau sur le switch  
- sélectionner boot sur clé USB dans le setup de la machine au démarrage  
- démarrer ou redémarrer  
- lancer l'installation  

paramètres à renseigner pour l'installation de linux :  

- sélectionner la langue (français)  
- sélectionner installer Ubuntu  
- valider clavier français (continuer)  
- pas de connexion réseau sans fil  
- mise à jour et autres logiciels : sélectionner installation minimale, avec téléchargement des mise à jour en cours d'installation  
- si une autre version était déjà installée la remplacer par la nouvelle  
- si demande changement sur les disques, valider  
- valider fuseau horaire sur Paris  
- renseignement "qui êtes-vous"
	- nom : exemple Bruno  
    - nom ordinateur : exemple machineXX (XX numéro de la machine)  
    - nom utilisateur : exemple bruno  
    - password : exemple K8S&machineXX  (XX numéro de la machine)
- Lors du message installation terminée, retirer la clé USB et lancer le redémarrage.

**Post installation :**

La suite de ces opérations sont a faire sur la ou les machines du cluster.  
Certains utilitaires sont a installer pour pouvoir utiliser les commandes de manipulation réseau : 

- ifconfig : ``sudo apt install net-tools``
- curl : ``sudo apt install curl``
- server ssh : ``sudo apt install openssh-server``
- optionnel Mobaxterm : 
	- sur Windows, [télécharger](https://mobaxterm.mobatek.net/download-home-edition.html) et installer Mobaxterm nativement
	- sur Mac ou Linux, cette application Windows nécessite l'installation de [wine](https://www.winehq.org/) ``sudo apt install wine`` puis copier le téléchargement de l'application [mobaxterm.exe](https://mobaxterm.mobatek.net/download-home-edition.html) localement sur la machine ; vous pourrez alors lancer son exécution avec la commande ``wine mobaxterm.exe``

Suite à toutes ces manipulations, le système proposera sans doute des mises à jour, il faut les accepter, et si un redémarrage est demandé l'accepter aussi.

## 1.2 Installation de Kubernetes (pas encore validé, passer a Docker dans un premier temps)

Pour l'installation de Kubernetes ; 2 possibilités (Minikube ou standard)

### 1.2.1 Minikube (configuration simplifiée) (/!\ à valider)
Pour l'installation et la configuration de Minikube se référer a la documentation en ligne [ici](https://minikube.sigs.k8s.io/docs/)  
Ci-dessous les commandes pour une installation de minikube sur Linux :
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Vérification que Minikube est bien installé : ``minikube start`` aucun message d'erreur ne doit s'afficher

### 1.2.2 Installation standard

#### 1.2.2.1 Installation de Docker Engine
Voir la documentation d'installation [ici](https://docs.docker.com/engine/install/#server)

Par sécurité, il faut commencer par désintaller une éventuelle installation précédente.

``` for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done```

**Installation**

Setup docker's apt repository

```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

**Installation de Docker**

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

**Verification de l'installation**

```
sudo docker run hello-world
```

Verifier qu'un message de confirmation apparait, si OK, vous pouvez quitter



**autoriser execution de docker par user non root**

```
sudo groupadd -f docker
sudo chown root:docker /var/run/docker.sock
sudo usermod -a -G docker "$(whoami)"
newgrp docker
sudo systemctl restart docker
```

#### 1.2.2.2 Installation de cri-dockerd
aller sur le site [cri-dockerd](https://github.com/Mirantis/cri-dockerd?tab=readme-ov-file) puis allez sur la page repertoriant les différentes releases disponible, cherchez celle correpondant a votre machine ; ici [ubuntu-jammy_amd64](https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.13/cri-dockerd_0.3.13.3-0.ubuntu-jammy_amd64.deb) ; téléchargez le et installez le ``sudo dpkg -i cri-dockerd_0.3.13.3-0.ubuntu-jammy_amd64.deb``.

Activation de cri-dockerd : ``sudo systemctl enable cri-docker.service``


#### 1.2.2.3 Installation de kubadm (a revoir plus tard)
voir sur le site [kubernetes](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo chmod 644 /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo chmod 644 /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

```
Afin de vérifier que tous les packages soient à jour, faire un update / upgrade de votre système

```
sudo apt-get update
sudo apt-get upgrade
```


#### 1.2.2.4 Création d'un cluster (a valider)
**Pré-requis**

Initialiser le cri-endpoint !!! TODO procédure à trouver  
Pour que kubectl fonctionne pour un utilisateur non root, exécutez ces commandes

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
**Création**

Vous pouvez ensuite créer votre cluster  
```
kubeadm init
```

## 1.3 Installation de Vue JS (si utilisation en local)
`` npm install -g @vue/cli ``

## 1.4 configuration de la livebox (TODO a valider)
Pour permettre d'accéder a votre application depuis internet, vous devez configurer votre livebox pour authoriser les flux entrant vers votre ordinateur hébergeant votre application

- Se connecter sur votre livebox en mode administrateur
- Aller dans l'onglet "configuration avancée"
- Dans "dhcp" forcer l'ip fixe pour la machine qui sert de point d'entrée à l'application Popote
- Dans l'onglet DynDNS créer un service DNS dynamique en utilisant un des fournisseurs proposés (No-Ip avec domaine zapto.org pour l'exemple), aller ensuite sur le site de ce fournisseur pour créer l'entrée DNS correspondant à votre livebox
- configurer l'accès à votre serveur en http et en ssh, via l'onglet NAT/PAT  :
	- pour ssh : ajouter une entrèe permettant de router les accès entre le port externe et interne de votre livebox, le port interne est le port 22 (port par defaut de ssh) vous pouvez specifier n'importe quel port en externe, sauf que dans ce cas vous devrez le specifier lorsque que vous chercher a vous connecter sur votre machine depuis l'extérieur (vous pouvez prévoir de faire un échange de clé ssh pour ne plus avoir à taper le mot de passe) (en version de prod, il faut eviter d'ouvrir un port shh)
	- Pour HTTP : vous devez ouvrir le port 80 (externe) vers le port 8080 (interne)  

voici un exemple de commande permettant de se connecter en ssh depuis une machine distante :
``ssh -p xxx bruno@popote.zapto.org`` ou xxx est le numéro de port que vous avez configuré ci-dessus


## 1.5 Configuration mode sécurisé https (pas encore géré)

Afin de sécuriser les accès a ce site, il est possible d'utiliser le protocole https, pour cela il faut suivre le mode opératoire suivant sur le site it-connect pour utiliser certbot qui effectue les demandes de certificat Let's Encrypt ; voir les différents tuto sur le sujet :

- [it-connect](https://www.it-connect.fr/nginx-ajouter-un-certificat-ssl-lets-encrypt-pour-passer-en-https/) 
- [angristan](https://angristan.fr/configurer-https-nginx/)
- [webhi](https://www.webhi.com/how-to/fr/comment-installer-un-certificat-ssl-sur-un-serveur-nginx/)

Pour générer le certificat ssl, vous devez localement sur la machine hote, lancer les commandes suivantes :

```
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

sudo certbot --nginx -d popote.zapto.org
```

Pour verifier la date d'expiration de votre certifcat : tapez la commande suivante (en root) : ``certbot certificates``

Pour verifier que votre certificat est bien actif et qu'il est reactualisable (simulation renouvellement) : ``certbot renew --dry-run`` 

Pour renouveller votre certificat (si ce n'est pas fait par un cron) : ``certbot renew`` 

ajouter ensuite au dockerfile les lignes suivantes :

```
```


# 2. Développements

## 2.1 Installer conteneur Ngnix

pour utiliser nginx (en mode proxy) dans votre environnement docker, voici les fichiers a installer dans un repertoire nginx de votre application :

nginx.conf : gere la configuration (comportement) de votre proxy nginx en httpsmode http (non securisé)

```
server {
    listen 8080;

    location /api {
        proxy_pass http://popote_backend:3000;
    }

    location / {
        proxy_pass http://popote_frontend:8080;
    }
}
```

dockerfile : permet de générer le conteneur nginx dans votre environnement.

```
# Use the lightweight Nginx image from the previous stage for the nginx container
FROM nginx:stable-alpine
# Copy the nginx configuration file
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port 80
EXPOSE 8080
# Start Nginx to serve the application
CMD ["nginx", "-g", "daemon off;"]
```

en version securisé (acces en https) voici les fichiers de configuration :

a definir nginx.conf et dockerfile

## 2.2 Installer conteneur MariaDB

Créer un fichier **Dockerfile** avec le modèle suivant  :

```
# Pull the mariadb latest image
FROM mariadb:latest

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       MARIADB           |"; \
    echo "|                         |"; \
    echo "==========================="
RUN apt-get update

#install optionnels
RUN apt-get install -y net-tools
RUN apt-get install -y iputils-ping
RUN apt-get install nano
RUN apt-get install -y default-mysql-client

WORKDIR /home/mysql/

RUN echo 'root:root123' | chpasswd

ENV MYSQL_ROOT_PASSWORD root123
ENV MYSQL_DATABASE Popote
ENV MYSQL_USER popote
ENV MYSQL_PASSWORD popote123

COPY mariadb/ /home/mysql/
COPY mariadb/.bashrc /home/mysql/

EXPOSE 3306

RUN chmod +x *bash

RUN chown -R mysql:mysql /home/mysql

RUN cd /home/mysql/

USER mysql

ADD mariadb/create_base.sql /docker-entrypoint-initdb.d

RUN echo $SHELL

#CMD ["mysqld"]
#CMD ["mysqld &", ";", "./docker_cmd.bash"]
#CMD ["./docker_cmd.bash"]
#CMD [ "/bin/sh", "-c", "mysqld &; sleep 10 ; /home/mysql/initDb.bash"]
```

ou tester avec une installation manuelle en local :

Recuperation de l'image mariadb : ``docker pull mariadb``  
Verification de presence de l'image : ``docker images``  
Creation du conteneur : ``docker create mariadb --name mariadb-popote -i –t``  
Execution du conteneur : ``docker run -d --name mariadb-popote -p 3306:3306 -v '/path/on/host/:/var/lib/mysql' -e "MARIADB_ROOT_PASSWORD=" -e "MARIADB_DATABASE=popote" -e "MARIADB_USER=popote" -e "MARIADB_PASSWORD=" mariadb``  
Mise en pause du conteneur : ``docker pause mariadb-popote``  
Arret du conteneur : ``docker stop mariadb-popote``

## 2.3 Installer conteneur NodeJS (backend popote)

Créer un fichier **Dockerfile** avec le modèle suivant  :

```
# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=18.0.0

FROM node:current-bullseye

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       BACKEND           |"; \
    echo "|                         |"; \
    echo "==========================="

RUN apt-get update 

#install optionnels
RUN apt-get install -y net-tools
RUN apt-get install -y default-mysql-client
RUN apt-get install -y iputils-ping

RUN echo 'root:root123' | chpasswd

ENV NODE_ENV production

WORKDIR /app

# copie files
COPY serverNode/ ./

RUN npm install mysql

RUN npm install

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# execute fichier bash de post traitement (lancement des applications et demons)
CMD src/docker_cmd.bash
```

Construire le conteneur (utilisation locale, sinon il sera lancé par docker compose, voir plus loin): 

``docker build -q -t popote_backend .``

Executer le conteneur : 

``docker run --rm -it --name=popote_backend -p 3000:3000 -p 2222:22 docker_popote``

Construire et exécuter le conteneur : 

``docker run --rm -it --name=popote_backend -p 3000:3000 -p 2222:22 $(docker build -q .)``

pour se connecter sur le conteneur 2 solutions :

``docker exec -it popote_backend /bin/bash`` 

``ssh root@127.0.0.1:2222` à valider (ne fonctionne pas avec le dockerfile actuel)

##2.4 Installer conteneur VueJS (frontend popote)

## 2.5 développement application Web Popote (frontend)

Le développement du projet popote en vue JS est disponible [ici](https://github.com/BrunoFroger/popote_vueJS_K8S) sur github.  
Vous pouvez utiliser [Visual studio code](https://code.visualstudio.com/download) pour faire les développements.  
Sur la machine de développement initialiser le repertoire de développement via git :  

```
mkdir projets
cd projets
git clone git@github.com:BrunoFroger/popote-vueJS_K8S
```

### 2.5.1 Creation du projet Vue
`` vue create popote ``   
En choisissant le mode manuel

### 2.5.2 Développement de l'application Popote
Le projet popote repose actuellement sur un frontend en Vue JS et un backend (provisoire) en NodeJS ; les développements ont été fait en utilisant l'environnement Visual Studio Code comme IDE  
Les dev du frontend sont dans le repertoire popote  
Les dev du backend sont dans le repertoire serverNode


# 3. Execution locale

## 3.1 Execution projet Vue en local
Dans le répertoire popote : ``npm start``  
Dans le répertoire serverNode : ``node server.js``  
La visualisation du rendu se fait en se connectant en local sur [http://localhost:8080](http://localhost:8080)

## 3.1 Création d'un build de production
``npm run build``

# 4. Execution dans Docker

## 4.1 Projet Vue (frontend)

Créer un fichier **Dockerfile** avec le modèle suivant  :

```
FROM node:lts-alpine

RUN echo "==========================="; \
    echo "|                         |"; \
    echo "|       FRONTEND          |"; \
    echo "|                         |"; \
    echo "==========================="

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server 
#RUN npm install --save-dev webpack
RUN npm install -g webpack

# définit le dossier 'app' comme dossier de travail
WORKDIR /app

# copie 'package.json' et 'package-lock.json' (si disponible)
COPY ./package*.json ./
COPY ./webpack.config.js ./

# installe les dépendances du projet
RUN npm install

# copie les fichiers et dossiers du projet dans le dossier de travail (par exemple : le dossier 'app')
COPY ./src ./src

# construit l'app pour la production en la minifiant
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
```

construire et executer le conteneur : 

``docker run --rm -it --name=popote_frontend $(docker build -q .)``


Tester le en accédant avec votre browser web à l'adresse [http://localhost:8080](http://localhost:8080)

# 7. regroupement des conteneurs avec docker compose

Afin de simplifier les déploment et l'exploitation de votre application, vous pouvez utiliser docker compose qui regroupera l'ensemble de cos contenaeurs (mariadb, backend, frontend et proxy) dans un groupe de conteneur que vous pourrer exploiter avec des commandes groupées :

voici un exemple de fichier docker-compose.yaml permettant de générer automatique l'ensemble de vos conteneurs (il faut que les ficheirs dockerfile de chacun de vos conteneurs existent et soit validés)


```
#version: '3.5'
#name: 'popote'

# Services
services:

  # base de donnee Service :
  mariadb:
    container_name: popote_mariadb
    restart: on-failure
    build: 
      context: .
      dockerfile: mariadb/dockerfile
    ports:
      - 3306:3306
    networks:
      - popote_network

  # backend Service : serveur node
  backend:
    container_name: popote_backend
    restart: on-failure
    build: 
      context: .
      dockerfile: serverNode/Dockerfile
    #ports:
      #- 3000:3000
    depends_on:
      - mariadb
    networks:
      - popote_network

  # frontend Service : VueJS
  frontend:
    container_name: popote_frontend
    restart: on-failure
    build: 
      context: .
      dockerfile: popote/Dockerfile
    #ports:
      #- 8080:8080
    depends_on:
      - backend
    networks:
      - popote_network

  nginx:
    container_name: popote_nginx
    restart: on-failure
    build: 
      context: .
      dockerfile: nginx/Dockerfile
    #volumes:
      #- ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - 8080:8080 
    depends_on:
      - frontend
      - backend
    networks:
      - popote_network

# configuration reseau
networks:
  popote_network:
    driver: bridge

```

vous disposer d'un certain nombre de commandes pour gerer ce groupe de conteneurs :

``docker compose up --build`` pour contruire votre groupe de conteneurs (ajouter option -d pour le lancer en mode demon)

``docker compose stop`` pour arreter votre groupe de conteneurs

``docker compose start`` pour demarrer votre groupe de conteneurs


# 9. Informations diverses

## 91. Déploiement automatique avec github

voir doc sur [gitHub](https://docs.github.com/fr/actions/deployment/about-deployments/about-continuous-deployment)

Crer le fichier de déploiement .github/

### 91.installation d'un self-hosted runner sur la machine cible

les opérations suivantes sont a réaliser sur la machine cible (hebergeant votre application)

```
# Create a folder
$ mkdir actions-runner && cd actions-runner
Copied!
# Download the latest runner package
$ curl -o actions-runner-linux-x64-2.317.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.317.0/actions-runner-linux-x64-2.317.0.tar.gz
Copied!
# Optional: Validate the hash
$ echo "9e883d210df8c6028aff475475a457d380353f9d01877d51cc01a17b2a91161d  actions-runner-linux-x64-2.317.0.tar.gz" | shasum -a 256 -c
# Extract the installer
$ tar xzf ./actions-runner-linux-x64-2.317.0.tar.gz

```

Configure

```
# Create the runner and start the configuration experience
$ ./config.sh --url https://github.com/BrunoFroger/popote_vueJS_K8S --token AFZAAFIQRY54XGM5KU6TEYLGOFASQ
# Last step, run it!
$ ./run.sh
```

Au lieu de lancer le runner manuellement avec ``./run.sh`` , vous pouvez automatiser son lancement automatique avec la commande suivante (a ne faire qu'une seule fois) :

```
sudo ./svc.sh install && sudo ./svc.sh start
```

Pour utiliser ce runner dans votre projet, il faut configurer votre projet pour gerer le déploiement automatique

Pour pouvoir executer plusieurs jobs en simultané, il faut avoir plusieurs runner sur la machine cible, en creant un deuxieme repertoire actions-runner-2 par exemple, et en executant une nouvelle fois la commande ``./config ...`` en donnant comme nom a ce runner un nom different du runner principal ex machine02-2 puis relancer les commandes ``./svc.sh ...``


Exemple de fichier de déploiement (à localiser dans le répertoire .github/workflow de votre application)

```
# fichier de deploiement github pour l'application popote
# (c) B. Froger (2024)-> now

name: Deployment_popote

on:
  push:
    branches:
      - main

jobs:
  stop:
    runs-on: self-hosted
    steps: 
      - name: stop containers (docker compose stop)
        run: |
          cd /home/bruno/popote_vueJS_K8S
          docker compose stop

  update-code:
    runs-on: self-hosted
    steps: 
      - name: update software (git pull)
        run: |
          cd /home/bruno/popote_vueJS_K8S
          git pull origin main

  restart:
    needs: [update-code, stop]
    runs-on: self-hosted
    steps: 
      - name: restart containers (docker compose up -d --build)
        run: |
          cd /home/bruno/popote_vueJS_K8S
          docker compose up -d --build

  MAJ-BDD:
    needs: restart
    runs-on: self-hosted
    steps:
      - name: rechargeent de la base de données
        run: |
          docker exec popote_mariadb ./initDb.bash

```


# 95. Quelques commandes Docker usuelles

## Construction d'un container

``docker build [options] path`` : construit un container en fonction du dockerfile dans le répertoire path

Principales options :

- -t nomImage : génère une image nommée
- -q : quiet mode (mode silencieux ; pas de log de la construction)

## Execution d'un container

``docker run [options] IMAGE [commande] [ARGS]``

Principales options :

- -d : execute la commande en arrière plan
- --rm : détruit le container après l'execution
- -it : ouvre un pseudo tty pour visualiser le stdout du container
- -p portHost:portContainer : mapping d'un port sur machine hôte vers port du container (ce paramètre peut être répété)
- --name nom : nom du container

Combinaison build + run : ``docker run [options] $(docker build -q .)``

## Manipulation des container :
``docker ps -a`` : liste des container

``docker exec -it nomContainer /bin/bash`` : lancement d'un shel sur le container 

# 96 Commandes docker compose

``docker compose up --build`` : construit et execute le contenu du fichier docker-compose.yml en local

``docker compose exec <nom du service> /bin/bash`` : lance un shel dans le conteneur défini par le service du docker-compose

# 97 Commande mysql

pour accéder a une base distante, voici un exemple de commande :

``mysql -h mariadb -u popote -ppopote123 -D Popote -e "select count(*) from Recettes"``

Explication des paramètres :

	-h <machine> : nom ou adresse IP de la machine hôte hébergeant la base de données
	-u <user> : nom de l'utilisateur dans la base de données
	-p<passwd> : mot de passe du user ci dessus dans la base de données
	-D <base> : nom de la base de données
	-e <requête> : execute la requête SQL 
	
Pour visualiser les données de votre BDD vous pouvez installer [DbVisualizer](www.dbvis.com)


# 99. Quelques commandes Kubernetes usuelles 
``kubectl version`` : affiche version de kubernetes  
``kubectl config view`` : affiche la configuration  
``kubectl config use-context <nom du context>`` : ???  
``kubectl config current-context`` : ???  
``kubectl get ns`` : ???
