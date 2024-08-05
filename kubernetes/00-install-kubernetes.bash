#!/bin/bash


#=================================================
echo "script d'installation de kubernetes => debut"
#=================================================

echo "que souhaitez vous installer (master/noeud) : "
read


#-------------------------------------------------
echo "kubernetes => installation de docker"
./10-install-docker.bash
#-------------------------------------------------



#-------------------------------------------------
echo "kubernetes => installation de kubeadm"
./12-install-kubadm.bash
#-------------------------------------------------




#=================================================
echo "script d'installation de kubernetes => fin"
#=================================================
