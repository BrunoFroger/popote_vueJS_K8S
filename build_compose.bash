#!/bin/bash

docker compose stop

docker compose up --build $1
