#!/bin/bash -e

kubectl apply -f volume-letsencrypt.yaml
kubectl apply -f volume-letsencrypt-claim.yaml