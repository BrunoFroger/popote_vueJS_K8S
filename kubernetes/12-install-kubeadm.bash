#!/bin/bash


#=================================================
echo "kubeadm => debut"
#=================================================


#-------------------------------------------------
echo "kubeadm => suppression du swap"
sudo swapoff -v /swapfile
#-------------------------------------------------


#-------------------------------------------------
echo "kubeadm => installation de kubeadm"
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
sudo apt-get update
sudo apt-get upgrade
#-------------------------------------------------




#-------------------------------------------------
echo "kubeadm => initialisation/joindre un cluster"
./14-install-master-slave.bash
while :
do
    echo "Voulez vous initialiser un cluster (master) ou joindre un cluster (slave) [master/slave]: " 
    read saisie
    if [[ "$saisie" == "master" ]]
    then
        sudo kubeadm init --pod-network-cidr=192.168.0.0/16 --cri-socket=unix:///var/run/cri-dockerd.sock
        break
    elif [[ "$saisie" == "slave" ]]
        token='kubeadm token create'
        echo "token = $token"
        break
    fi
done

#-------------------------------------------------




#-------------------------------------------------
echo "kubeadm => utilisation kubeadm/kubectl par utilisateur non root"
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
#-------------------------------------------------




#-------------------------------------------------
echo "kubeadm => ajout d'un add-on reseau (calico)"
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.1/manifests/tigera-operator.yaml 
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.28.1/manifests/custom-resources.yaml 
kubectl create -f custom-resources.yaml
#-------------------------------------------------





#=================================================
echo "kubeadm => fin"
#=================================================
