#!/bin/bash

docker image tag popote_vuejs_k8s-tags-10-nginx:latest registry.k8s.io/popote_vuejs_k8s-tags-10-nginx:latest

docker image push registry.k8s.io/popote_vuejs_k8s-tags-10-nginx:latest

docker manifest create registry.k8s.io/popote:latest registry.k8s.io/popote_vuejs_k8s-tags-10-nginx:latest

