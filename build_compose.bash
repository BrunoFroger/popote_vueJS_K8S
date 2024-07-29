#!/bin/bash

docker compose stop

docker compose $1 up --build
