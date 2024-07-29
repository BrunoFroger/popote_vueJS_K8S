#!/bin/bash

echo -n 'Creation de la base de donnees Popote => '
mysql --user=root --password=root123 -h popote_mariadb < create_base.sql
echo "OK"
