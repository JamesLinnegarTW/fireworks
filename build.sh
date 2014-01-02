#!/bin/bash
cfn-create-stack fireworks --template-file ./server.template --I $AWS_ACCESS_KEY_ID --S $AWS_SECRET_ACCESS_KEY --region eu-west-1 --parameters "KeyName=jlinnegarTW"
