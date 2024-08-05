#!/bin/bash

echo "initialisations"
export BFR_MASTER_KUBERNETES="$(hostname).local"
while :
do
    echo -n "quel tye de noeud voulez vous installer (master/slave) ? : "
    read type_install
    if [[ "$type_install" == "master" ]]; then
        export BFR_TYPE_NOEUD="master"
        break
    elif [[ "$type_install" == "slave" ]]; then
        export BFR_TYPE_NOEUD="slave"
        echo -n "nom de la machine master (ex:machinexx.local) : "
        read master
        export BFR_MASTER_KUBERNETES=$master
        break
    else
        echo "saisie incorrecte !"
    fi
done

echo "type install : $BFR_TYPE_NOEUD"
echo "master Kubernetes : $BFR_MASTER_KUBERNETES"