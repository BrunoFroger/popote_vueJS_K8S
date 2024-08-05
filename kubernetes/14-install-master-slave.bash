#!/bin/bash



echo "Voulez vous initialiser un cluster (master) ou joindre un cluster (slave) [master/slave]: " 
while :
do
    read saisie
    if [[ "$saisie" == "master" ]]; then 
        echo "installation du noeud master ... "
        cde="sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --cri-socket=unix:///var/run/cri-dockerd.sock"
        echo "commande executee : $cde"
        break
    elif [[ "$saisie" == "slave" ]]; then 
        while [[ "X-$MASTER_KUBERNETES" == "X-" ]]
        do
            if [[ "XX_$MASTER_KUBERNETES" == "XX_" ]]; then
                echo "Saisisser le nom ou l'adresse du master kubernetes (ex : machinexx.local) : "
                read master
                if [[ "X-$master" == "X-" ]]; then  
                    echo "saisie incorrecte !"
                else
                    export MASTER_KUBERNETES=master
                    break;
                fi
            fi
        done
        echo "installation d'un noeud esclave ... "
        #token=$(kubeadm token create)
        token=ewl9xe.aack7rb9qsoq4tal
        echo "token = $token"
        cde="sudo kubeadm join $MASTER_KUBERNETES:6443 --token ewl9xe.aack7rb9qsoq4tal --discovery-token-unsafe-skip-ca-verification --cri-socket=unix:///var/run/cri-dockerd.sock"
        echo "commande executéé : $cde"
        #sudo kubeadm join machine02.local:6443 --token ewl9xe.aack7rb9qsoq4tal --discovery-token-unsafe-skip-ca-verification --cri-socket=unix:///var/run/cri-dockerd.sock
        break
    else 
        echo "saisie incorrecte master ou slave attendu : "
    fi
done