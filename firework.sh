#!/bin/bash

echo Y | sudo apt-get install git

echo Y | sudo add-apt-repository ppa:chris-lea/node.js

sudo apt-get update

echo Y | sudo apt-get install nodejs

git clone https://github.com/JamesLinnegarTW/fireworks.git

cd fireworks

sudo nohup nodejs server.js &