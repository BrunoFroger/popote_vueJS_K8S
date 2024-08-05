#!/bin/bash

sudo apt-get update 
sudo apt-get upgrade

sudo apt install net-tools
sudo apt install inetutils-ping
sudo apt install openssh-server

# if [ ! -f "~/.ssh/id.rsa.pub"]; then
#     echo "génération de la clé ssh"
#     ssh-keygen