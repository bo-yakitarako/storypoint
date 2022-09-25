#!/bin/bash
 
DIR="/usr/app/docker"
 
if [ ! -d $DIR ];then
  echo "yarn dockerした？yarn webで入ってなくない？wowwow"
  exit
fi

yarn watch
