#!/bin/bash

IMAGES=$(docker images | grep popote | awk -F ' ' '{print $1}')
docker rmi $IMAGES
