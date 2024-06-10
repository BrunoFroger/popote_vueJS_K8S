#!/bin/bash

echo 'initdb.bash'
mysql --user=root --password=root123 < create_base.sql
