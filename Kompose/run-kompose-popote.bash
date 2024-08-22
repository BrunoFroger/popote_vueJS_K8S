#!/bin/bash


mkdir kompose_files
cd kompose_files
kubectl config set-context --current --namespace=popote
kompose convert -f ../../docker-compose.yml
kubectl apply -f .

