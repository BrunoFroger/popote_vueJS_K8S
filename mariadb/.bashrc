#!/bin/bash


echo "debut .bashrc"
fichier="firstRun"

if [ ! -f $fichier ]; then
    touch $fichier
    echo "premiere execution on installe la BDD"
    #./initDb.bash
else
    echo "la BDD est déja installee"
fi

echo "fin .bashrc"

