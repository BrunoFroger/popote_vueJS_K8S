#!/bin/bash


mkdir kompose_files
cd kompose_files
kompose convert -f ../../docker-compose.yml
kubectl apply -f .

