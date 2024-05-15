# Popote en VUE JS sur Kubernetes
Ce projet décrit le mode opératoire du développement en VueJS et du déploiement de l'application popote (serveur de recettes de cuisine) sur une architecture Kubernetes en utilisant Docker pour la production des conteneur.  
Un serveur NodeJS (avec données locales) est proposé dans des fin de tests des dev VueJS

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

## 1.2 Installation de Kubernetes

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


#### 1.2.2.3 Installation de kubadm 
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

## 1.3 Installation de Vue JS
`` npm install -g @vue/cli ``

## 1.4 configuration de la livebox (TODO a valider)
Pour permettre d'accéder a votre application depuis internet, vous devez configurer votre livebox pour authoriser les flux entrant vers votre ordinateur hébergeant votre application

- Se connecter sur votre livebox en mode administrateur
- Aller dans l'onglet "configuration avancée"
- Dans "dhcp" forcer l'ip fixe pour la machine qui sert de point d'entrée a l'application Popote
- Dans l'onglet DynDNS créer un service DNS dynamique en utilisant un des fournisseurs proposés (dtdns pour l'exemple), aller ensuite sur ce site pour créer l'entrée DNS correspondant à votre livebox (port)


# 2. Developpements

## 2.1 Installer conteneur Ngnix

## 2.2 Installer conteneur MariaDB
Installation de MariaDB dans docker

Recuperation de l'image mariadb : ``docker pull mariadb``  
Verification de presence de l'image : ``docker images``  
Creation du conteneur : ``docker create mariadb --name mariadb-popote -i –t``  
Execution du conteneur : ``docker run -d --name mariadb-popote -p 3306:3306 -v '/path/on/host/:/var/lib/mysql' -e "MARIADB_ROOT_PASSWORD=" -e "MARIADB_DATABASE=popote" -e "MARIADB_USER=popote" -e "MARIADB_PASSWORD=" mariadb``  
Mise en pause du conteneur : ``docker pause mariadb-popote``  
Arret du conteneur : ``docker stop mariadb-popote``

## 2.3 Installer conteneur NodeJS (backend popote)

##2.4 Installer conteneur VueJS (frontend popote)

## 2.5 developpement Popote

Le développement du projet popote en vue JS est disponible [ici](https://github.com/BrunoFroger/chaudiere_vueJs_K8S) sur github.  
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


### 2.5.3 Conteneurisation de popote


# 3. Execution locale

## 3.1 Execution projet Vue en local
Dans le répertoire popote : ``npm start``  
Dans le répertoire serverNode : ``node server.js``  
La visualisation du rendu se fait en se connectant en local sur [http://localhost:8080](http://localhost:8080)

## 3.1 Création d'un build de production
``npm run build``

# 4. Execution dans Docker

# 99. Quelques commandes Kubernetes Usuelles 
``kubectl version`` : affiche version de kubernetes  
``kubectl config view`` : affiche la configuration  
``kubectl config use-context <nom du context>`` : ???  
``kubectl config current-context`` : ???  
``kubectl get ns`` : ???
