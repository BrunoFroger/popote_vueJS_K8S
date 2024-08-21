#!/bin/bash -e


mkdir kompose_files
cd kompose_files
kompose convert ../../docker-compose.yml
kubectl apply -f .

