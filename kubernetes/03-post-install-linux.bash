#!/bin/bash

sudo apt-get update 
sudo apt-get upgrade

sudo apt install -y net-tools
sudo apt install -y inetutils-ping
sudo apt install -y openssh-server

if [ ! -f "~/.ssh/id.rsa.pub"]; then
    echo "génération de la clé ssh"
    ssh-keygen -N ""

    echo "Vous pouvez maintenant copier cette clé ssh sur votre serveur distant avec la commande suivante (sur serveur distant)
    echo "cat ~/.ssh/id_rsa.pub | ssh $(whoami)@$(hostname).local \"cat >> ~/.ssh/authorized_keys\" "
fi