#!/bin/bash


mkdir kompose_files
cd kompose_files
kompose convert -f ../../docker-compose.yml --namespace popote 
kubectl apply -f .

