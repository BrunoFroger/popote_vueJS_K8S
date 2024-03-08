# Popote en VUE JS sur Kuberbetes
Ce projet decrit le mode opératoire du developpement en VueJS et du déploiement de l'application popote (serveur de recettes de cuisine) sur une architecture Kubernetes en utilisant Docker pour la production des contener.

en option un serveur NodeJS est proposé dans des fin de tests des dev VueJS

# 1. Installation

Pour procéder à cette installation, il est nécessaire de disposer des éléments suivants :
- 1 ou plusieurs machines capables d'exécuter Linux
- 1 connexion à internet (via une routeur de type Livebox par exemple)
- 1 switch, pour connecter entre elle toutes les machines et les raccorder au routeur d'accès a internet

## 1.1 Installation de Linux 

Télécharger [ici](https://www.ubuntu-fr.org/download/) la dernière version de Linux (ici exemple avec Ubuntu)

Suivre ensuite les recommandations proposées pour installer l'OS sur votre machine :
- flasher clé USB avec la distribution
- brancher la machine cible sur le secteur
- raccorder 1 câble réseau sur le switch
- sélectionner boot sur clé USB dans le setup de la machine au démarrage
- lancer l'installation

paramètres a renseigner pour l'installation de linux :
- sélectionner la langue (français)
- sélectionner installer Ubuntu
- valider clavier français (continuer)
- pas de connexion réseau sans fil
- mise à jour et autres logiciels : sélectionner installation minimale, avec téléchargement des mise à jour en cours d'installation
- si une autre version était déjà installer la remplacer par la nouvelle
- si demande changement sur les disques, valider
- valider fuseau horaire sur Paris
- renseignement "qui êtes-vous"
	- nom : Bruno
    - nom ordinateur : machineXX (XX numéro de la machine)
    - nom utilisateur : bruno
    - password : K8S&machineXX  (XX numéro de la machine)
- Lors du message installation terminée, lancer le redémarrage.

**Post installation :**

Pour pouvoir utiliser les commandes de manipulation réseau : 

- ifconfig : ``sudo apt install net-tools``
- curl : ``sudo apt install curl``
- server ssh : ``sudo apt-get install openssh-server``
- optionnel mobaxterm : cette application Windows nécessite l'installation de wine ``sudo apt install wine`` puis copier le téléchargement de l'application [mobaxterm.exe](https://mobaxterm.mobatek.net/download-home-edition.html) localement sur la machine ; vous pourrez alors lancer son exécution avec la commande ``wine mobaxterm.exe``

Suite a toutes ces manipulation, le système proposera sans doute des mises a jours, il faut les accepter, et si un redémarrage est demander l'accepter aussi.

## 1.2 Installation de Kubernetes

pour l'installation de kubernetes ; 2 possibilités (minikube ou satndard)

### 1.2.1 Minikube (configuration simplifiée)
Pour l'installation et la configuration de minikube se referer a la documentation en ligne [ici](https://minikube.sigs.k8s.io/docs/)

ci dessus les commandes pour une installation de minikube sur Linux :
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Vérification que Minikube est bien installé : ``minikube start`` aucunmessage d'erreur doit s'afficher

### 1.2.2 Installation standard

#### 1.2.2.1 Installation de kubadm

voir sur le site [kubernetes](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
sudo mkdir -p -m 755 /etc/apt/keyrings
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

```
#### 1.2.2.2 Installation de Docker Engine
voir la documentation d'installation [ici](https://docs.docker.com/engine/install/#server)

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


#### 1.2.2.3 Installation de cri-dockerd
aller sur le site [cri-dockerd](https://github.com/Mirantis/cri-dockerd?tab=readme-ov-file) puis allez sur la page repertoriant les différentes releases disponible, cherchez celle correpondant a votre machine ; ici ubuntu-jammy_amd64 ; téléchargez le et installez le.

Activation de cri-dockerd : ``sudo systemctl enable cri-docker.service``

#### 1.2.2.4 Création d'un cluster


## 1.3 Installation de Vue JS
`` npm install -g @vue/cli ``

## 1.4 configuration de la livebox
Pour permettre d'accéder a votre application depuis internet, vous devez configurer votre livebox pour authoriser les flus entrant vers votre ordianteur hébergeant votre application
- se connecter sur votre livebox en mode administrateur

# 2. Developpements

## 2.1 Ngnix

## 2.2 MariaDB

## 2.3 Popote

Le developement du projet popote en vue JS est disponible [ici](https://github.com/BrunoFroger/chaudiere_vueJs) sur github.

Vous pouvez utiliser [Visual studio code](https://code.visualstudio.com/download) pour faire les developpements.

sur la machine de developpement initialiser le repertoire de developpement via git :

```
mkdir projets
cd projets
git clone git@github.com:BrunoFroger/popote-vueJS
```

### 2.3.1 Creation du projet Vue
`` vue create popote `` 

en choisissant le mode manuel

### 2.3.2 Developpement de l'application Popote
le projet popote repose actuellement sur un frontend en Vue JS et un backend (provisoire) en NodeJS)

les dev du frontend sont dans le repertoire popote

les dev du backend sont dans le repertoire serverNode

### 2.3.3 Conteneurisation de popote


# 3. Execution

## 3.1 Execution projet Vue en local
``npm run serve``

la visualisation du rendu se fait en se connectant en local [ici](http://localhost:8080)

## 3.1 Création d'un build de production
``npm run build``

## 4 Déploiement

# 99. Quelques commandes Kubernetes Usuelles 
``kubectl version`` : affiche version de kubernetes

``kubectl config view`` : affiche la configuration

``kubectl config use-context <nom du context>`` : ???

``kubectl config current-context`` : ???

``kubectl get ns`` : ???
