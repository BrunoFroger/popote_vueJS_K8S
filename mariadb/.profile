#!/bin/bash


echo "debut .profile"


if [! -d "./firstRun"]; then
    touch "./firstRun"
    echo "premiere execution on installe la BDD"
    ./initDb.bash
fi

echo "fin .profile"

